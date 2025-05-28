import RegistrationForm from "@/components/RegistrationForm";
import LightningBackground from "@/components/WaveBackground";
import Logo from "@/components/Logo";
import { QrCode } from "lucide-react";
import { useState } from "react";
import ScanMeModal from "@/components/ScanMe";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };
  const onOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <LightningBackground />
      <header className="w-full mx-auto py-7 bg-white shadow-sm">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Connect to Pentagon WiFi
          </h1>
          <p className="text-gray-600 mb-6">
            Fill out the form below to register for blazing-fast internet
            service.
          </p>
        </div>

        <div className="w-full rounded-lg md:p-0 p-4">
          <RegistrationForm />
        </div>
      </main>

      <div className="fixed bottom-4 right-4 hidden md:block">
        <button className=" rounded-full shadow-lg" onClick={onOpen}>
          <QrCode className="h-20 w-20 text-blue-900 mx-auto p-3" />
        </button>
      </div>

      <footer className="w-full py-6 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Pentagon WiFi - Powered by Kuanos Cloud.
          All rights reserved.
        </p>
      </footer>

      <ScanMeModal open={isModalOpen} onClose={onClose} />
    </div>
  );
};

export default Index;
