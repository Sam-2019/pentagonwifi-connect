import { toast } from "sonner";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  postFeedback,
	registrationType,
	feedbackCategories,
} from "../lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { FeedbackFormData } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { feedbackSchema } from "@/lib/schema";

interface FeedbackFormProps {
	modalState: {
		feedback: boolean;
	};
}

const FeedbackForm: React.FC<
	FeedbackFormProps & { feedback: (open: boolean) => void }
> = ({ modalState, feedback }) => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		// setError,
		formState: { errors },
	} = useForm({
		criteriaMode: "all",
		resolver: yupResolver(feedbackSchema),
		defaultValues: {
			fullName: "",
			phoneNumber: "",
			category: "",
			comment: "",
		},
	});

	const onSubmit = async (data: FeedbackFormData) => {
		setLoading(true);

		const payload = {
			...data,
			registrationType: registrationType.feedback.name,
		};

		toast.promise(
			postFeedback(payload).then((res) => {
				reset();
				setLoading(false);
				feedback(false);
			}),
			{
				loading: "Connecting you to Pentagon WiFi...",
				success: "Feedback submitted..",
				error: "Feedback submission failed. Please try again..",
			},
		);
	};

	return (
		<Dialog open={modalState.feedback} onOpenChange={feedback}>
			<DialogContent className="bg-gradient-to-r from-primary/5 to-accent/10 ">
				<DialogTitle hidden />
				<DialogDescription hidden />
				<div className="overflow-y-auto h-[620px] md:h-auto">
					<div className="flex justify-end">
						<button
							type="button"
							onClick={() => {
								feedback(false);
								reset();
								setLoading(false);
							}}
							className="rounded-full focus:outline-none transition duration-200 ease-in-out active:outline-none"
						>
							<XIcon className="h-8 w-10 text-gray-400" />
						</button>
					</div>
					<p className="text-4xl font-bold text-blue-900 text-center">
						Feedback
					</p>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
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

						<div className="flex flex-col gap-2">
							<label htmlFor="category">Type</label>
							<select
								{...register("category")}
								id="category"
								className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
							>
								{feedbackCategories.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
							<p className="text-red-400">{errors.category?.message}</p>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="comment">Comment</label>
							<textarea
								id="comment"
								rows={6}
								placeholder="Share your feedback here..."
								{...register("comment")}
								className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
							/>
							<p className="text-red-400">{errors.comment?.message}</p>
						</div>

						<div>
							<Button
								disabled={loading}
								type="submit"
								className="w-full py-3 px-4 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
							>
								{loading ? "Loading..." : "Submit"}
							</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default FeedbackForm;
