import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
  Owner = "owner",
}

/**
 * This represents an episode of React Native Radio.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    firstName: "",
    lastName: "",
    email: "",
    role: types.enumeration("RoleEnum", Object.values(RoleEnum)),
  })
  .actions(withSetPropAction)
  .views((episode) => ({
    get fullName() {
      return `${episode.firstName} ${episode.lastName}`
    },
  }))

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
