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
	postPendingRegistration,
	postRegistration,
	postSale,
	postCustomer,
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

	const stringifyPurchaseInfo = JSON.stringify(purchaseInfo);

	const config = {
		callbackUrl: import.meta.env.VITE_CALLBACK_URL,
		merchantAccount: import.meta.env.VITE_MERCHANT,
		basicAuth: import.meta.env.VITE_BASIC_AUTH,
	};

	const checkoutInfo: PendingPaymentPayload = {
		...registrationInfo,
		purchaseInfo: stringifyPurchaseInfo,
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
			userInfo: CustomerPayload,
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

						const stringifyResponse = JSON.stringify(response);
						const parseResponse = JSON.parse(response);
						const transactionId = parseResponse.transactionId;
						const externalTransactionId = parseResponse.externalTransactionId;

						const saleInfo: SalesPayload = {
							...checkoutInfo,
							providerResponse: stringifyResponse,
							transactionId: transactionId,
							externalTransactionId: externalTransactionId,
						};
						setLoading();
						checkout.closePopUp();
						toast.promise(
							postSale(saleInfo).then(() => {
								if (registrationType === registration) {
									postCustomer(userInfo);
								}
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
					},
					onPaymentFailure: (data) => {
						// console.log("Payment failed: ", data);
						const response = data.data;

						const stringifyResponse = JSON.stringify(response);
						const failureInfo: FailedRegistrationPayload = {
							...checkoutInfo,
							providerResponse: stringifyResponse,
						};
						setLoading();
						checkout.closePopUp();
						toast.promise(
							postFailedRegistration(failureInfo).then(() => {}),
							{
								loading: toastLoading,
								success: toastError,
								error: toastError,
							},
						);
					},
					onLoad: () => {
						// console.log("Checkout has been loaded: ");
					},
					onFeesChanged: (fees) => {
						// console.log("Payment channel has changed: ", fees);
					},
					onResize: (size) => {
						// console.log("Iframe has been resized: ", size?.height);
					},
					onClose: () => {
						setLoading();
						postPendingRegistration(checkoutInfo)
							.then((res) => {})
							.catch((err) => {})
							.finally(() => {});
					},
				},
			});
		},
	};
};
