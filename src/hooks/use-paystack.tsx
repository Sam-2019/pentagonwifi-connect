import type {
  PaystackSuccessReference,
  PendingPaymentPayload,
  SalesPayload,
  UserInfo,
} from "@/lib/types";
import {
  writePendingRegistration,
  writeRegistration,
  writeSale,
} from "@/lib/utils";
import { usePaystackPayment } from "react-paystack";
import { v4 as uuidv4 } from "uuid";

export const paystackPay = (userInfo: UserInfo) => {
  const reference = String(uuidv4());
  const slicedReference = reference.slice(0, 8);
  const clientReference = `PWT-${slicedReference}`;

  const config = {
    reference: clientReference,
    email: userInfo.email,
    amount: userInfo.totalCost,
    publicKey: import.meta.env.VITE_STACK_COLLECTIONS,
    currency: import.meta.env.VITE_CURRENCY,
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "fullName",
          value: String(userInfo.fullName),
        },
        {
          display_name: "Phone Number",
          variable_name: "phoneNumber",
          value: String(userInfo.phoneNumber),
        },
        {
          display_name: "Subscription Plan",
          variable_name: "subscriptionPlan",
          value: String(userInfo.subscriptionPlan.toUpperCase()),
        },
      ],
    },
  };

  const stringifyPurchaseInfo = JSON.stringify(config);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializePayment = usePaystackPayment(config);

  const checkoutInfo: PendingPaymentPayload = {
    ...userInfo,
    purchaseInfo: stringifyPurchaseInfo,
    clientReference: clientReference,
  };

  const response = writeRegistration(checkoutInfo);
  response
    .then((res) => {})
    .catch((err) => console.log(err))
    .finally(() => {});

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

    const saleInfo: SalesPayload = {
      ...checkoutInfo,
      providerResponse: stringifyResponse,
      transactionId: reference.transaction,
      externalTransactionId: null,
    };

    toast.promise(
      writeSale(saleInfo).then(() => {
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

  const onClose = () => {
    const response = writePendingRegistration(checkoutInfo);
    response
      .then((res) => {})
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  return {
    initialize: (
      toast: {
        promise: (
          promise: Promise<unknown>,
          options: { loading: string; success: string; error: string }
        ) => void;
      },
      setIsSuccessModalOpen: (value: boolean) => void,
      reset: () => void,
      setDatePickerValue: (value: { startDate: null; endDate: null }) => void
    ) => {
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
