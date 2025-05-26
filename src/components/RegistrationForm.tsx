import dayjs from "dayjs";
import * as yup from "yup";
import { toast } from "sonner";
import { Check } from "lucide-react";
import React, { useState } from "react";
import SuccessModal from "./SuccessModal";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "./ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import Datepicker from "react-tailwindcss-datepicker";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  blockCourtOptions,
  roomTypeOptions,
  planPrices,
  dataPlanOptions,
  registrationFee,
} from "@/lib/utils";
import CheckoutSdk from "@hubteljs/checkout";

const checkout = new CheckoutSdk();

interface FormData {
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  subscriptionPlan: string;
  isCustodian: boolean;
}

interface Payload {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  blockCourt: string;
  roomType: string;
  roomNumber: string;
  subscriptionPlan: string;
  isCustodian: boolean;
  totalCost: string;
  dateTime: string;
}

const RegistrationForm: React.FC = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState({
    startDate: null,
    endDate: null,
  });
  dayjs.extend(localizedFormat);

  const schema = yup
    .object({
      fullName: yup
        .string()
        .required("Name is required.")
        .matches(/^[A-Za-z]+(?:\s[A-Za-z]+){1,3}$/, "Name is invalid."),
      dateOfBirth: yup
        .date()
        .required("Date of birth is required.")
        .typeError("Invalid date"),
      phoneNumber: yup
        .string()
        .required("Phone number is required.")
        .matches(/^(?:\+?\d{7,15}|0\d{9})$/, "Phone number is invalid"),
      email: yup
        .string()
        .email()
        .required("Email is required.")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email is invalid."
        ),
      blockCourt: yup.string().required("Block / Court is required."),
      roomType: yup.string().required("Room Type is required"),
      roomNumber: yup.string().required("Room number is required."),
      subscriptionPlan: yup.string().required("Subscription plan is required"),
      isCustodian: yup.bool().default(false).required("Custodian is required"),
    })
    .required();

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
      fullName: "",
      dateOfBirth: null,
      phoneNumber: "",
      email: "",
      blockCourt: "",
      roomType: "",
      roomNumber: "",
      subscriptionPlan: "",
      isCustodian: false,
    },
  });

  const subscriptionPlan = watch("subscriptionPlan") as keyof typeof planPrices;

  // Calculate the total cost based on the selected subscription plan & the registration fee
  const planFee = subscriptionPlan.includes("Daily")
    ? planPrices.daily
    : subscriptionPlan.includes("Weekly")
    ? planPrices.weekly
    : subscriptionPlan.includes("Monthly")
    ? planPrices.monthly
    : 0;
  const totalCost = registrationFee + planFee;

  const onSubmit = async (data: FormData) => {
    const googleScriptUrl =
      import.meta.env.VITE_ENV === "development"
        ? import.meta.env.VITE_GOOGLE_SCRIPTS_TEST
        : import.meta.env.VITE_GOOGLE_SCRIPTS_LIVE;

    // const payload: Payload = {
    //   ...data,
    //   dateOfBirth: `${dayjs(data.dateOfBirth).format("dddd, MMMM D, YYYY")}`,
    //   phoneNumber: `'${data.phoneNumber}`,
    //   totalCost: `${totalCost}`,
    //   dateTime: `${dayjs(new Date()).format("LLLL")}`,
    //   subscriptionPlan: data.subscriptionPlan.toUpperCase(),
    // };

    checkout.openModal({
      purchaseInfo: {
        amount: 50,
        purchaseDescription:
          "Payment of GHS 5.00 for (18013782) (MR SOMUAH STA ADANE-233557913587)",
        customerPhoneNumber: "233557913587",
        clientReference: "unique-client-reference-12345",
      },
      config: {
        branding: "enabled",
        callbackUrl: "",
        merchantAccount: 11334,
        basicAuth: "your-basic-auth-here",
      },
      callBacks: {
        onInit: () => console.log("Iframe initialized: "),
        onPaymentSuccess: (data) => {
          console.log("Payment succeeded: ", data);
          // You can close the popup here
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

    // toast.promise(
    //   fetch(googleScriptUrl, {
    //     method: "POST",
    //     mode: "no-cors",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then(() => {
    //     setTimeout(() => setIsSuccessModalOpen(true), 300);
    //     reset();
    //     setDatePickerValue({
    //       startDate: null,
    //       endDate: null,
    //     });
    //   }),
    //   {
    //     loading: "Connecting you to Pentagon WiFi...",
    //     success: "Registration complete!",
    //     error: "Registration failed. Please try again.",
    //   }
    // );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-6 md:p-8 border border-blue-100 sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName">Name</label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
          />
          <p className="text-red-400">{errors.fullName?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <FormField
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <Datepicker
                displayFormat="DD/MM/YYYY"
                onChange={(newValue) => {
                  setDatePickerValue(newValue);
                  field.onChange(newValue.startDate);
                }}
                useRange={false}
                asSingle={true}
                value={datePickerValue}
                inputClassName="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
              />
            )}
          />
          <p className="text-red-400">{errors.dateOfBirth?.message}</p>
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

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="blockCourt">Block / Court</label>
          <select
            {...register("blockCourt")}
            id="blockCourt"
            className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
          >
            {blockCourtOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-red-400">{errors.blockCourt?.message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="roomType">Room Type</label>
            <select
              {...register("roomType")}
              id="roomType"
              className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            >
              {roomTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-red-400">{errors.roomType?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="roomNumber">Room Number</label>
            <input
              id="roomNumber"
              type="text"
              {...register("roomNumber")}
              className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            />
            <p className="text-red-400">{errors.roomNumber?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subscriptionPlan">Subscription Plan</label>
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

        <div className=" border-gray-200">
          <div className="bg-gradient-to-r from-primary/5 to-accent/10 p-5 rounded-lg space-y-5">
            {/* Headline and Perks */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-1">
                Host. Lead. Connect.
              </h3>
              <p className="text-sm text-gray-600 max-w-md">
                Want more than just connection? Become a{" "}
                <strong>Custodian</strong> and get:
              </p>
              <ul className="list-disc pl-6 text-sm text-gray-600 mt-2">
                <li>50% extra data weekly</li>
                <li>Priority support</li>
              </ul>
            </div>

            {/* Yes/No Decision */}
            <FormField
              control={control}
              name="isCustodian"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <div className="flex gap-4 flex-col sm:flex-row">
                    {/* YES option */}
                    <button
                      type="button"
                      onClick={() => field.onChange(true)}
                      className={`flex-1 border-2 rounded-lg p-4 text-left transition-all ${
                        field.value
                          ? "border-primary bg-white shadow"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <span className="text-md font-semibold text-primary">
                        Yes — I'm Ready to Be a Custodian
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Unlock bonus data, support, and exclusive access.
                      </p>
                    </button>

                    {/* NO option */}
                    <button
                      type="button"
                      onClick={() => field.onChange(false)}
                      className={`flex-1 border-2 rounded-lg p-4 text-left transition-all ${
                        !field.value
                          ? "border-primary bg-white shadow"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <span className="text-md font-semibold text-gray-800">
                        No — I'll Just Stay Connected
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        I'm happy to connect without extra responsibilities.
                      </p>
                    </button>
                  </div>

                  {/* Inline confirmation */}
                  {field.value && (
                    <p className="text-sm text-green-700 font-medium mt-2">
                      ✔ You’re applying as a Custodian — welcome aboard!
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <p className="text-red-400">{errors.isCustodian?.message}</p>
        </div>

        <div className="mt-4 border-t" />

        <div className="flex flex-col md:flex-row gap-2 bg-muted rounded-lg p-6 border-gray-300">
          <div className="text-gray-700 w-full">
            <p>
              <strong>Registration Fee:</strong> GHC {registrationFee}
            </p>
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

        <div className="flex flex-row justify-center text-center mt-2 text-gray-500">
          <span> * </span>
          <p className="text-sm px-2">Terms & Conditions Apply</p>
          <span> * </span>
        </div>
      </form>

      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default RegistrationForm;
