import { flow, makeAutoObservable } from "mobx"
import {ILocation, IUser} from "../types/User.type.ts"
import {getHost} from "../utils/getHost.ts";
import {LinkedinAccountStatus} from "../types/LinkedinAccount.type.ts";

interface ISignUpRequest {
  first_name: string
  second_name: string
  email: string
  password: string
}

interface ISignInRequest {
  email: string
  password: string
}

interface IBindLinkedInAccountRequest {
  email: string
  password: string
  location: string
}

class UserStore {
  state = "pending"
  errorStatus: number
  user: IUser
  authorized: boolean
  locations: ILocation[] = []
  linkedinAccountStatus: LinkedinAccountStatus | undefined
  needCheckLinkedinAccountStatus = false

  constructor() {
    makeAutoObservable(this, {
      fetchUser: flow,
      signUp: flow,
      signIn: flow,
      bindLinkedinAccount: flow,
      fetchLocation: flow,
    })
  }

  *fetchUser() {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/users/me`)

    if (!response.ok) {
      this.state = "error"
      this.errorStatus = response.status

      return
    }

    this.user = yield response.json()
    this.authorized = !!this.user
    this.state = "done"

    this.checkBindLinkedinAccountStatus()
  }

  *signUp(request: ISignUpRequest) {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/users/register`, {
      method: 'POST',
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      this.state = "error"

      return
    }

    location.href = '/'

    this.state = "done"
  }

  *signIn(request: ISignInRequest) {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/users/login`, {
      method: 'POST',
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      this.state = "error"

      return
    }

    location.href = '/'

    this.state = "done"
  }

  *bindLinkedinAccount(request: IBindLinkedInAccountRequest) {
    yield fetch(`${getHost()}/api/v1/users/bind-linkedin-account`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  *sendOTP(otp: string) {
    yield fetch(`${getHost()}/api/v1/users/set-otp`, {
      method: 'POST',
      body: JSON.stringify({otp})
    })
  }

  *checkBindLinkedinAccountStatus() {
    if (this.needCheckLinkedinAccountStatus) {
      const response = yield fetch(`${getHost()}/api/v1/users/me/`)

      if (!response.ok) {
        return
      }

      const user: IUser = yield response.json()

      this.linkedinAccountStatus = user.linkedin_account?.status
    }

    setTimeout(() => {
      this.checkBindLinkedinAccountStatus()
    }, 2000)
  }

  *fetchLocation() {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/users/countries`)

    if (!response.ok) {
      this.state = "error"

      return
    }

    const data = yield response.json() as Record<string, string>

    this.locations = Object
      .keys(data)
      .map((key: string) => ({ iso_code: key, name: data[key] }))

    this.state = "done"
  }
}

export default UserStore