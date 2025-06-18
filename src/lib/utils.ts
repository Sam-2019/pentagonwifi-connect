import * as yup from "yup";
import { twMerge } from "tailwind-merge";
import type {
  SalesPayload,
  PendingRegistrationPayload,
  PendingPaymentPayload,
  FailedRegistrationPayload,
  Registrant,
} from "./types";
import { clsx, type ClassValue } from "clsx";

export const dateOptions = {
  year: "numeric" as const,
  month: "2-digit" as const,
  day: "2-digit" as const,
  hour: "2-digit" as const,
  minute: "2-digit" as const,
  second: "2-digit" as const,
  hour12: false,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const topup = "Top Up";
export const registration = "Registration";

export const toastLoading = "Connecting you to Pentagon WiFi...";
export const toastSuccess = "Registration complete!";
export const toastError = "Registration failed. Please try again.";

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

export const registrationType = {
  topup: {
    name: topup,
    fee: 0,
  },
  registration: {
    name: registration,
    fee: 0,
  },
};

export const planPrices = {
  daily: 1,
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

export const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required.")
      .matches(
        /^(?:[A-Za-z][A-Za-z'-]*\s+){1,}[A-Za-z][A-Za-z'-]*$/,
        "Name is invalid."
      ),
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
      .matches(
        /^(?!.*__)(?!_)(?!.*_$)(?=.*[A-Za-z])(?=^[A-Za-z\d_]*\d{4}[A-Za-z\d_]*$)[A-Za-z\d_]+$/,
        "Username is invalid."
      ),
    password: yup.string().required("Password is required."),
  })
  .required();

export const topupSchema = yup
  .object({
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
    subscriptionPlan: yup.string().required("Subscription plan is required"),
    userName: yup
      .string()
      .required("Username is required.")
      .matches(
        /^(?!.*__)(?!_)(?!.*_$)(?=.*[A-Za-z])(?=^[A-Za-z\d_]*\d{4}[A-Za-z\d_]*$)[A-Za-z\d_]+$/,
        "Username is invalid."
      ),
  })
  .required();

export const hubtel = import.meta.env.VITE_HUBTEL;
export const paystack = import.meta.env.VITE_PAYSTACK;

export const googleScriptUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_GOOGLE_SCRIPTS_TEST
    : import.meta.env.VITE_GOOGLE_SCRIPTS_LIVE;

export const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_BASE_DEV_URL
    : import.meta.env.VITE_BASE_PROD_URL;

export const postRegistration = async (payload: PendingPaymentPayload) => {
  return fetch(`${baseUrl}/api/registration`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const { data } = await res.json();
    return data.regID;
  });
};

export const postSale = async (payload: SalesPayload) => {
  fetch(`${baseUrl}/api/sale`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const { data } = await res.json();
  });
};

export const postPendingRegistration = async (
  payload: PendingRegistrationPayload
) => {
  fetch(`${baseUrl}/api/pending-registration`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const { data } = await res.json();
  });
};

export const postFailedRegistration = async (
  payload: FailedRegistrationPayload
) => {
  fetch(`${baseUrl}/api/failed-registration`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const { data } = await res.json();
  });
};

export const getRegistrant = async (payload: Registrant) => {
  return fetch(`${baseUrl}/api/registrant`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const { message } = await res.json();
    return message;
  });
};
