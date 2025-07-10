import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackCategories, feedbackSchema } from "../lib/utils";
import { useState } from "react";
import type { FeedbackFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";

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
		watch,
		reset,
		setError,
		control,
		formState: { errors },
	} = useForm({
		criteriaMode: "all",
		resolver: yupResolver(feedbackSchema),
		defaultValues: {
			userName: "",
			category: "",
			comment: "",
		},
	});

	const onSubmit = async (data: FeedbackFormData) => {
		setLoading(true);
	};

	return (
		<Dialog open={modalState.feedback} onOpenChange={feedback}>
			<DialogContent className="bg-gradient-to-r from-primary/5 to-accent/10 ">
				<div className="flex justify-end">
					<button
						type="button"
						onClick={() => feedback(false)}
						className="rounded-full focus:outline-none transition duration-200 ease-in-out active:outline-none"
					>
						<XIcon className="h-10 w-10 text-gray-400" />
					</button>
				</div>
				<p className="text-4xl font-bold text-blue-900 text-center">Feedback</p>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="userName">Username</label>
						<input
							id="userName"
							type="text"
							{...register("userName")}
							className="py-3 px-4 w-full rounded-lg border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none"
						/>
						<p className="text-red-400">{errors.userName?.message}</p>
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
			</DialogContent>
		</Dialog>
	);
};

export default FeedbackForm;
