import { flow, makeAutoObservable } from "mobx"
import {
  ICampaign,
  ICampaignCreateRequest,
  IChangeCampaignRequest,
  ICompanyContext, IPersonalContext, IToneOfVoice
} from "../types/Campaigns.type.ts"
import {getHost} from "../utils/getHost.ts"
import {IProspect} from "../types/Prospects.type.ts"
import {Action} from "../utils/fetchWithDelay.ts"

class CampaignsStore {
  state = "pending"
  campaigns: ICampaign[] = []
  activeCampaign: ICampaign
  prospects: IProspect[] = []

  constructor() {
    makeAutoObservable(this, {
      fetchCampaigns: flow,
    })
  }

  setActiveCampaign(campaign: ICampaign) {
    localStorage.setItem("activeCampaign", campaign.id)

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
    this.activeCampaign = this.campaigns.find(c => c.id === localStorage.getItem('activeCampaign')) ?? this.campaigns[0]
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

  *changeCampaign(request: IChangeCampaignRequest, action: (error?: string) => void) {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/campaigns/${this.activeCampaign.id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      action('Something went wrong')

      return
    }

    yield this.fetchCampaigns()

    action()

    this.state = "done"
  }

  *changeCampaignContext(request: ICompanyContext, action: Action<void>) {
    const response = yield fetch(`${getHost()}/api/v1/campaigns/${this.activeCampaign.id}/context/company/`, {
      method: 'PUT',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      action('Something went wrong')

      return
    }

    yield this.fetchCampaigns()

    action()
  }

  *changePersonalContext(request: IPersonalContext, action: Action<void>) {
    const response = yield fetch(`${getHost()}/api/v1/campaigns/${this.activeCampaign.id}/context/personal/`, {
      method: 'PUT',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      action('Something went wrong')

      return
    }

    yield this.fetchCampaigns()

    action()
  }

  *changeToneOfVoice(request: IToneOfVoice, action: Action<void>) {
    const response = yield fetch(`${getHost()}/api/v1/campaigns/${this.activeCampaign.id}/tone-of-voices/`, {
      method: 'PUT',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      action('Something went wrong')

      return
    }

    yield this.fetchCampaigns()

    action()
  }
}

export default CampaignsStore