import LightningBackground from "@/components/WaveBackground";
import Logo from "@/components/Logo";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ScanMeModal from "@/components/ScanMe";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

const Root = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };
  const onOpen = () => {
    setIsModalOpen(true);
  };

  const onClick = () => {
    navigate("/topup");
  };

  return (
    <div>
      <LightningBackground />
      <header className="w-full mx-auto py-7 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <Button
          type="button"
          className="py-3 px-4 text-lg bg-gray-500 hover:bg-gray-500/90 transition-all duration-300 hover:shadow-lg"
          onClick={onClick}
        >
          Topup
        </Button>
      </header>

      <Outlet />

      <div className="fixed bottom-4 right-4 hidden md:block">
        <button
          type="button"
          className=" rounded-full shadow-lg"
          onClick={onOpen}
        >
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

export default Root;
