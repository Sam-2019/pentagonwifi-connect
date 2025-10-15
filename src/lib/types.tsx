export interface FormData {
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  selectedCard: string;
  subscriptionPlan: string;
  isCustodian: boolean;
  userName?: string;
  password?: string;
  studentId: string;
  termsAccepted: boolean;
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
  selectedCard: SelectedCard;
  isCustodian: boolean;
  credentials: Credentials;
  provider: string;
  registrationType: string;
  studentId: string;
  termsAccepted: boolean;
}

export interface RegistrationInfo {
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
  selectedCard: SelectedCard;
  isCustodian: boolean;
  credentials: Credentials;
  provider: string;
  registrationType: string;
  studentId: string;
  termsAccepted: boolean;
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
  selectedCard?: SelectedCard;
  isCustodian: boolean;
  credentials: Credentials;
  provider: string;
  providerResponse: object;
  registrationType: string;
  purchaseInfo: object;
  transactionId: string;
  externalTransactionId?: string;
  studentId: string;
  termsAccepted: boolean;
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
  selectedCard?: SelectedCard;
  isCustodian: boolean;
  credentials: Credentials;
  provider: string;
  registrationType: string;
  purchaseInfo: object;
  studentId: string;
  termsAccepted: boolean;
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
  selectedCard?: SelectedCard;
  isCustodian: boolean;
  credentials: Credentials;
  provider: string;
  providerResponse: string;
  registrationType: string;
  purchaseInfo: object;
  studentId: string;
  termsAccepted: boolean;
}

export interface TopUpFormData {
  userName: string;
  phoneNumber: string;
  email: string;
  subscriptionPlan: string;
  termsAccepted: boolean;
}

export interface FeedbackPayload {
  fullName: string;
  phoneNumber: string;
  category: string;
  comment: string;
  registrationType: string;
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
  selectedCard?: SelectedCard;
  isCustodian: boolean;
  credentials: Credentials;
  provider: string;
  registrationType: string;
  purchaseInfo: object;
  studentId: string;
  termsAccepted: boolean;
}

export interface CustomerPayload {
  regID: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: Date;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  selectedCard: SelectedCard;
  isCustodian: boolean;
  dateTime: Date;
  credentials: Credentials;
  studentId: string;
}

export interface RegistrantPayload {
  phoneNumber: string;
  email: string;
  userName: string;
  clientReference?: string;
}

interface Credentials {
  userName: string;
  password: string;
}

interface SelectedCard {
  name: string;
  url: string;
}

export interface FeedbackFormData {
  fullName: string;
  phoneNumber: string;
  comment: string;
  category: string;
}

export interface FloatButtonProps {
  modalState: {
    setQrScan: (open: boolean) => void;
    setFeedback: (open: boolean) => void;
  };
}
