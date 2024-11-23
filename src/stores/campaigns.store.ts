import { flow, makeAutoObservable } from "mobx"
import {ICampaign, ICampaignCreateRequest} from "../types/Campaigns.type.ts"

class CampaignsStore {
  state = "pending"
  campaigns: ICampaign[] = []

  constructor() {
    makeAutoObservable(this, {
      fetchCampaigns: flow,
    })
  }

  *fetchCampaigns() {
    this.state = "pending"

    const response = yield fetch('/api/v1/campaigns/')

    if (!response.ok) {
      this.state = "error"

      return
    }

    const data = yield response.json()

    this.campaigns = data.campaigns
    this.state = "done"
  }

  *createCampaign(request: ICampaignCreateRequest) {
    this.state = "pending"

    const response = yield fetch('/api/v1/campaigns/', {
      method: 'Post',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      this.state = "error"

      return
    }

    yield this.fetchCampaigns()

    this.state = "done"
  }
}

export default CampaignsStore