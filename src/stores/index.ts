import * as React from "react"
import UserStore from "./user.store"
import CampaignsStore from "./campaigns.store.ts";
import ProspectsStore from "./prospects.store.ts";

class RootStore {
  UserStore: UserStore
  CampaignsStore: CampaignsStore
  ProspectsStore: ProspectsStore

  constructor() {
    this.UserStore = new UserStore()
    this.CampaignsStore = new CampaignsStore()
    this.ProspectsStore = new ProspectsStore()
  }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);