export interface FormData {
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  subscriptionPlan: string;
  isCustodian: boolean;
  userName?: string;
  password?: string;
}

export interface Payload {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  blockCourt: string;
  roomType: string;
  registrationType: string;
  clientReference: string;
  provider: string;
  roomNumber: string;
  subscriptionPlan: string;
  isCustodian: boolean;
  totalCost: string;
  credentials: string;
}

export interface PaystackSuccessReference {
  reference: string;
  transaction: string;
  status: string;
  message: string;
}

export interface PaymentInfo {
  regID: string;
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  dateTime: Date;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  credentials: string;
  provider: string;
  registrationType: string;
}

export interface UserInfo {
  regID?: string;
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  dateTime: Date;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  credentials: string;
  provider: string;
  registrationType: string;
}

export interface SalesPayload {
  regID?: string;
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  dateTime: Date;
  clientReference: string;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  credentials: string;
  provider: string;
  providerResponse: string;
  registrationType: string;
  purchaseInfo: string;
  transactionId: string;
  externalTransactionId?: string;
}

export interface PendingRegistrationPayload {
  regID?: string;
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  dateTime: Date;
  clientReference: string;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  credentials: string;
  provider: string;
  registrationType: string;
  purchaseInfo: string;
}

export interface FailedRegistrationPayload {
  regID?: string;
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  dateTime: Date;
  clientReference: string;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  credentials: string;
  provider: string;
  providerResponse: string;
  registrationType: string;
  purchaseInfo: string;
}

export interface TopUpFormData {
  userName: string;
  phoneNumber: string;
  email: string;
  subscriptionPlan: string;
}

export interface PendingPaymentPayload {
  regID?: string;
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  dateTime: Date;
  clientReference: string;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  credentials: string;
  provider: string;
  registrationType: string;
  purchaseInfo: string;
}

export interface Registrant {
  phoneNumber: string;
  email: string;
  clientReference: string;
}
