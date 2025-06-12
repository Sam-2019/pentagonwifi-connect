import type { PaymentInfo, PaystackSuccessReference, SalesPayload } from "@/lib/types";
import { googleScriptUrl } from "@/lib/utils";
import { usePaystackPayment } from "react-paystack";
import { v4 as uuidv4 } from "uuid";

export const paystackPay = (paymentInfo: PaymentInfo, regID: string) => {
	const reference = String(uuidv4());
	const slicedReference = reference.slice(0, 8);
	const clientReference = `PWT-${slicedReference}`;

	const config = {
		reference: clientReference,
		email: paymentInfo.email,
		amount: paymentInfo.totalCost,
		publicKey: import.meta.env.VITE_STACK_COLLECTIONS,
		currency: import.meta.env.VITE_CURRENCY,
		metadata: {
			custom_fields: [
				{
					display_name: "Full Name",
					variable_name: "fullName",
					value: String(paymentInfo.fullName),
				},
				{
					display_name: "Phone Number",
					variable_name: "phoneNumber",
					value: String(paymentInfo.phoneNumber),
				},
				{
					display_name: "Subscription Plan",
					variable_name: "subscriptionPlan",
					value: String(paymentInfo.subscriptionPlan.toUpperCase()),
				},
			],
		},
	};

	const stringifyPurchaseInfo = JSON.stringify(config);

	const onSuccess = (
		toast: {
			promise: (
				promise: Promise<unknown>,
				options: { loading: string; success: string; error: string },
			) => void;
		},
		setIsSuccessModalOpen: (value: boolean) => void,
		reset: () => void,
		setDatePickerValue: (value: { startDate: null; endDate: null }) => void,
		setRegID: (value: string) => void,
		reference: PaystackSuccessReference,
	): void => {
		console.log("Payment successful: ", reference);
		const stringifyResponse = JSON.stringify(reference);

		const purchaseInfo: SalesPayload = {
			...paymentInfo,
			regID: regID,
			clientReference: clientReference,
			purchaseInfo: stringifyPurchaseInfo,
			providerResponse: stringifyResponse,
			transactionId: reference.transaction,
			externalTransactionId: null,
		};

		toast.promise(
			fetch(googleScriptUrl, {
				method: "POST",
				mode: "no-cors",
				body: JSON.stringify(purchaseInfo),
				headers: {
					"Content-Type": "application/json",
				},
			}).then(() => {
				setTimeout(() => setIsSuccessModalOpen(true), 300);
				reset();
				setRegID("");
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
	};

	const onClose = () => {};
	const initializePayment = usePaystackPayment(config);

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
			setDatePickerValue: (value: { startDate: null; endDate: null }) => void,
			setRegID: (value: string) => void,
		) => {
			initializePayment({
				onSuccess: (reference: PaystackSuccessReference) =>
					onSuccess(
						toast,
						setIsSuccessModalOpen,
						reset,
						setDatePickerValue,
						setRegID,
						reference,
					),
				onClose,
			});
		},
	};
};
