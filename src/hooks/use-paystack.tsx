import type { PaymentInfo, PaystackSuccessReference, DbPayload } from "@/lib/types";
import { googleScriptUrl } from "@/lib/utils";
import { usePaystackPayment } from "react-paystack";

export const paystackPay = (paymentInfo: PaymentInfo) => {
  const config = {
    reference: paymentInfo.clientReference,
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

  const onSuccess = (
    toast: {
      promise: (
        promise: Promise<unknown>,
        options: { loading: string; success: string; error: string }
      ) => void;
    },
    setIsSuccessModalOpen: (value: boolean) => void,
    reset: () => void,
    setDatePickerValue: (value: { startDate: null; endDate: null }) => void,
    reference: PaystackSuccessReference
  ): void => {
    console.log("Payment successful: ", reference);
    const stringifyResponse = JSON.stringify(reference);

    const purchaseInfo: DbPayload = {
      ...paymentInfo,
      providerResponse: stringifyResponse,
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
        setDatePickerValue({
          startDate: null,
          endDate: null,
        });
      }),
      {
        loading: "Connecting you to Pentagon WiFi...",
        success: "Registration complete!",
        error: "Registration failed. Please try again.",
      }
    );
  };

  const onClose = () => {};
  const initializePayment = usePaystackPayment(config);

  return {
    initialize: (
toast: {
	promise: (
		promise: Promise<unknown>,
		options: { loading: string; success: string; error: string; }
	) => void;
}, setIsSuccessModalOpen: (value: boolean) => void, reset: () => void, setDatePickerValue?: (value: { startDate: null; endDate: null; }) => void, setClientReference?: unknown    ) => {
      initializePayment({
        onSuccess: (reference: PaystackSuccessReference) =>
          onSuccess(
            toast,
            setIsSuccessModalOpen,
            reset,
            setDatePickerValue,
            reference
          ),
        onClose,
      });
    },
  };
};
