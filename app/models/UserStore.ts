import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RoleEnum, UserModel } from "./User"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { userApi } from "app/services/api/user.api"
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.maybe(UserModel),
    users: types.array(UserModel),
    loading: false,
    error: types.maybe(types.string),
    role: types.maybe(types.enumeration("RoleEnum", Object.values(RoleEnum))),
    teams: types.array(types.string),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchUsers(token: string) {
      const response = await userApi.getUsers(token)

      if (response.kind === "ok") {
        const userModels = response.users.map((user) =>
          UserModel.create({
            email: user.email,
            firstName: user.firstName,
            id: user.id,
            lastName: user.lastName,
            role: user.role,
          }),
        )
        store.setProp("users", userModels)
      } else {
        console.error(`Error fetching users: ${JSON.stringify(response)}`)
      }
    },
  }))
  .views((store) => ({
    get isAdmin() {
      console.log("store.role", store.role)

      return store.role === RoleEnum.ADMIN
    },
    get isOwner() {
      return store.role === RoleEnum.Owner
    },
    get isUser() {
      return store.role === RoleEnum.USER
    },
  }))
  .actions((store) => ({
    setRole(role: RoleEnum) {
      store.role = role
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
