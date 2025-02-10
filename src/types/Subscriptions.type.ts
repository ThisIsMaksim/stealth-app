export interface Subscription {
  description: string,
  id: string,
  name: string,
  price: string,
  status: SubscriptionStatus,
  title: string
}

export enum SubscriptionStatus {
  ACTIVE = 'active'
}