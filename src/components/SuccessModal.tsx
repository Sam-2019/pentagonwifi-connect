import type React from "react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck, Share, XIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  registrationType: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  registrationType,
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md flex flex-col p-6 bg-gradient-to-b from-white to-blue-50 border-2 border-primary/20"
        // <-- This hides the top-right close button (if supported by your dialog lib)
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 focus:outline-none transition duration-200 ease-in-out active:outline-none"
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

              <p className="text-base text-gray-600">
                Welcome to blazing-fast internet that
              </p>

              <p className="text-base text-primary font-semibold">
                #NeverSleeps.
              </p>

              <p className="text-base text-gray-600">
                Expect smooth speeds and no drops — ever.
              </p>
            </div>
          )}

          {actionsVisible && (
            <div className="mt-6">
              <Button
                onClick={handleShareReferral}
                className="bg-primary hover:bg-primary/90 gap-2 w-full"
              >
                <Share size={18} />
                Share Referral
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
