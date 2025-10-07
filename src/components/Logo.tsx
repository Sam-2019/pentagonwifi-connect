import type React from "react";
import logo from "../assets/logo.png";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center focus:outline-none">
      <img
        src={logo}
        alt="Pentagon WiFi Logo"
        className="object-cover w-48 md:w-48 h-auto"
      />
    </div>
  );
};

export default Logo;
