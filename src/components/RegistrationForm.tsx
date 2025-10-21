import {
  cn,
  cards,
  hubtel,
  server,
  planPrices,
  PasswordType,
  duplicateError,
  roomTypeOptions,
  registrationType,
  blockCourtOptions,
} from "@/lib/utils";
import React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import SuccessModal from "./SuccessModal";
import { hubtelPay } from "@/hooks/use-hubtel";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "./ui/form";
import { registrationSchema } from "@/lib/schema";
import { Check, Eye, EyeOff } from "lucide-react";
import { paystackPay } from "@/hooks/use-paystack";
import { yupResolver } from "@hookform/resolvers/yup";
import Datepicker from "react-tailwindcss-datepicker";
import { checkUserNameAvailability } from "@/lib/actions";
import type { CustomerPayload, FormData, RegistrationInfo } from "@/lib/types";

const RegistrationForm: React.FC = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState(PasswordType.PASSWORD);

  const showPassword = () => {
    setIsVisible(true);
    setType(PasswordType.TEXT);
  };

  const hidePassword = () => {
    setIsVisible(false);
    setType(PasswordType.PASSWORD);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: new Date(),
      phoneNumber: "",
      email: "",
      blockCourt: "",
      roomType: "",
      roomNumber: "",
      selectedCard: "",
      subscriptionPlan: "",
      isCustodian: false,
      userName: "",
      password: "",
      studentId: "",
      termsAccepted: null,
    },
  });

  const selectedBlockCourt = watch("blockCourt");
  const subscriptionPlan = watch("subscriptionPlan") as keyof typeof planPrices;
  const registration = registrationType.membership;

  const fee = registration.fee;

  const planFee = subscriptionPlan.includes("Daily")
    ? planPrices.daily
    : subscriptionPlan.includes("Weekly")
      ? planPrices.weekly
      : subscriptionPlan.includes("Monthly")
        ? planPrices.monthly
        : 0;

  const totalCost = fee + planFee;

  const onSubmit = async (data: FormData) => {
    if (data.termsAccepted === false) {
      return setError("termsAccepted", {
        type: server,
        message: "Required",
      });
    }

    setLoading(true);
    const paymentProvider = import.meta.env.VITE_PAYMENT_PROVIDER;
    const capitalizePaymentProvider = String(paymentProvider).toUpperCase();
    const capitalizeSubscriptionPlan = data.subscriptionPlan.toUpperCase();

    const credentials = {
      // userName: data.userName,
      userName: String(uuidv4().slice(0, 5)),
      password: data.password,
    };

    console.log(credentials.userName);
    console.log(data.termsAccepted);

    const selectedCard = cards.filter(
      (card) => card.name === data.selectedCard,
    );

    const cardSelectedInfo = {
      name: selectedCard[0].name,
      url: selectedCard[0].websrc,
    };

    const userInfo: CustomerPayload = {
      regID: uuidv4(),
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dateOfBirth: new Date(data.dateOfBirth),
      blockCourt: data.blockCourt,
      roomType: data.roomType,
      roomNumber: data.roomNumber,
      selectedCard: cardSelectedInfo,
      isCustodian: selectedBlockCourt.includes("Block")
        ? data.isCustodian
        : false,
      dateTime: new Date(),
      credentials: credentials,
      studentId: data.studentId,
    };

    const results = await checkUserNameAvailability(credentials);
    if (results.message === duplicateError) {
      setError("userName", {
        type: server,
        message: results.data,
      });
      return;
    }

    const registrationInfo: RegistrationInfo = {
      ...userInfo,
      subscriptionPlan: capitalizeSubscriptionPlan,
      planFee: planFee,
      registrationFee: fee,
      totalCost: totalCost,
      provider: capitalizePaymentProvider,
      registrationType: registration.name,
      termsAccepted: data.termsAccepted,
    };

    if (paymentProvider === hubtel) {
      const payment = hubtelPay(registrationInfo);
      payment.initialize(
        toast,
        setIsSuccessModalOpen,
        reset,
        () => setLoading(false),
        setDatePickerValue,
      );
      return;
    }

    const payment = paystackPay(registrationInfo);
    payment.initialize(toast, setIsSuccessModalOpen, reset, setDatePickerValue);
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
            className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
          />
          <p className="text-red-400">{errors.fullName?.message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="studentId">Student ID</label>
            <input
              id="studentId"
              type="text"
              {...register("studentId")}
              className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            />
            <p className="text-red-400">{errors.studentId?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
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
                  inputClassName="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
                />
              )}
            />
            <p className="text-red-400">{errors.dateOfBirth?.message}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="phoneNumber">Mobile</label>
            <input
              id="phoneNumber"
              type="text"
              {...register("phoneNumber")}
              className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            />
            <p className="text-red-400">{errors.phoneNumber?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              {...register("email")}
              className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            />
            <p className="text-red-400">{errors.email?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="blockCourt">Block / Court</label>
          <select
            {...register("blockCourt")}
            id="blockCourt"
            className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
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
              className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
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
              className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
            />

            {errors.roomNumber && (
              <p className="text-red-400">{errors.roomNumber?.message}</p>
            )}
          </div>
        </div>

        <div className="mt-2 mb-2 border-t" />

        <div className="bg-gradient-to-b from-gray-100 to-cyan-200 backdrop-blur-sm shadow-sm rounded-lg p-5 space-y-4">
          <h3 className="text-xl font-bold text-primary">Membership</h3>
          <div>
            <p className="text-sm text-gray-600 max-w-md">
              Pay a one-time registration fee of GHS 100 to unlock:
            </p>
            <ul className="list-disc pl-6 text-sm text-gray-600 mt-2">
              <li>2 weeks of Unlimited Data - FREE .</li>
              <li>After that, enjoy 24hr Unlimited Data for just GHS20.</li>
              <li>Access to special subscription plans and offers</li>
              <li>A Custom Access Card</li>
              <li>Exclusive branded souvenirs</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="text-l font-bold text-primary">Access Card</h3>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Select your preferred design
              </p>
              <div className="flex flex-col gap-2">
                <FormField
                  control={control}
                  name="selectedCard"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-x-3">
                      <div className="flex gap-3 flex-col sm:flex-row md:space-x-0 justify-center">
                        {cards.map((info) => (
                          <div key={info.id}>
                            {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                            <img
                              onClick={() => field.onChange(info.name)}
                              src={info.localsrc}
                              alt={info.name}
                              className={cn(
                                "focus:outline-none duration-300 object-cover w-50 md:w-50 h-auto shadow-lg rounded-xl border-transparent",
                                field.value === info.name
                                  ? "border-primary bg-white shadow border-2 p-1"
                                  : "border-gray-200 hover:border-primary/50",
                              )}
                            />
                          </div>
                        ))}
                      </div>

                      {errors.selectedCard && (
                        <p className="text-red-400">
                          {errors.selectedCard?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 mb-2 border-t" />

        <div className="bg-gradient-to-b from-cyan-200 to-gray-100  backdrop-blur-sm shadow-sm p-5 rounded-lg space-y-4">
          <h3 className="text-xl font-bold text-primary">Choose a Password</h3>
          <div>
            <p className="text-sm text-gray-600 max-w-md">Do’s:</p>
            <ul className="list-disc pl-6 text-sm text-gray-600 mt-2">
              <li>Create a strong password.</li>
              <li>Store your credentials safely.</li>
              <li>
                Keep your credentials confidential — never share them with
                others.
              </li>
            </ul>
            <br />
            <p className="text-sm text-gray-600 max-w-md">Don’ts:</p>
            <ul className="list-disc pl-6 text-sm text-gray-600 mt-2">
              <li>Don’t share your password with anyone.</li>
              <li>Don’t use simple or predictable patterns.</li>
              <li>Don’t reuse passwords you’ve used for other accounts.</li>
              <li>
                Don’t use obvious passwords (like "password123" or your
                name/birthday).
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <input
                  id="password"
                  type={type}
                  placeholder="Password"
                  {...register("password")}
                  className="py-2 md:py-3 px-2 md:px-3 w-full rounded-lg border-0 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
                />
                <div className="grid shrink-0 grid-cols-1 focus-within:relative mr-4">
                  {isVisible ? (
                    <EyeOff onClick={hidePassword} className="text-gray-600" />
                  ) : (
                    <Eye onClick={showPassword} className="text-gray-600" />
                  )}
                </div>
              </div>
              <p className="text-red-400">{errors.password?.message}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 mb-2 border-t" />

        <div className="bg-gradient-to-b from-accent/10 to-gray-100 backdrop-blur-sm shadow-sm p-5 rounded-lg space-y-5">
          {/* Headline and Perks */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-1">
              Host. Lead. Connect.
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
              Want more than just connection?
              <br /> Become a <strong>Custodian</strong> and host a router in
              your room to enjoy:
            </p>
            <ul className="list-disc pl-6 text-sm text-gray-600 mt-2">
              <li>Priority support</li>
              <li>
                Enjoy 60 mins of unlimited data every week—absolutely free!
              </li>
            </ul>
          </div>

          {selectedBlockCourt.includes("Block") || selectedBlockCourt === "" ? (
            <>
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
            </>
          ) : (
            <p className="text-sm text-gray-600">
              <strong>Custodianship</strong> reserved for Block occupants only.
            </p>
          )}

          <p className="text-red-400">{errors.isCustodian?.message}</p>
        </div>

        <div className="mt-2 mb-2 border-t" />

        <div className="bg-gray-100 backdrop-blur-sm shadow-sm flex flex-col md:flex-row gap-2 rounded-lg p-6 border-gray-300">
          <div className="text-gray-700 w-full">
            <p>
              <strong>Registration Fee:</strong> GHC {fee}
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
            disabled={loading}
            type="submit"
            className="w-full py-2 md:py-3 px-2 md:px-3 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                Connect Me <Check className="h-5 w-5 mr-2" />
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-col gap-2 text-center">
          <div className="pflex flex-col gap-2 w-full justify-center text-center">
            <input
              id="termsAccepted"
              type="checkbox"
              placeholder="Terms & Conditions"
              {...register("termsAccepted")}
              className="mx-3"
            />
            <label htmlFor="termsAccepted" className="text-base text-gray-500">
              Terms & Conditions Apply
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-400">{errors.termsAccepted?.message}</p>
          )}
        </div>

        {/* <TermCondition /> */}
      </form>

      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        registrationType={registration.name}
      />
    </div>
  );
};

export default RegistrationForm;
