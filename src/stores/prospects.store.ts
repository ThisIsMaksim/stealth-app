import { flow, makeAutoObservable } from "mobx"
import {IAddProspectRequest, IProspect, IRemoveProspectRequest} from "../types/Prospects.type.ts"
import {getHost} from "../utils/getHost.ts"
import {Action} from "../utils/fetchWithDelay.ts";

class ProspectsStore {
  state = "pending"
  prospects: IProspect[] = []

  constructor() {
    makeAutoObservable(this, {
      fetchProspects: flow,
    })
  }

  *fetchProspects(id) {
    this.state = "pending"
    this.prospects = []

    const limit = 500
    const offset = 0

    const response = yield fetch(`${getHost()}/api/v1/prospects/?limit=${limit}&offset=${offset}&campaign_id=${id}`)

    if (!response.ok) {
      this.state = "error"

      return
    }

    const data = yield response.json()

    this.prospects = data.prospects
    this.state = "done"
  }

  *addProspect(request: IAddProspectRequest, action: Action<void>) {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/prospects/`, {
      method: 'Post',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      action('Something went wrong')

      return
    }

    yield this.fetchProspects(request.campaign_id)

    this.state = "done"

    action()
  }

  *removeProspect(request: IRemoveProspectRequest) {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/prospects/remove`, {
      method: 'Post',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      this.state = "error"

      return
    }

    this.prospects = this.prospects.filter((prospect) => prospect.id !== request.prospect_id)
    this.state = "done"
  }
}

export default ProspectsStore