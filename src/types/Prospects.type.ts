export interface IProspect {
  avatar_url: string,
  campaign_id: string,
  comments_count: string,
  email: string,
  id: string,
  is_important: true,
  last_post_check_ts: string,
  last_comment_ts: string,
  link_url: string,
  name: string,
  position: string,
  post_frequency: string
}

export interface IAddProspectRequest {
  campaign_id: string
  link_urls: string[]
}

export interface IRemoveProspectRequest {
  campaign_id: string
  prospect_id: string
}