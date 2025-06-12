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
  dateTime: string;
  credentials: string;
}

export interface PaystackSuccessReference {
  reference: string;
  transaction: string;
  status: string;
  message: string;
}

export interface PaymentInfo {
  userID: string;
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  dateTime: string;
  credentials: string;
  provider: string;
  registrationType: string;
}

export interface DbPayload {
  fullName: string;
  phoneNumber: string;
  subscriptionPlan: string;
  planFee: number;
  registrationFee: number;
  totalCost: number;
  clientReference: string;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  isCustodian: boolean;
  dateTime: string;
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
