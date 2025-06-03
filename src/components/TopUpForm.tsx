import dayjs from "dayjs";
import { toast } from "sonner";
import { Check } from "lucide-react";
import type React from "react";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  planPrices,
  dataPlanOptions,
  schema,
  clientReference,
  hubtel,
  dateOptions,
} from "@/lib/utils";
import type { FormData } from "@/lib/types";
import { hubtelPay } from "@/hooks/use-hubtel";
import { paystackPay } from "@/hooks/use-paystack";
import TermsC from "./TermsC";

const TopUp: React.FC = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState({
    startDate: null,
    endDate: null,
  });

  dayjs.extend(localizedFormat);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "Kwame Opam",
      dateOfBirth: new Date("2025-01-01"),
      phoneNumber: "0245131563",
      email: "kwame.opam@gmail.com",
      blockCourt: "",
      roomType: "",
      roomNumber: "A201",
      subscriptionPlan: "",
      isCustodian: false,
      userName: "1111",
      password: "1111",
    },
  });

  const subscriptionPlan = watch("subscriptionPlan") as keyof typeof planPrices;

  const planFee = subscriptionPlan.includes("Daily")
    ? planPrices.daily
    : subscriptionPlan.includes("Weekly")
    ? planPrices.weekly
    : subscriptionPlan.includes("Monthly")
    ? planPrices.monthly
    : 0;

  const registrationFee = 0;
  const totalCost = registrationFee + planFee;

  const onSubmit = async (data: FormData) => {
    const current_payment_provider = import.meta.env.VITE_PAYMENT_PROVIDER;

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
      date
    );

    const credentials = {
      userName: data.userName,
      password: data.password,
    };

    const stringifyCredentials = JSON.stringify(credentials);
    const paymentInfo = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      subscriptionPlan: data.subscriptionPlan.toUpperCase(),
      planFee: planFee,
      registrationFee: registrationFee,
      totalCost: totalCost,
      clientReference: clientReference,
      email: data.email,
      dateOfBirth: new Date(data.dateOfBirth),
      blockCourt: data.blockCourt,
      roomType: data.roomType,
      roomNumber: data.roomNumber,
      isCustodian: data.isCustodian,
      credentials: stringifyCredentials,
      dateTime: formattedDate,
      provider: current_payment_provider,
    };

    if (current_payment_provider === hubtel) {
      const paymentProvider = hubtelPay(paymentInfo);
      paymentProvider.initialize(toast, setIsSuccessModalOpen, reset);
      return;
    }

    const paymentProvider = paystackPay(paymentInfo);
    paymentProvider.initialize(toast, setIsSuccessModalOpen, reset);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-6 md:p-8 border border-blue-100 sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName">User Name</label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
          />
          <p className="text-red-400">{errors.fullName?.message}</p>
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
        <TermsC />
      </form>

      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default TopUp;
