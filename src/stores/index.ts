import * as React from "react"
import UserStore from "./user.store"
import CampaignsStore from "./campaigns.store.ts";

class RootStore {
  UserStore: UserStore
  CampaignsStore: CampaignsStore

  constructor() {
    this.UserStore = new UserStore()
    this.CampaignsStore = new CampaignsStore()
  }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);