import LightningBackground from "@/components/WaveBackground";
import { Outlet } from "react-router-dom";
import { Fragment, useState } from "react";
import ScanMeModal from "@/components/ScanMe";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FloatButton from "@/components/FloatingButton";
import FeedbackForm from "@/components/FeedbackForm";

const Root = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    qrScan: false,
    feedback: false,
  });

  return (
    <Fragment>
      <LightningBackground />
      <Header
        modalState={{
          setQrScan: null,
          setFeedback: (open: boolean) =>
            setIsModalOpen((prev) => ({ ...prev, feedback: open })),
        }}
      />
      <Outlet />
      <Footer />
      <FeedbackForm
        modalState={isModalOpen}
        feedback={(open: boolean) =>
          setIsModalOpen((prev) => ({ ...prev, feedback: open }))
        }
      />
      <ScanMeModal
        modalState={isModalOpen}
        setQrScan={(open: boolean) =>
          setIsModalOpen((prev) => ({ ...prev, qrScan: open }))
        }
      />
      <FloatButton
        modalState={{
          setQrScan: (open: boolean) =>
            setIsModalOpen((prev) => ({ ...prev, qrScan: open })),
          setFeedback: (open: boolean) =>
            setIsModalOpen((prev) => ({ ...prev, feedback: open })),
        }}
      />
    </Fragment>
  );
};

export default Root;
