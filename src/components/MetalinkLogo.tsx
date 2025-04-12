
import React from 'react';

interface MetalinkLogoProps {
  className?: string;
}

const MetalinkLogo: React.FC<MetalinkLogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#1A1F2C" />
      <circle cx="16" cy="16" r="8" fill="url(#gradient)" />
      <path
        d="M10 12L16 7L22 12M10 20L16 25L22 20"
        stroke="#F7931A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16H22"
        stroke="#F7931A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1="8"
          y1="8"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7931A" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MetalinkLogo;
