import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useState } from "react";
import Logo from "@/components/Logo";
import { topup } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { FloatButtonProps } from "@/lib/types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { House, Menu as MenuIcon, Megaphone, RotateCcw } from "lucide-react";

export default function Header({ modalState }: FloatButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navigateTopup = () => {
    navigate("/topup");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const currentPath = location.pathname;
  const homePath = "/";

  return (
    <header className="sticky py-5 mx-auto max-w-screen-lg bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl rounded-full shadow-sm px-4 md:px-8 top-5 z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="hidden lg:block">
          {currentPath === homePath ? (
            <Button
              type="button"
              className="py-3 px-4 text-lg bg-gray-500 hover:bg-gray-500/90 transition-all duration-300 hover:shadow-lg rounded-full"
              onClick={navigateTopup}
            >
              {topup}
            </Button>
          ) : (
            <button
              type="button"
              className="rounded-full shadow-l bg-none"
              onClick={navigateHome}
            >
              <House className="h-8 w-8 text-blue-900 " />
            </button>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="border-2">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-white rounded-r-lg flex flex-col"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <SheetHeader className="flex items-center">
                    <Logo />
                  </SheetHeader>
                  <SheetDescription>
                    <div className="flex flex-col items-start space-y-5 mt-10">
                      {currentPath === homePath ? (
                        <button
                          type="button"
                          className="py-2 px-4 text-lg bg-white hover:bg-gray-100/90 transition-all duration-300 hover:shadow-lg flex flex-row items-center gap-3 border-2 border-gray-200 rounded-lg"
                          onClick={() => {
                            setOpen(false);
                            navigateTopup();
                          }}
                        >
                          <RotateCcw className="h-8 w-6 text-blue-900" />
                          {topup}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="py-2 px-4 text-lg bg-white hover:bg-gray-100/90 transition-all duration-300 hover:shadow-lg flex flex-row items-center gap-3 border-2 border-gray-200 rounded-lg"
                          onClick={() => {
                            setOpen(false);
                            navigateHome();
                          }}
                        >
                          <House className="h-8 w-6 text-blue-900" />
                          Home
                        </button>
                      )}

                      <button
                        type="button"
                        className="py-2 px-4 text-lg bg-white hover:bg-gray-100/90 transition-all duration-300 hover:shadow-lg flex flex-row items-center gap-3 border-2 border-gray-200 rounded-lg"
                        onClick={() => {
                          setOpen(false);
                          modalState.setFeedback(true);
                        }}
                      >
                        <Megaphone className="h-8 w-6 text-blue-900" />
                        Feedback
                      </button>
                    </div>
                  </SheetDescription>
                </div>

                <SheetFooter className="flex items-center"></SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
