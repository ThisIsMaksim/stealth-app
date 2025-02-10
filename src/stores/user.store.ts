import { flow, makeAutoObservable } from "mobx"
import {ILocation, IUser} from "../types/User.type.ts"
import {getHost} from "../utils/getHost.ts";
import {LinkedinAccountStatus} from "../types/LinkedinAccount.type.ts";
import {Action} from "../utils/fetchWithDelay.ts";
import {Subscription} from "../types/Subscriptions.type.ts";

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
  subscriptions: Subscription[] = []

  constructor() {
    makeAutoObservable(this, {
      fetchUser: flow,
      signUp: flow,
      signIn: flow,
      bindLinkedinAccount: flow,
      fetchLocation: flow,
      logout: flow,
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

  *signUp(request: ISignUpRequest, action: (error?: string, response?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/users/register`, {
      method: 'POST',
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      const { error } = yield response.json()

      action(error)

      return
    }

    action()
  }

  *signIn(request: ISignInRequest, action: (error?: string, response?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/users/login`, {
      method: 'POST',
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      const { error } = yield response.json()

      action(error)

      return
    }

    action()
  }

  *logout(action: (error?: string, response?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/users/logout`, {method: 'POST'})

    if (!response.ok) {
      const { error } = yield response.json()

      action(error)

      return
    }

    action()
  }

  *bindLinkedinAccount(request: IBindLinkedInAccountRequest, action: (error?: string) => void) {
    const response = yield fetch(`${getHost()}/api/v1/users/bind-linkedin-account`, {
      method: 'POST',
      body: JSON.stringify(request)
    })

    action(!response.ok ? 'Something went wrong' : undefined)
  }

  *unBindLinkedinAccount(action: Action<void>) {
    yield fetch(`${getHost()}/api/v1/users/unbind-linkedin-account`, {
      method: 'POST'
    })

    this.user.linkedin_account = undefined
    this.linkedinAccountStatus = undefined

    action()
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

      this.user = user
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

  *fetchUserLocation(action: Action<string>) {
    const response = yield fetch('https://ipinfo.io/json/?token=64ae88c388b678')
    const data = yield response.json() as Record<string, string>

    action(undefined, data?.country)
  }

  *confirmEmail(token: string, action: Action<void>) {
    const response = yield fetch(`${getHost()}/api/v1/users/email-confirm`, {
      method: 'POST',
      body: JSON.stringify({sign: token})
    })

    if (!response.ok) {
      action('error')

      return
    }

    action()
  }

  *fetchSubscriptions() {
    const response = yield fetch(`${getHost()}/api/v1/purchases/subscriptions`)

    if (!response.ok) {
      this.state = "error"

      return
    }

    const data = yield response.json()

    this.subscriptions = data.subscriptions
  }
}

export default UserStore