import {ILinkedinAccount} from "./LinkedinAccount.type.ts"

export interface IUser {
  id: string
  name: string
  email: string
  is_confirmed?: boolean
  linkedin_account?: ILinkedinAccount
}

export interface ILocation {
  iso_code: string
  name: string
}