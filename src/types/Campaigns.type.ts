export interface ICampaign {
  company_context: string
  id: string
  is_active: boolean
  name: string
  owner_context: string
  tone_of_voice: IToneOfVoice
}

export interface ICampaignCreateRequest {
  name: string
  company_context: string
  owner_context: string
}

export interface IChangeCampaignRequest extends Omit<ICampaign, 'id'>{
  name: string
  company_context: string
  owner_context: string
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