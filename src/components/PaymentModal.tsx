import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CircleCheck, Share, XIcon } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose }) => {
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
    } else {
      setCheckmarkVisible(false);
      setMessageVisible(false);
      setActionsVisible(false);
    }
  }, [open]);

  function handleShareReferral(
    event: React.MouseEvent<HTMLButtonElement>
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
              <h2 className="text-2xl font-bold text-primary">Registration Complete!</h2>

              {/* <p className="text-base text-gray-600">
               Tap button below to proceed to make <br/>payment to activate your service.
              </p> */}

              <p className="text-base text-gray-600">
               Now proceed to make payment to enjoy <span className="text-lg text-primary font-semibold"> #InternetNeverSleeps.</span>
              </p>

              {/* <p className="text-base text-gray-600">
                Welcome to blazing-fast internet that
              </p> */}

              {/* <p className="text-base text-gray-600">
                Please make your payment by
                <br />
                dialing the short code below:
              </p>

              <p className="text-base text-gray-600">
                Dial:{" "}
                <span>
                  <a href="tel:*713*1939#">*713*1939#</a>
                </span>
              </p> */}

              {/* <p className="text-base text-primary font-semibold">
                #NeverSleeps.
              </p> */}

              {/* <p className="text-base text-gray-600">
                Expect smooth speeds and no drops — ever.
              </p> */}
            </div>
          )}
          {actionsVisible && (
            <div className="flex flex-col gap-2 mt-4">
              <Button
                role="link"
                onClick={payNow}
                className="bg-primary hover:bg-primary/90 gap-2 w-full"
              >
                Tap To Pay
              </Button>
              <Button
                onClick={handleShareReferral}
                className="bg-transaperent hover:bg-primary/90 gap-2 w-full text-primary"
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

export default PaymentModal;
