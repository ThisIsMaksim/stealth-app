import {ILinkedinAccount} from "./LinkedinAccount.type.ts"

export interface IUser {
  id: string
  name: string
  email: string
  linkedin_account: ILinkedinAccount
}