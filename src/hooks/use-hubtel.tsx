import { DbPayload, PaymentInfo } from "@/lib/types";
import { googleScriptUrl } from "@/lib/utils";
import CheckoutSdk from "@hubteljs/checkout";

export const hubtelPay = (paymentInfo: PaymentInfo) => {
  const checkout = new CheckoutSdk();
  const purchaseInfo = {
    amount: paymentInfo.totalCost,
    purchaseDescription: `Payment of GHS ${
      paymentInfo.planFee
    } PENTAGONWIFI ${paymentInfo.subscriptionPlan.toUpperCase()} data package for (${paymentInfo.fullName.toUpperCase()}-${
      paymentInfo.phoneNumber
    })`,
    customerPhoneNumber: `'${paymentInfo.phoneNumber}`,
    clientReference: paymentInfo.clientReference,
  };

  const config = {
    callbackUrl: import.meta.env.VITE_CALLBACK_URL,
    merchantAccount: import.meta.env.VITE_MERCHANT,
    basicAuth: import.meta.env.VITE_BASIC_AUTH,
  };

  return {
    initialize: (
      toast: {
        promise: (
          promise: Promise<any>,
          options: { loading: string; success: string; error: string }
        ) => void;
      },
      setIsSuccessModalOpen: (value: boolean) => void,
      reset: () => void,
      setDatePickerValue?: (value: {
        startDate: Date | null;
        endDate: Date | null;
      }) => void
    ) => {
      checkout.openModal({
        purchaseInfo: purchaseInfo,
        config: config,
        callBacks: {
          onInit: () => console.log("Iframe initialized: "),
          onPaymentSuccess: (data) => {
            console.log("Payment successful: ", data.data);
            const reference = data.data;
            const stringifyReference = JSON.stringify(reference);

            const purchaseInfo: DbPayload = {
              ...paymentInfo,
              providerResponse: stringifyReference,
            };

            checkout.closePopUp();
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
          },
          onPaymentFailure: (data) => console.log("Payment failed: ", data),
          onLoad: () => console.log("Checkout has been loaded: "),
          onFeesChanged: (fees) =>
            console.log("Payment channel has changed: ", fees),
          onResize: (size) =>
            console.log("Iframe has been resized: ", size?.height),
          onClose: () => console.log("The modal has closed"),
        },
      });
    },
  };
};
