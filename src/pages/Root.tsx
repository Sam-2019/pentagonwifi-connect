import LightningBackground from "@/components/WaveBackground";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ScanMeModal from "@/components/ScanMe";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QRButton from "@/components/QRButton";

const Root = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };
  const onOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <LightningBackground />
      <Header />
      <Outlet />
      <QRButton onOpen={onOpen} />
      <Footer />
      <ScanMeModal open={isModalOpen} onClose={onClose} />
    </>
  );
};

export default Root;
