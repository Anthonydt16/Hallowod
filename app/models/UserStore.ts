import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RoleEnum, UserModel } from "./User"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { userApi } from "app/services/api/user.api"
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.maybe(UserModel),
    users: types.array(UserModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchUsers(token: string) {
      const response = await userApi.getUsers(token)

      if (response.kind === "ok") {
        const userModels = response.users.map((user) => {
          return UserModel.create({
            email: user.email,
            firstName: user.firstName,
            id: user.id,
            lastName: user.lastName,
            role: user.role,
          });
        });
        store.setProp("users", userModels);
      }
       else {
        console.error(`Error fetching users: ${JSON.stringify(response)}`)
      }
    },
  }))
  .views((store) => ({
  }))
  .actions((store) => ({
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
