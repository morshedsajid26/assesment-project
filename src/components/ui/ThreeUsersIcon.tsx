import React from "react";

export interface ThreeUsersIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const ThreeUsersIcon: React.FC<ThreeUsersIconProps> = ({
  className = "w-4 h-4",
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Center user */}
      <circle cx="12" cy="7" r="3.25" />
      <path d="M6.5 20v-1.5a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4V20" />

      {/* Left user */}
      <circle cx="5" cy="9" r="2.25" />
      <path d="M2 19.5v-1a3 3 0 0 1 2.8-2.98" />

      {/* Right user */}
      <circle cx="19" cy="9" r="2.25" />
      <path d="M22 19.5v-1a3 3 0 0 0-2.8-2.98" />
    </svg>
  );
};
