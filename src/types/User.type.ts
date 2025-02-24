import {ILinkedinAccount} from "./LinkedinAccount.type.ts"
import {SubscriptionStatus} from "./Subscriptions.type.ts"

export interface IUser {
  id: string
  name: string
  email: string
  is_confirmed?: boolean
  linkedin_account?: ILinkedinAccount
  subscription?: ISubscription
}

export interface ILocation {
  iso_code: string
  name: string
}

export interface ISubscription {
  is: string
  name: string
  status: SubscriptionStatus
  start_ts: string
  end_ts: string
}