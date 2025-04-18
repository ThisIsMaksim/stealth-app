import * as React from "react"
import UserStore from "./user.store"
import CampaignsStore from "./campaigns.store.ts"
import ProspectsStore from "./prospects.store.ts"
import PostsStore from "./posts.store.ts"
import ModalStore from "./modal.store.ts"
import OnboardingStore from "./onboarding.store.ts";
import FirebaseStore from "./firebase.store.ts";
import { NotificationStore } from "./NotificationStore";
import { OperationsStore } from "./OperationsStore";

class RootStore {
  UserStore: UserStore
  CampaignsStore: CampaignsStore
  ProspectsStore: ProspectsStore
  PostsStore: PostsStore
  ModalStore: ModalStore
  OnboardingStore: OnboardingStore
  FirebaseStore: FirebaseStore
  NotificationStore: NotificationStore
  OperationsStore: OperationsStore

  constructor() {
    this.UserStore = new UserStore()
    this.CampaignsStore = new CampaignsStore()
    this.ProspectsStore = new ProspectsStore()
    this.PostsStore = new PostsStore()
    this.ModalStore = new ModalStore()
    this.OnboardingStore = new OnboardingStore()
    this.FirebaseStore = new FirebaseStore()
    this.NotificationStore = new NotificationStore()
    this.OperationsStore = new OperationsStore()
  }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);