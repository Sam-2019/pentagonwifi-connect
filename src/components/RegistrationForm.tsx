import { toast } from "sonner";
import { Check } from "lucide-react";
import type React from "react";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "./ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import Datepicker from "react-tailwindcss-datepicker";
import {
	blockCourtOptions,
	roomTypeOptions,
	planPrices,
	dataPlanOptions,
	registrationFee,
	schema,
	registration,
	googleScriptUrl,
	toastLoading,
	toastSuccess,
  	toastError,
} from "@/lib/utils";
import type { FormData, Payload } from "@/lib/utils";
import TermCondition from "./TermCondition";

const RegistrationForm: React.FC = () => {
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const [datePickerValue, setDatePickerValue] = useState({
		startDate: null,
		endDate: null,
	});
	const [totalPayable, setTotalPayable] = useState(0);
	const [loading, setLoading] = useState(false);

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
			userName: "",
			password: "",
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
		setLoading(true);
		setTotalPayable(totalCost);

		const credentials = {
			userName: data.userName,
			password: data.password,
		};
		const stringifyCredentials = JSON.stringify(credentials);

    const payload: Payload = {
      ...data,
      dateOfBirth: String(data.dateOfBirth.toISOString()),
      phoneNumber: String(data.phoneNumber),
      totalCost: String(totalCost),
      subscriptionPlan: data.subscriptionPlan.toUpperCase(),
      credentials: stringifyCredentials,
      registrationType: registration,
      provider: "N/A",
      clientReference: "N/A",
    };

		toast.promise(
			fetch(googleScriptUrl, {
				method: "POST",
				mode: "no-cors",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
				},
			}).then(() => {
				setTimeout(() => setIsPaymentModalOpen(true), 300);
				reset();
				setDatePickerValue({
					startDate: null,
					endDate: null,
				});
				setLoading(false);
			}),
			{
				loading: toastLoading,
				success: toastSuccess,
				error: toastError,
			},
		);
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

				<div className="mt-4 mb-2 border-t" />

				<div className=" border-gray-200">
					<div className="bg-gradient-to-r from-cyan-100 to-blue-200 p-5 rounded-lg space-y-5">
						<div>
							<h3 className="text-xl font-bold text-primary mb-1">
								Create Your Unique Login Credential
							</h3>
							<p className="text-sm text-gray-600 ">
								These credentials will be used to set up your personal profile
								and will allow you to log in to the portal for internet access.
							</p>
							<br />

							<p className="text-sm text-gray-600 max-w-md">Do’s:</p>
							<ul className="list-disc pl-6 text-sm text-gray-600 mt-2">
								<li>Create a strong password</li>
								<li>Choose a username that is easy for you to remember.</li>
								<li>
									Keep your credentials confidential—never share them with
									others.
								</li>
								<li>
									Your username must include the last 4 digits of your phone
									number.
								</li>
								<li>
									Store your credentials safely (use a password manager or write
									them in a secure place).
								</li>
							</ul>

							<br />

							<p className="text-sm text-gray-600 max-w-md">Don’ts:</p>
							<ul className="list-disc pl-6 text-sm text-gray-600 mt-2">
								<li>Don’t share your username or password with anyone.</li>
								<li>Don’t reuse passwords you’ve used for other accounts.</li>
								<li>
									Don’t use simple or predictable patterns (like “abcd1234” or
									“qwerty”).
								</li>
								<li>
									Don’t use obvious passwords (like "password123", "admin", or
									your name/birthday).
								</li>
							</ul>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							{/* username */}
							<div className="flex flex-col gap-2 w-full">
								{/* <label htmlFor="userName">Username</label> */}
								<input
									id="userName"
									type="text"
									placeholder="Username"
									{...register("userName")}
									className="py-3 px-4 w-full rounded-lg border-0 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
								/>
								<p className="text-red-400">{errors.userName?.message}</p>
							</div>

							{/* password */}
							<div className="flex flex-col gap-2 w-full">
								{/* <label htmlFor="password">Password</label> */}
								<input
									id="password"
									type="password"
									placeholder="Password"
									{...register("password")}
									className="py-3 px-4 w-full rounded-lg border-0 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
								/>
								<p className="text-red-400">{errors.password?.message}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-2 mb-4 border-t" />

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
								<li>Priority support</li>
								<li>
									Enjoy 60 mins of unlimited data every week—absolutely free!
								</li>
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
						disabled={loading}
						type="submit"
						className="w-full py-3 px-4 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
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

				<TermCondition />
			</form>

			<PaymentModal
				open={isPaymentModalOpen}
				onClose={() => setIsPaymentModalOpen(false)}
				registrationType={registration}
				amount={`GHC ${totalPayable}`}
			/>
		</div>
	);
};

export default RegistrationForm;
