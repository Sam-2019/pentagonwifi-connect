import Logo from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { topup } from "@/lib/utils";

export default function Header() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/topup");
  };

  return (
    <header className="w-full mx-auto py-7 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <Logo />
      </Link>

      <Button
        type="button"
        className="py-3 px-4 text-lg bg-gray-500 hover:bg-gray-500/90 transition-all duration-300 hover:shadow-lg"
        onClick={onClick}
      >
        {topup}
      </Button>
    </header>
  );
}
