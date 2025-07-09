import * as yup from "yup";
import { twMerge } from "tailwind-merge";
import type {
	SalesPayload,
	CustomerPayload,
	RegistrantPayload,
	PendingPaymentPayload,
	FailedRegistrationPayload,
	PendingRegistrationPayload,
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

export enum PasswordType {
	TEXT = "text",
	PASSWORD = "password",
}

export const topup = "Top Up";
export const registration = "Registration";

export const server = "server";
export const duplicateError = "Duplicate error";
export const toastSuccess = "Registration complete!";
export const toastLoading = "Connecting you to Pentagon WiFi...";
export const toastError = "Registration failed. Please try again.";
export const noCustomerFound = "No customer found";
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

export const registrationType = {
	topup: {
		name: topup,
		fee: 0,
	},
	registration: {
		name: registration,
		fee: 50,
	},
};

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

export const schema = yup
	.object({
		fullName: yup
			.string()
			.required("Name is required.")
			.matches(/^[A-Za-z]+(?:\s[A-Za-z]{3,}){1,2}$/, "Name is invalid."),
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
				"Email is invalid.",
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
				"Username is invalid.",
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
				"Email is invalid.",
			),
		subscriptionPlan: yup.string().required("Subscription plan is required"),
		userName: yup
			.string()
			.required("Username is required.")
			.matches(
				/^(?!.*__)(?!_)(?!.*_$)(?=.*[A-Za-z])(?=^[A-Za-z\d_]*\d{4}[A-Za-z\d_]*$)[A-Za-z\d_]+$/,
				"Username is invalid.",
			),
	})
	.required();

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

const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${auth}`,
};

export const checkUserNameAvailability = async (payload) => {
	const queryParams = {
		userName: payload.userName,
	};

	const options = {
		method: "GET",
		mode: "cors" as RequestMode,
		headers: headers,
	};

	const queryString = new URLSearchParams(queryParams).toString();
	const endpoint = `${baseUrl}/api/customer/availabilty?${queryString}`;

	return fetch(endpoint, options).then(async (res) => {
		return await res.json();
	});
};

export const postRegistration = async (payload: PendingPaymentPayload) => {
	return fetch(`${baseUrl}/api/registration`, {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(payload),
		headers: headers,
	}).then(async (res) => {
		const results = await res.json();
	});
};

export const postSale = async (payload: SalesPayload) => {
	fetch(`${baseUrl}/api/sale`, {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(payload),
		headers: headers,
	}).then(async (res) => {
		const results = await res.json();
	});
};

export const postPendingRegistration = async (
	payload: PendingRegistrationPayload,
) => {
	fetch(`${baseUrl}/api/pending-registration`, {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(payload),
		headers: headers,
	}).then(async (res) => {
		const results = await res.json();
	});
};

export const postFailedRegistration = async (
	payload: FailedRegistrationPayload,
) => {
	fetch(`${baseUrl}/api/failed-registration`, {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(payload),
		headers: headers,
	}).then(async (res) => {
		const results = await res.json();
	});
};

export const postCustomer = async (payload: CustomerPayload) => {
	return fetch(`${baseUrl}/api/customer`, {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(payload),
		headers: headers,
	}).then(async (res) => {
		return await res.json();
	});
};

export const getCustomer = async (payload: RegistrantPayload) => {
	const queryParams = {
		phoneNumber: payload.phoneNumber,
		email: payload.email,
		userName: payload.userName,
	};

	const options = {
		method: "GET",
		mode: "cors" as RequestMode,
		headers: headers,
	};

	const queryString = new URLSearchParams(queryParams).toString();
	const endpoint = `${baseUrl}/api/customer?${queryString}`;

	return fetch(endpoint, options).then(async (res) => {
		const results = await res.json();
		return results;
	});
};
