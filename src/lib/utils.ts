import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const registrationFee = 50;

export const blockCourtOptions = [
  { value: "", label: "Select an option..." },
  { value: "Block-A", label: "Block-A" },
  { value: "Block-B", label: "Block-B" },
  { value: "Block-C", label: "Block-C" },
  { value: "Addis Ababa Court", label: "Addis Ababa Court" },
  { value: "Dar es Salaam Court", label: "Dar es Salaam Court" },
  { value: "Kampala Court", label: "Kampala Court" },
  { value: "Nairobi Court", label: "Nairobi Court" },
];

export const roomTypeOptions = [
  { value: "", label: "Select an option..." },
  { value: "1-in-a-room", label: "1 in a room" },
  { value: "2-in-a-room", label: "2 in a room" },
  { value: "3-in-a-room", label: "3 in a room" },
  { value: "4-in-a-room", label: "4 in a room" },
];

export const planPrices = {
  daily: 20,
  weekly: 100,
  monthly: 399,
};

export const dataPlanOptions = [
  { value: "", label: "Select an option..." },
  {
    value: `Daily-(GHC ${planPrices.daily})`,
    label: `Daily (GHC ${planPrices.daily})`,
  },
  // { value: `Weekly-(GHC ${planPrices.weekly})`, label: `Weekly (GHC ${planPrices.weekly})` },
  // { value: `Monthly-(GHC ${planPrices.monthly})`, label: `Monthly (GHC ${planPrices.monthly})` }
];

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

export const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required.")
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]+){1,3}$/, "Name is invalid."),
    dateOfBirth: yup
      .date()
      .required("Date of birth is required.")
      .typeError("Invalid date"),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^(?:\+?\d{7,15}|0\d{9})$/, "Phone number is invalid"),
    email: yup
      .string()
      .email()
      .required("Email is required.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid."
      ),
    blockCourt: yup.string().required("Block / Court is required."),
    roomType: yup.string().required("Room Type is required"),
    roomNumber: yup.string().required("Room number is required."),
    subscriptionPlan: yup.string().required("Subscription plan is required"),
    isCustodian: yup.bool().default(false).required("Custodian is required"),
  })
  .required();

const reference = String(uuidv4());
const slicedReference = reference.slice(0, 8);
export const clientReference = `PWT-${slicedReference}`;

export const googleScriptUrl = import.meta.env.DEV
  ? import.meta.env.VITE_GOOGLE_SCRIPTS_TEST
  : import.meta.env.VITE_GOOGLE_SCRIPTS_LIVE;

const current_payment_provider = import.meta.env.VITE_PAYMENT_PROVIDER;

function switchPaymentProvider(provider: string) {
  switch (provider) {
    case "paystack":
      return hubtelPay;
    case "hubtel":
      return paystackPay;
    default:
      throw new Error("Invalid payment provider");
  }
}

const hubtelPay = () => {};

const paystackPay = () => {};
