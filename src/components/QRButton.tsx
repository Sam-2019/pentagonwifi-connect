import { QrCode } from "lucide-react";

export default function QRButton({ onOpen }) {
  return (
    <div className="fixed bottom-4 right-4 hidden md:block">
      <button type="button" className="rounded-full shadow-lg" onClick={onOpen}>
        <QrCode className="h-20 w-20 text-blue-900 mx-auto p-3" />
      </button>
    </div>
  );
}
