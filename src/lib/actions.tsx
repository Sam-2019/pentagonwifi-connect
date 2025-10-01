import { baseUrl, auth } from "./utils";
import type {
	SalesPayload,
	CustomerPayload,
	FeedbackPayload,
	RegistrantPayload,
	PendingPaymentPayload,
	FailedRegistrationPayload,
	PendingRegistrationPayload,
} from "./types";

export const headers = {
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

export const postFeedback = async (payload: FeedbackPayload) => {
	return fetch(`${baseUrl}/api/feedback`, {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(payload),
		headers: headers,
	}).then(async (res) => {
		const results = await res.json();
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
