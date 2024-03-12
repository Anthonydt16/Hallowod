import { userApi } from "app/services/api/user.api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RoleEnum } from "./User"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authRole: types.maybe(types.enumeration("RoleEnum", Object.values(RoleEnum))),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
    get isAdmin() {
      return store.authRole === RoleEnum.ADMIN
    },
  }))
  .actions((store) => ({
    setAuthRole(value?:RoleEnum) {
      store.authRole = value
    },
    setAuthToken(value?: string) {
      store.authToken = value
    },

    async login(email: string, password: string) {
      const response = await userApi.login(email, password)
      if (response.kind === "ok") {
        return {
          email,
          token: response.token,
          role: response.role,
        }
      } else {
        throw new Error("Error logging in")
      }
    },

    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.authRole = undefined
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
