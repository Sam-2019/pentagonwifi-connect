import type {
	FailedRegistrationPayload,
	PendingPaymentPayload,
	SalesPayload,
	RegistrationInfo,
	CustomerPayload,
} from "@/lib/types";
import {
	toastError,
	toastLoading,
	toastSuccess,
	postFailedRegistration,
	postRegistration,
	postSale,
	registration,
} from "@/lib/utils";
import CheckoutSdk from "@hubteljs/checkout";
import { v4 as uuidv4 } from "uuid";

export const hubtelPay = (registrationInfo: RegistrationInfo) => {
	const checkout = new CheckoutSdk();

	const reference = String(uuidv4());
	const slicedReference = reference.slice(0, 8);
	const clientReference = `PWT-${slicedReference}`;
	const credentials = registrationInfo.credentials;
	const userName = credentials.userName;

	const registrationType = registrationInfo.registrationType;

	const purchaseDescription = `Payment of GHS ${
		registrationInfo.planFee
	} PENTAGONWIFI ${registrationInfo.subscriptionPlan.toUpperCase()} data package for (${registrationInfo.fullName.toUpperCase()}-${
		registrationInfo.phoneNumber
	})`;

	const topupDescription = `Top-up of GHS ${
		registrationInfo.planFee
	} PENTAGONWIFI ${registrationInfo.subscriptionPlan.toUpperCase()} data package for (${userName}-${
		registrationInfo.phoneNumber
	})`;

	const purchaseInfo = {
		amount: registrationInfo.totalCost,
		purchaseDescription:
			registrationType === registration
				? purchaseDescription
				: topupDescription,
		customerPhoneNumber: `'${registrationInfo.phoneNumber}`,
		clientReference: clientReference,
	};

	const config = {
		callbackUrl: import.meta.env.VITE_CALLBACK_URL,
		merchantAccount: import.meta.env.VITE_MERCHANT,
		basicAuth: import.meta.env.VITE_BASIC_AUTH,
	};

	const checkoutInfo: PendingPaymentPayload = {
		...registrationInfo,
		purchaseInfo: purchaseInfo,
		clientReference: clientReference,
	};

	postRegistration(checkoutInfo)
		.then((res) => {})
		.catch((err) => {})
		.finally(() => {});

	return {
		initialize: (
			toast: {
				promise: (
					promise: Promise<unknown>,
					options: { loading: string; success: string; error: string },
				) => void;
			},
			setIsSuccessModalOpen: (value: boolean) => void,
			reset: () => void,
			setLoading: () => void,
			setDatePickerValue?: (value: {
				startDate: Date | null;
				endDate: Date | null;
			}) => void,
		) => {
			checkout.openModal({
				purchaseInfo: purchaseInfo,
				config: config,
				callBacks: {
					onInit: () => {},
					onPaymentSuccess: (data) => {
						// console.log("Payment successful: ", data.data);
						const response = data.data;
						const parseResponse = JSON.parse(response);
						const transactionId = parseResponse.transactionId;
						const externalTransactionId = parseResponse.externalTransactionId;

						const saleInfo: SalesPayload = {
							...checkoutInfo,
							providerResponse: parseResponse,
							transactionId: transactionId,
							externalTransactionId: externalTransactionId,
						};

						checkout.closePopUp();
						toast.promise(
							postSale(saleInfo).then(() => {
								setTimeout(() => setIsSuccessModalOpen(true), 300);
								reset();
								setDatePickerValue({
									startDate: null,
									endDate: null,
								});
							}),
							{
								loading: toastLoading,
								success: toastSuccess,
								error: toastError,
							},
						);
						setLoading();
					},
					onPaymentFailure: (data) => {
						const response = data.data;
						const failureInfo: FailedRegistrationPayload = {
							...checkoutInfo,
							providerResponse: response,
						};

						checkout.closePopUp();
						toast.promise(
							postFailedRegistration(failureInfo).then(() => {
								reset();
								setDatePickerValue({
									startDate: null,
									endDate: null,
								});
							}),
							{
								loading: toastLoading,
								success: toastError,
								error: toastError,
							},
						);
						setLoading();
					},
					onLoad: () => {
						// console.log("Checkout has been loaded: ");
					},
					onFeesChanged: (fees) => {
					},
					onResize: (size) => {
					},
					onClose: () => {
						reset();
						setDatePickerValue({
							startDate: null,
							endDate: null,
						});
						setLoading();
					},
				},
			});
		},
	};
};
