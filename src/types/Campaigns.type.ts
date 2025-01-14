export interface ICampaign {
  company_context: ICompanyContext
  id: string
  is_active: boolean
  name: string
  personal_context: IPersonalContext
  tone_of_voice: IToneOfVoice
}

export interface ICampaignCreateRequest {
  name: string
  company_context: string
  owner_context: string
}

export interface IChangeCampaignRequest {
  name: string
  is_active: boolean
}

export interface IToneOfVoice {
  ask_follow_up_questions: string
  capitalize_some_words: EToneSettings
  comment_length: number
  languages: string[]
  use_emoji: EToneSettings
  use_hashtag: EToneSettings
}

export enum EToneSettings {
  TryToNotUse = 'try_to_not_use',
  UseSometimes = 'sometimes',
  IfInPost = 'only_if_in_post',
}

export interface ICompanyContext {
  about_company: string
  achievement: string
  audience: string
  campaign_id: string
  mission: string
  product_diff: string
  specific_results: string
}

export interface IPersonalContext {
  attributes: string
  background: string
  hobbies: string
  how_to_communicate: string
  how_to_engage: string
  introduce: string
}