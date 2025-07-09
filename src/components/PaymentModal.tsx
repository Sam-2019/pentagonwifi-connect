import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CircleCheck, Share, XIcon } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
	open: boolean;
	onClose: () => void;
	registrationType: string;
	amount?: string; // Optional amount prop, if needed for future use
}

const PaymentModal: React.FC<PaymentModalProps> = ({
	open,
	onClose,
	registrationType,
	amount,
}) => {
	const [checkmarkVisible, setCheckmarkVisible] = useState(false);
	const [messageVisible, setMessageVisible] = useState(false);
	const [actionsVisible, setActionsVisible] = useState(false);

	useEffect(() => {
		if (open) {
			const checkmarkTimer = setTimeout(() => setCheckmarkVisible(true), 300);
			const messageTimer = setTimeout(() => setMessageVisible(true), 800);
			const actionsTimer = setTimeout(() => setActionsVisible(true), 1300);

			return () => {
				clearTimeout(checkmarkTimer);
				clearTimeout(messageTimer);
				clearTimeout(actionsTimer);
			};
		}

		setCheckmarkVisible(false);
		setMessageVisible(false);
		setActionsVisible(false);
	}, [open]);

	function handleShareReferral(
		event: React.MouseEvent<HTMLButtonElement>,
	): void {
		event.preventDefault();
		if (navigator.share) {
			navigator
				.share({
					title: "Check out this amazing internet service!",
					text: "Join me in using this blazing-fast internet that #NeverSleeps. Click the link to learn more!",
					url: window.location.href,
				})
				.then(() => {
					toast.success("Referral shared successfully!");
				})
				.catch((error) => {
					console.error("Error sharing referral:", error);
					toast.error("Failed to share referral. Please try again.");
				});
		} else {
			toast.error("Sharing is not supported on this device.");
		}
	}

	function payNow() {
		window.location.href = "tel:*713*1939#";
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md flex flex-col bg-gradient-to-b from-white to-blue-50 border-2 border-primary/20">
				<div className="flex justify-end">
					<button
						type="button"
						onClick={onClose}
						className="rounded-full hover:bg-gray-100 focus:outline-none transition duration-200 ease-in-out active:outline-none"
					>
						<XIcon className="h-10 w-10 text-gray-400" />
					</button>
				</div>

				<div className="items-center text-center animate-fade-in">
					{checkmarkVisible && (
						<div className="flex justify-center py-4">
							<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-checkmark">
								<CircleCheck className="h-16 w-16 text-primary" />
							</div>
						</div>
					)}

					{messageVisible && (
						<div className="space-y-3">
							<h2 className="text-2xl font-bold text-primary">
								{registrationType} Complete!
							</h2>

							{/* <p className="text-base text-gray-600">
                Now proceed to make payment of{" "}
                <span className="text-xl font-semibold">{amount} </span>to
                activate the service.
              </p> */}
						</div>
					)}
					{actionsVisible && (
						<div className="flex flex-col gap-2 mt-4">
							<div>
								<div className="text-gray-600 text-base">
									Pay <span className="text-xl font-semibold">{amount}</span>{" "}
									via USSD code
								</div>

								<p className="text-gray-600 text-base">
									below to activate the service
								</p>

								<p className="text-gray-600 text-3xl font-semibold mt-5">
									*713*1939#
								</p>

								<div className="text-base text-gray-600 my-1">or</div>

								<a
									href="tel:*713*1939#"
									className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 gap-2 w-full mt-1 rounded-md px-4 py-2 text-white font-medium transition duration-200 ease-in-out"
									style={{ textDecoration: "none" }}
								>
									Tap To Pay
								</a>
							</div>

							<Button
								onClick={handleShareReferral}
								className="bg-transparent hover:bg-primary/10 gap-2 w-full text-primary"
							>
								<Share size={18} />
								Share Referral
							</Button>
						</div>
					)}

					{/* <span className="text-lg text-gray-600 font-semibold">
            #InternetNeverSleeps
          </span> */}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PaymentModal;
