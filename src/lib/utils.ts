import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";

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
  userName: string;
  password: string;
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
  credentials: string,
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
    userName: yup
    .string()
    .required("Username is required.")
    .matches(/^(?!.*__)(?!_)(?!.*_$)(?=.*[A-Za-z])(?=^[A-Za-z\d_]*\d{4}[A-Za-z\d_]*$)[A-Za-z\d_]+$/, "Username is invalid."),
  password: yup.string().required("Password is required."),
  })
  .required();
