import { flow, makeAutoObservable } from "mobx"
import {IUser} from "../types/User.type.ts"
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

class UserStore {
  state = "pending"
  user: IUser
  authorized: boolean

  constructor() {
    makeAutoObservable(this, {
      fetchUser: flow,
      signUp: flow,
      signIn: flow,
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
}

export default UserStore