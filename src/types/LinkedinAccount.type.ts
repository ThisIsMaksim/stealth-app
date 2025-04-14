export interface ILinkedinAccount {
  avatar_url: string,
  linkedin_url: string,
  location: string,
  name: string,
  status: LinkedinAccountStatus
  email?: string
}

export enum LinkedinAccountStatus {
  NEW = 'new',
  CONNECTED = 'connected',
  OTP_REQUESTED = 'otp_requested',
  DEVICE_VERIFY_REQUESTED = 'device_verify_requested',
  INVALID_CREDENTIALS = 'invalid_credentials',
  OTP_PROVIDED = 'otp_provided',
  DISCONNECTED = 'disconnected',
  ERROR = 'error'
}