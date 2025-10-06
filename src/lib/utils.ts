import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import metaverse from "@/assets/cards/metaverse.png";
import spiderman from "@/assets/cards/spiderman.jpg";
import tombraider from "@/assets/cards/tombraider.jpg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum PasswordType {
  TEXT = "text",
  PASSWORD = "password",
}

export const topup = "Top Up";
export const feedback = "Feedback";
export const membership = "Membership";
export const registration = "Registration";

export const server = "server";
export const duplicateError = "Duplicate error";
export const noCustomerFound = "No customer found";
export const toastSuccess = "Registration complete!";
export const toastLoading = "Connecting you to Pentagon WiFi...";
export const toastError = "Registration failed. Please try again.";
export const registerFirst = "New customer? Kindly register first.";

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

export const cards = [
  {
    id: 0,
    websrc: "",
    localsrc: metaverse,
    name: "metaverse",
  },
  {
    id: 1,
    websrc: "",
    localsrc: spiderman,
    name: "spiderman",
  },
  {
    id: 2,
    websrc: "",
    localsrc: tombraider,
    name: "tombraider",
  },
];

export const registrationType = {
  topup: {
    name: topup,
    fee: 0,
  },
  registration: {
    name: registration,
    fee: 50,
  },
  feedback: {
    name: feedback,
    fee: 0,
  },
  membership: {
    name: membership,
    fee: 100,
  },
};

export const planPrices = {
  daily: 20,
  weekly: 100,
  monthly: 399,
  membership: 0,
};

export const dataPlanOptions = [
  { value: "", label: "Select an option..." },
  // {
  //   value: `Membership-(GHC ${planPrices.membership})`,
  //   label: "Membership",
  // },
  {
    value: `Daily-(GHC ${planPrices.daily})`,
    label: `Daily (GHC ${planPrices.daily})`,
  },
  // { value: `Weekly-(GHC ${planPrices.weekly})`, label: `Weekly (GHC ${planPrices.weekly})` },
  // { value: `Monthly-(GHC ${planPrices.monthly})`, label: `Monthly (GHC ${planPrices.monthly})` }
];

export const feedbackCategories = [
  { value: "", label: "Select an option..." },
  { value: "Router", label: "Router" },
  { value: "Payment", label: "Payment" },
  { value: "Service delivery", label: "Service delivery" },
  { value: "Internet connection", label: "Internet connection" },
  { value: "Other", label: "Other" },
];

export const hubtel = import.meta.env.VITE_HUBTEL;
export const paystack = import.meta.env.VITE_PAYSTACK;
export const auth = import.meta.env.VITE_AUTHORIZATION;

export const googleScriptUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_GOOGLE_SCRIPTS_TEST
    : import.meta.env.VITE_GOOGLE_SCRIPTS_LIVE;

export const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_BASE_DEV_URL
    : import.meta.env.VITE_BASE_PROD_URL;
