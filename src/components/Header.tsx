import {
  Sheet,
  SheetHeader,
  SheetFooter,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { topup, home, register } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

const classNames = (...classes: (string | null | undefined | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const BASE_BUTTON_CLASSES =
  "py-3 px-4 text-lg transition-all duration-300 hover:shadow-lg rounded-full";

const DESKTOP_INACTIVE_CLASSES = "bg-gray-500 hover:bg-gray-500/90";

const MOBILE_ACTIVE_CLASSES = "bg-yellow-600";
const MOBILE_INACTIVE_CLASSES = "";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const mainNavigate = (route: string) => {
    navigate(`/${route}`);
  };

  const mobileNavigate = (route: string) => {
    setOpen(false);
    navigate(`/${route}`);
  };

  const homePath = "/";
  const currentPath = location.pathname;

  return (
    <header className="sticky py-5 mx-auto max-w-screen-lg bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl rounded-full shadow-sm px-4 md:px-8 top-5 z-50 w-full">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden lg:block">
          <div className="space-x-3">
            <Button
              type="button"
              className={classNames(
                BASE_BUTTON_CLASSES,
                "hover:bg-gray-500/90",
                currentPath === homePath
                  ? MOBILE_ACTIVE_CLASSES
                  : MOBILE_INACTIVE_CLASSES,
              )}
              onClick={() => mainNavigate("")}
            >
              {home}
            </Button>

            <Button
              type="button"
              className={classNames(
                BASE_BUTTON_CLASSES,
                "hover:bg-gray-500/90",
                currentPath === "/topup"
                  ? MOBILE_ACTIVE_CLASSES
                  : MOBILE_INACTIVE_CLASSES,
              )}
              onClick={() => mainNavigate("topup")}
            >
              {topup}
            </Button>

            <Button
              type="button"
              className={classNames(
                BASE_BUTTON_CLASSES,
                "hover:bg-gray-500/90",
                currentPath === "/register"
                  ? MOBILE_ACTIVE_CLASSES
                  : MOBILE_INACTIVE_CLASSES,
              )}
              onClick={() => mainNavigate("register")}
            >
              {register}
            </Button>
          </div>
        </div>

        {/* --- Mobile Navigation (Sheet) --- */}
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
                      {/* FIX APPLIED: Safely construct class name using classNames helper */}
                      <Button
                        type="button"
                        className={classNames(
                          BASE_BUTTON_CLASSES,
                          "hover:bg-gray-500/90",
                          currentPath === homePath
                            ? MOBILE_ACTIVE_CLASSES
                            : MOBILE_INACTIVE_CLASSES,
                        )}
                        onClick={() => mobileNavigate("")}
                      >
                        {home}
                      </Button>

                      <Button
                        type="button"
                        className={classNames(
                          BASE_BUTTON_CLASSES,
                          "hover:bg-gray-500/90",
                          currentPath === "/topup"
                            ? MOBILE_ACTIVE_CLASSES
                            : MOBILE_INACTIVE_CLASSES,
                        )}
                        onClick={() => mobileNavigate("topup")}
                      >
                        {topup}
                      </Button>

                      <Button
                        type="button"
                        className={classNames(
                          BASE_BUTTON_CLASSES,
                          "hover:bg-gray-500/90",
                          currentPath === "/register"
                            ? MOBILE_ACTIVE_CLASSES
                            : MOBILE_INACTIVE_CLASSES,
                        )}
                        onClick={() => mobileNavigate("register")}
                      >
                        {register}
                      </Button>
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
