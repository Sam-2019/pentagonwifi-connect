import { toast } from "sonner";
import { Check } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  planPrices,
  dataPlanOptions,
  topupSchema,
  topup,
  hubtel,
  registrationType,
  getRegistrant,
} from "@/lib/utils";
import type { TopUpFormData, UserInfo } from "@/lib/types";
import TermCondition from "./TermCondition";
import PaymentModal from "./PaymentModal";
import { paystackPay } from "@/hooks/use-paystack";
import { hubtelPay } from "@/hooks/use-hubtel";

const TopUpForm: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [totalPayable, setTotalPayable] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(topupSchema),
    defaultValues: {
      userName: "",
      phoneNumber: "",
      email: "",
      subscriptionPlan: "",
    },
  });

  const fee = registrationType.topup.fee;
  const subscriptionPlan = watch("subscriptionPlan") as keyof typeof planPrices;

  const planFee = subscriptionPlan.includes("Daily")
    ? planPrices.daily
    : subscriptionPlan.includes("Weekly")
    ? planPrices.weekly
    : subscriptionPlan.includes("Monthly")
    ? planPrices.monthly
    : 0;

  const totalCost = fee + planFee;

  const onSubmit = async (data: TopUpFormData) => {
    setTotalPayable(totalCost);
    const paymentProvider = import.meta.env.VITE_PAYMENT_PROVIDER;
    const capitalizePaymentProvider = String(paymentProvider).toUpperCase();
    const capitalizeSubscriptionPlan = data.subscriptionPlan.toUpperCase();

    const credentials = {
      userName: data.userName,
      password: "",
    };

    const modFormdata = {
      phoneNumber: data.phoneNumber,
      email: data.email,
      userName: data.userName,
    };

    const result = await getRegistrant(modFormdata)
   console.log(result)

    // const userInfo: UserInfo = {
    //   ...data,
    //   fullName: "N/A",
    //   subscriptionPlan: capitalizeSubscriptionPlan,
    //   planFee: planFee,
    //   registrationFee: fee,
    //   totalCost: totalCost,
    //   dateTime: new Date(),
    //   dateOfBirth: null,
    //   blockCourt: "N/A",
    //   roomType: "N/A",
    //   roomNumber: "N/A",
    //   isCustodian: false,
    //   credentials: credentials,
    //   provider: capitalizePaymentProvider,
    //   registrationType: registrationType.topup.name,
    // };

    // if (paymentProvider === hubtel) {
    //   const payment = hubtelPay(userInfo);
    //   payment.initialize(toast, setIsPaymentModalOpen, reset);
    //   return;
    // }

    // const payment = paystackPay(userInfo);
    // payment.initialize(toast, setIsPaymentModalOpen, reset);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-6 md:p-8 border border-blue-100 sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="userName">User Name</label>
          <input
            id="userName"
            type="text"
            {...register("userName")}
            className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
          />
          <p className="text-red-400">{errors.userName?.message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="phoneNumber">Mobile</label>
            <input
              id="phoneNumber"
              type="text"
              {...register("phoneNumber")}
              className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            />
            <p className="text-red-400">{errors.phoneNumber?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              {...register("email")}
              className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            />
            <p className="text-red-400">{errors.email?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subscriptionPlan">Data Plan</label>
          <select
            {...register("subscriptionPlan")}
            id="subscriptionPlan"
            className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
          >
            {dataPlanOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-red-400">{errors.subscriptionPlan?.message}</p>
        </div>

        <div className="mt-4 border-t" />

        <div className="flex flex-col md:flex-row gap-2 bg-muted rounded-lg p-6 border-gray-300">
          <div className="text-gray-700 w-full">
            <p>
              <strong>Plan Fee:</strong> GHC {planFee}
            </p>
          </div>

          <div className="self-center text-center w-full md:py-0 pt-4">
            <p className="text-2xl font-semibold text-primary">
              Total: GHC {totalCost}
            </p>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full py-3 px-4 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
          >
            Connect Me
            <Check className="h-5 w-5 mr-2" />
          </Button>
        </div>

        <TermCondition />
      </form>

      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        registrationType={topup}
        amount={`GHC ${totalPayable}`}
      />
    </div>
  );
};

export default TopUpForm;
