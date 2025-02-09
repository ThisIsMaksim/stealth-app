import {ILinkedinAccount} from "./LinkedinAccount.type.ts"

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
  status: string
  start_ts: string
  end_ts: string
}