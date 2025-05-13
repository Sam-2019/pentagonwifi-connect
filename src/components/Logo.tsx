import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="./public/logo.png" 
        alt="Pentagon WiFi Logo" 
        className="mt-10 transition-transform duration-300 hover:scale-105 object-cover w-48 md:w-48 h-auto"    
      />
    </div>
  );
};

export default Logo;
