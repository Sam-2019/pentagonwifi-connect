import { PlusIcon, QrCode, MessageSquareMore } from "lucide-react";

import {
	FloatingButton,
	FloatingButtonItem,
} from "@/components/ui/floating-button";

interface FloatButtonProps {
	modalState: {
		setQrScan: (open: boolean) => void;
		setFeedback: (open: boolean) => void;
	};
}

export default function FloatButton({ modalState }: FloatButtonProps) {
	return (
		<div className="fixed bottom-4 right-4 hidden md:block">
			<FloatingButton
				triggerContent={
					<button type="button" className="rounded-full shadow-lg">
						<PlusIcon className="h-20 w-20 text-blue-900 mx-auto p-3" />
					</button>
				}
			>
				<FloatingButtonItem>
					<button
						type="button"
						className="rounded-full shadow-lg"
						onClick={() => modalState.setFeedback(true)}
					>
						<MessageSquareMore className="h-20 w-20 text-blue-900 mx-auto p-3" />
					</button>
				</FloatingButtonItem>
				<FloatingButtonItem>
					<button
						type="button"
						className="rounded-full shadow-lg"
						onClick={() => modalState.setQrScan(true)}
					>
						<QrCode className="h-20 w-20 text-blue-900 mx-auto p-3" />
					</button>
				</FloatingButtonItem>
			</FloatingButton>
		</div>
	);
}
