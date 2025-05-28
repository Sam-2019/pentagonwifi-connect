import { PaymentInfo, PaystackSuccessReference, DbPayload } from "@/lib/types";
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

  const onSuccess = (reference: PaystackSuccessReference): void => {
    console.log("Payment successful: ", reference);
    const payload: DbPayload = {
      ...paymentInfo,
      reference: reference.reference,
      transaction: reference.transaction,
      status: reference.status,
      message: reference.message,
    };
  };

  const onClose = () => {};
  const initializePayment = usePaystackPayment(config);

  return {
    initialize: () => {
      initializePayment({
        onSuccess,
        onClose,
      });
    },
  };
};
