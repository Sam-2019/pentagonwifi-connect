import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import ScanMeModal from "@/components/ScanMe";
import { Analytics } from "@vercel/analytics/react";
import FeedbackForm from "@/components/FeedbackForm";
import FloatButton from "@/components/FloatingButton";
import LightningBackground from "@/components/WaveBackground";
import Navbar from "@/components/Navbar";

const Root = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    qrScan: false,
    feedback: false,
  });

  return (
    <div className="relative min-h-screen w-full px-4">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 80%, #fff 40%, #6366f1 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
        }}
      />

      <div className="min-h-screen flex flex-col justify-between relative font-inter antialiased">
        {/* <div className="">
          <Navbar />
      </div> */}
        <Header
          modalState={{
            setQrScan: null,
            setFeedback: (open: boolean) =>
              setIsModalOpen((prev) => ({ ...prev, feedback: open })),
          }}
        />

        <section>
          <Outlet />
          
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Root;
