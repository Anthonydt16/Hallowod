import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig } from "./api.types"
import { ApiClass } from "./apiClass"

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
export class HealthApi extends ApiClass {
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    super(config)
  }

  async getHealth(): Promise<{ kind: "ok"; status: any } | GeneralApiProblem> {
    const response = await this.apisauce.get(`health`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", status: response }
  }
}

export const healthApi = new HealthApi(DEFAULT_API_CONFIG)
