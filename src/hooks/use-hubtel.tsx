import type { DbPayload, PaymentInfo } from "@/lib/types";
import { baseUrl } from "@/lib/utils";
import CheckoutSdk from "@hubteljs/checkout";
import { v4 as uuidv4 } from "uuid";

export const hubtelPay = (paymentInfo: PaymentInfo) => {
	const checkout = new CheckoutSdk();

	const reference = String(uuidv4());
	const slicedReference = reference.slice(0, 8);
	const clientReference = `PWT-${slicedReference}`;

	const purchaseInfo = {
		amount: paymentInfo.totalCost,
		purchaseDescription: `Payment of GHS ${
			paymentInfo.planFee
		} PENTAGONWIFI ${paymentInfo.subscriptionPlan.toUpperCase()} data package for (${paymentInfo.fullName.toUpperCase()}-${
			paymentInfo.phoneNumber
		})`,
		customerPhoneNumber: `'${paymentInfo.phoneNumber}`,
		clientReference: clientReference,
	};

	const stringifyPurchaseInfo = JSON.stringify(purchaseInfo);

	const config = {
		callbackUrl: import.meta.env.VITE_CALLBACK_URL,
		merchantAccount: import.meta.env.VITE_MERCHANT,
		basicAuth: import.meta.env.VITE_BASIC_AUTH,
	};

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
			setClientReference: (value: string) => void,
			setDatePickerValue?: (value: {
				startDate: Date | null;
				endDate: Date | null;
			}) => void,
		) => {
			checkout.openModal({
				purchaseInfo: purchaseInfo,
				config: config,
				callBacks: {
					onInit: () => console.log("Iframe initialized: "),
					onPaymentSuccess: (data) => {
						console.log("Payment successful: ", data.data);
						const response = data.data;
						const stringifyResponse = JSON.stringify(response);

						const dbInfo: DbPayload = {
							...paymentInfo,
							purchaseInfo: stringifyPurchaseInfo,
							clientReference: clientReference,
							providerResponse: stringifyResponse,
						};
						checkout.closePopUp();
						toast.promise(
							fetch(`${baseUrl}/api/register/sale`, {
								method: "POST",
								mode: "cors",
								body: JSON.stringify(dbInfo),
								headers: {
									"Content-Type": "application/json",
								},
							}).then(() => {
								setTimeout(() => setIsSuccessModalOpen(true), 300);
								reset();
								setClientReference("");

								setDatePickerValue({
									startDate: null,
									endDate: null,
								});
							}),
							{
								loading: "Connecting you to Pentagon WiFi...",
								success: "Registration complete!",
								error: "Registration failed. Please try again.",
							},
						);
					},
					onPaymentFailure: (data) => {
						console.log("Payment failed: ", data);
					},
					onLoad: () => {
						console.log("Checkout has been loaded: ");
					},
					onFeesChanged: (fees) => {
						console.log("Payment channel has changed: ", fees);
					},
					onResize: (size) => {
						console.log("Iframe has been resized: ", size?.height);
					},
					onClose: () => {
						const dbInfo: DbPayload = {
							...paymentInfo,
							purchaseInfo: stringifyPurchaseInfo,
							clientReference: clientReference,
							providerResponse: "N/A",
						};
						fetch(`${baseUrl}/api/register/sale/intent`, {
							method: "POST",
							mode: "cors",
							body: JSON.stringify(dbInfo),
							headers: {
								"Content-Type": "application/json",
							},
						}).then(() => {});
					},
				},
			});
		},
	};
};
