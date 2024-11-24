import { flow, makeAutoObservable } from "mobx"
import {ICampaign, ICampaignCreateRequest} from "../types/Campaigns.type.ts"
import {getHost} from "../utils/getHost.ts";

class CampaignsStore {
  state = "pending"
  campaigns: ICampaign[] = []
  activeCampaign: ICampaign

  constructor() {
    makeAutoObservable(this, {
      fetchCampaigns: flow,
    })
  }

  setActiveCampaign(campaign: ICampaign) {
    this.activeCampaign = campaign
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
    this.activeCampaign = this.campaigns[0]
    this.state = "done"
  }

  *createCampaign(request: ICampaignCreateRequest) {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/campaigns/`, {
      method: 'Post',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      this.state = "error"

      return
    }

    const currentCampaigns = this.campaigns.map(c => c.id)

    yield this.fetchCampaigns()

    this.activeCampaign = this.campaigns.find((c) => !currentCampaigns.includes(c.id))
    this.state = "done"
  }
}

export default CampaignsStore