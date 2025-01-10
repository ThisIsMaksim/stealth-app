import { flow, makeAutoObservable } from "mobx"
import {StepType} from "@reactour/tour";

class OnboardingStore {
  steps: StepType[] = []
  isShow: boolean = false

  constructor() {
    makeAutoObservable(this, {
      show: flow,
      hide: flow,
    })
  }

  *show(steps: StepType[]) {
    this.steps = steps

    yield new Promise(resolve => setTimeout(resolve, 2000))

    this.isShow = true
  }

  *hide() {
    this.steps = []

    this.isShow = false

    yield undefined
  }
}

export default OnboardingStore