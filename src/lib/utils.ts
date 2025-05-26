import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  { value: "Nairobi Court", label: "Nairobi Court" }
];
export const roomTypeOptions = [
  { value: "", label: "Select an option..." },
  { value: "1-in-a-room", label: "1 in a room" },
  { value: "2-in-a-room", label: "2 in a room" },
  { value: "3-in-a-room", label: "3 in a room" },
  { value: "4-in-a-room", label: "4 in a room" }
]
export const planPrices = {
  daily: 20,
  weekly: 100,
  monthly: 399,
};
export const dataPlanOptions = [
  { value: "", label: "Select an option..." },
  { value: `Daily-(GHC ${planPrices.daily})`, label: `Daily (GHC ${planPrices.daily})` },
  // { value: `Weekly-(GHC ${planPrices.weekly})`, label: `Weekly (GHC ${planPrices.weekly})` },
  // { value: `Monthly-(GHC ${planPrices.monthly})`, label: `Monthly (GHC ${planPrices.monthly})` }
]
