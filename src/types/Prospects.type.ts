export interface IProspect {
  avatar_url: string,
  campaign_id: string,
  comments_count: 0,
  email: string,
  id: string,
  is_important: true,
  last_check_ts: string,
  last_comment: string,
  link_url: string,
  name: string,
  position: string,
  post_frequency: 0
}

export interface IAddProspectRequest {
  campaign_id: string
  link_urls: string[]
}

export interface IRemoveProspectRequest {
  campaign_id: string
  prospect_id: string
}