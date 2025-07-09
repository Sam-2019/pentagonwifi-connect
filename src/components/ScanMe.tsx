import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import pentwifiQR from "../assets/pentwifiQR.png";

interface ScanMeModalProps {
	open: boolean;
	onClose: () => void;
}

const ScanMeModal: React.FC<ScanMeModalProps> = ({ open, onClose }) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="bg-gradient-to-r from-primary/5 to-accent/10 ">
				<div className="flex justify-end">
					<button
						type="button"
						onClick={onClose}
						className="rounded-full focus:outline-none transition duration-200 ease-in-out active:outline-none"
					>
						<XIcon className="h-10 w-10 text-gray-400" />
					</button>
				</div>

				<img src={pentwifiQR} alt="website QR" className=" w-auto h-auto " />
				<p className="text-6xl font-bold text-blue-900 text-center">SCAN ME</p>
			</DialogContent>
		</Dialog>
	);
};

export default ScanMeModal;
