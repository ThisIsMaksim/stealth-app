import { flow, makeAutoObservable } from "mobx"
import { ensureInitialized, fetchAndActivate, getRemoteConfig, getAll } from "firebase/remote-config"
import {CustomSignals, RemoteConfig, setCustomSignals} from "@firebase/remote-config"
import {firebaseConfig} from "../remote-config/config.ts"
import { initializeApp } from 'firebase/app'

const defaultConfig = {
  'tone_of_voice': false,
  'stripe': false,
}

class FirebaseStore {
  initialized: boolean = false
  remoteConfig: RemoteConfig
  config: Record<string, boolean | string | number>

  constructor() {
    makeAutoObservable(this, {
      initialize: flow,
    })
  }

  *initialize(customSignals: CustomSignals) {
    try {
      initializeApp(firebaseConfig)

      this.remoteConfig = getRemoteConfig()

      this.remoteConfig.settings.minimumFetchIntervalMillis = 60000

      this.remoteConfig.defaultConfig = defaultConfig

      yield ensureInitialized(this.remoteConfig)
      yield setCustomSignals(this.remoteConfig, customSignals)
      yield fetchAndActivate(this.remoteConfig)

      console.log('Firebase Remote Config is initialized')
    } catch (e) {
      console.error('Firebase Remote Config failed to initialize', e)
    }

    this.initialized = true
    this.config = this.getConfig()
  }

  getConfig() {
    const config = getAll(this.remoteConfig)
    const result = {}

    Object.keys(defaultConfig).forEach(key => {
      if (typeof defaultConfig[key] === 'boolean') {
        result[key] = config[key].asBoolean()
      } else if (typeof defaultConfig[key] === 'string') {
        result[key] = config[key].asString()
      } else if (typeof defaultConfig[key] === 'number') {
        result[key] = config[key].asNumber()
      }
    })

    return result
  }
}

export default FirebaseStore