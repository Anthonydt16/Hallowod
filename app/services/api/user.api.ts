import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig } from "./api.types"
import { UserSnapshotIn } from "app/models/User"
import { ApiClass } from "./apiClass"
import { ApiResponse } from "apisauce"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class UserApi extends ApiClass {
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    super(config)
  }

  async getUsers(): Promise<{ kind: "ok"; users: UserSnapshotIn[] } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.get(`user`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const rawData = response.data
    const users: any[] = rawData?.items

    return { kind: "ok", users }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ kind: "ok"; token: string } | GeneralApiProblem> {
    console.log(this.apisauce.getBaseURL(), "this.apisauce")

    const response: ApiResponse<any> = await this.apisauce.post(`/user/login`, { email, password })
    // afficher l'erreur
    console.log(response)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const token = response.data.token
    return { kind: "ok", token }
  }
}

export const userApi = new UserApi(DEFAULT_API_CONFIG)