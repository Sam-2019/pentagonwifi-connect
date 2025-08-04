import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import pentwifiQR from "../assets/pentwifiQR.png";

interface ScanMeModalProps {
  modalState: {
    qrScan: boolean;
  };
}

const ScanMeModal: React.FC<
  ScanMeModalProps & { setQrScan: (open: boolean) => void }
> = ({ modalState, setQrScan }) => {
  return (
    <Dialog open={modalState.qrScan} onOpenChange={setQrScan}>
      <DialogContent className="bg-gradient-to-r from-primary/5 to-accent/10">
        <DialogTitle hidden />
        <DialogDescription hidden />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setQrScan(false)}
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
