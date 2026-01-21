import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#002F6C" />
            <stop offset="50%" stopColor="#007ACC" />
            <stop offset="100%" stopColor="#00C9D1" />
          </linearGradient>
        </defs>
        {/* Polygonal C shape */}
        <path
          d="M75 25C65 15 50 10 35 15C20 20 10 35 10 50C10 65 20 80 35 85C50 90 65 85 75 75L65 65C60 70 50 75 40 70C30 65 25 55 25 50C25 45 30 35 40 30C50 25 60 30 65 35L75 25Z"
          fill="url(#logo-gradient)"
        />
        {/* Polygonal overlay lines */}
        <path d="M35 15L45 25L55 15M25 50L15 40M25 50L15 60M35 85L45 75L55 85M75 25L65 35M75 75L65 65" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-heading font-bold tracking-tight text-[#002F6C]">
            CogniAI
          </span>
          <span className="text-[10px] font-sans font-semibold text-[#007ACC] uppercase tracking-wider">
            by MedinovAI
          </span>
        </div>
      )}
    </div>
  );
}
