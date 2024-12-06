export interface ICampaign {
  company_context: string
  id: string
  is_active: boolean
  name: string
  owner_context: string
}

export interface ICampaignCreateRequest {
  name: string
  company_context: string
  owner_context: string
}

export interface IChangeCampaignRequest {
  name: string
  company_context: string
  owner_context: string
  is_active: boolean
}