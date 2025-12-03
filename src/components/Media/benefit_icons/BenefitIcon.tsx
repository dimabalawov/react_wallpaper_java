import React from "react";

const BenefitIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#2F4157" />
    <path
      d="M7 12h10M12 7v10"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default BenefitIcon;
