import type {
  SalesPayload,
  RegistrationInfo,
  PendingPaymentPayload,
  PaystackSuccessReference,
} from "@/lib/types";
import {
  postSale,
  postRegistration,
  postPendingRegistration,
} from "@/lib/actions";
import { v4 as uuidv4 } from "uuid";
import { usePaystackPayment } from "react-paystack";
import { toastError, toastLoading, toastSuccess } from "@/lib/utils";

export const paystackPay = (userInfo: RegistrationInfo) => {
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializePayment = usePaystackPayment(config);

  const checkoutInfo: PendingPaymentPayload = {
    ...userInfo,
    purchaseInfo: config,
    clientReference: clientReference,
  };

  const response = postRegistration(checkoutInfo);
  response
    .then((res) => {})
    .catch((err) => {})
    .finally(() => {});

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
    reference: PaystackSuccessReference,
  ): void => {
    // console.log("Payment successful: ", reference);

    const saleInfo: SalesPayload = {
      ...checkoutInfo,
      providerResponse: reference,
      transactionId: reference.transaction,
      externalTransactionId: null,
    };

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
  };

  const onClose = () => {
    const response = postPendingRegistration(checkoutInfo);
    response
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
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
      setDatePickerValue?: (value: { startDate: null; endDate: null }) => void,
    ) => {
      initializePayment({
        onSuccess: (reference: PaystackSuccessReference) =>
          onSuccess(
            toast,
            setIsSuccessModalOpen,
            reset,
            setDatePickerValue,
            reference,
          ),
        onClose,
      });
    },
  };
};
