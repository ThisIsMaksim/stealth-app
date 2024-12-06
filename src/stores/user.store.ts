import { flow, makeAutoObservable } from "mobx"
import {ILocation, IUser} from "../types/User.type.ts"
import {getHost} from "../utils/getHost.ts";

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
  user: IUser
  authorized: boolean
  locations: ILocation[] = []

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

      return
    }

    this.user = yield response.json()
    this.authorized = !!this.user
    this.state = "done"
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

  *bindLinkedinAccount(request: IBindLinkedInAccountRequest, action: (error?: string) => void) {
    this.state = "pending"

    const response = yield fetch(`${getHost()}/api/v1/users/bind-linkedin-account`, {
      method: 'POST',
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      action('Something went wrong')

      return
    }

    this.state = "done"

    action()
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