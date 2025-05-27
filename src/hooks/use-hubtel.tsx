import { PaymentInfo } from "@/lib/utils";
import CheckoutSdk from "@hubteljs/checkout";

export const hubtelPay = (paymentInfo: PaymentInfo) => {
  const checkout = new CheckoutSdk();
  const purchaseInfo = {
    amount: paymentInfo.amount,
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
    check_out: () => {
      checkout.openModal({
        purchaseInfo: purchaseInfo,
        config: config,
        callBacks: {
          onInit: () => console.log("Iframe initialized: "),
          onPaymentSuccess: (data) => {
            console.log("Payment succeeded: ", data);
            checkout.closePopUp();
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
