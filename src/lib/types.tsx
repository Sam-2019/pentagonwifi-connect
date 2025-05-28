
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
  }
  
  export interface Payload {
    fullName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    blockCourt: string;
    roomType: string;
    roomNumber: string;
    subscriptionPlan: string;
    isCustodian: boolean;
    totalCost: string;
    dateTime: string;
  }
  
  export interface PaystackSuccessReference {
    reference: string;
    transaction: string;
    status: string;
    message: string;
  }
  
  export interface PaymentInfo {
    fullName: string;
    phoneNumber: string;
    subscriptionPlan: string;
    planFee: number;
    amount: number;
    clientReference: string;
  
    email?: string;
    dateOfBirth?: Date;
    blockCourt?: string;
    roomType?: string;
    roomNumber?: string;
    isCustodian?: boolean;
    totalCost?: number;
  }
  
  export interface DbPayload {
    fullName: string;
    phoneNumber: string;
    subscriptionPlan: string;
    planFee: number;
    amount: number;
    clientReference: string;
  
    email?: string;
    dateOfBirth?: Date;
    blockCourt?: string;
    roomType?: string;
    roomNumber?: string;
    isCustodian?: boolean;
    totalCost?: number;
  
    status: string;
    message: string;
    reference: string;
    transaction: string;
  }