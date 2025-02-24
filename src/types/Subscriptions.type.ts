export interface Subscription {
  description: string,
  id: string,
  name: string,
  price: string,
  price_with_discount: string
  status: SubscriptionStatus,
  title: string
}

export enum SubscriptionStatus {
  ACTIVE = 'active'
}