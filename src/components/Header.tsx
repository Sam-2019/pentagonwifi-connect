
import { useState } from "react";
import Logo from "@/components/Logo";
import { topup, home, register, classNames } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const BASE_BUTTON_CLASSES =
 "rounded-full  px-4 py-1.5 font-medium text-slate-500 focus-visible:outline-none transition w-34";
const ACTIVE_CLASSES = "bg-yellow-600 text-white border border-slate-200";
const INACTIVE_BUTTON_COLOR = " transparent hover:text-gray-500";

export default function Header() {
 const navigate = useNavigate();
 const location = useLocation();
 const [expanded, setExpanded] = useState(false);

 const toggleMenu = () => {
   setExpanded((prev) => !prev);
 };

 const mainNavigate = (route: string) => {
   setExpanded(false);
   navigate(`/${route}`);
 };

 const homePath = "/";
 const currentPath = location.pathname;

 const buttonsII = (
   <>

     {
       currentPath !== homePath ? <button
         type="button"
         className={classNames(
           BASE_BUTTON_CLASSES,
           "",
           currentPath === homePath ? ACTIVE_CLASSES : INACTIVE_BUTTON_COLOR, // Conditional Styling Fix
         )}
         onClick={() => mainNavigate("")}
       >
         {home}
       </button> : null
     }

     {
       currentPath !== "/topup" ?
         <button
           type="button"
           className={classNames(
             BASE_BUTTON_CLASSES,
             "",
             currentPath === "/topup" ? ACTIVE_CLASSES : INACTIVE_BUTTON_COLOR, // Conditional Styling Fix
           )}
           onClick={() => mainNavigate("topup")}
         >
           {topup}
         </button> : null
     }

     {
       currentPath !== "/register" ?
         <button
           type="button"
           className={classNames(
             BASE_BUTTON_CLASSES,
             "",
             currentPath === "/register" ? ACTIVE_CLASSES : INACTIVE_BUTTON_COLOR, // Conditional Styling Fix
           )}
           onClick={() => mainNavigate("register")}
         >
           {register}
         </button> : null
     }
   </>
 );

 const buttons = (
   <>

     <button
       type="button"
       className={classNames(
         BASE_BUTTON_CLASSES,
         "",
         currentPath === homePath ? ACTIVE_CLASSES : INACTIVE_BUTTON_COLOR, // Conditional Styling Fix
       )}
       onClick={() => mainNavigate("")}
     >
       {home}
     </button>

     <button
       type="button"
       className={classNames(
         BASE_BUTTON_CLASSES,
         "",
         currentPath === "/topup" ? ACTIVE_CLASSES : INACTIVE_BUTTON_COLOR, // Conditional Styling Fix
       )}
       onClick={() => mainNavigate("topup")}
     >
       {topup}
     </button>

     <button
       type="button"
       className={classNames(
         BASE_BUTTON_CLASSES,
         "",
         currentPath === "/register" ? ACTIVE_CLASSES : INACTIVE_BUTTON_COLOR, // Conditional Styling Fix
       )}
       onClick={() => mainNavigate("register")}
     >
       {register}
     </button>
   </>
 );

 return (
   <header
     className={`
   sticky rounded-xl
   mx-auto max-w-screen-lg bg-[hsla(0,0%,93%,0.72)]
    backdrop-blur-xl shadow-sm top-5 z-50 w-full
   ${expanded ? "before:-inset-0 rounded-b-none" : "before:inset-0"}
 `}
   >
     <div className="flex justify-between items-center p-2 md:p-4">
       <Link to="/" className="flex items-center">
         <Logo />
       </Link>

       <div className="hidden md:block">
         <div className="space-x-3">{buttons}</div>
       </div>

       <div className="md:hidden">
         <Button variant="secondary" size="icon" className="border-2 rounded-full" onClick={toggleMenu}>
           <MenuIcon />
         </Button>
       </div>
     </div>

     <nav
       id="menu"
       aria-labelledby="menubutton"
       className={`mx-auto max-w-screen w-full absolute bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl z-100 grid text-sm text-slate-600 overflow-hidden transition-all duration-500 ease-[cubic-bezier(.5,.85,.25,1.8)]
           ${expanded ? "grid-rows-[1fr] opacity-100 rounded-b-xl" : "grid-rows-[0fr] opacity-0 invisible"}
           `}
     >
       <div className="overflow-hidden before:block before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-slate-200 before:to-transparent">
         <div className="px-4 py-3">
           <div className="space-x-3">{buttons}</div>
         </div>
       </div>
     </nav>

   </header>
 );
}

