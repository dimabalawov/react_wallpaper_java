import React from "react";

const PaymentIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    width={"33"}
    height={"73"}
    viewBox="0 0 76 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      x="2"
      y="2.5"
      width="67"
      height="46"
      rx="8"
      stroke="#2F4157"
      strokeWidth="4"
    />
    <path
      d="M0 14.5H71V39.5C71 45.5751 66.0751 50.5 60 50.5H11C4.92487 50.5 0 45.5751 0 39.5V14.5Z"
      fill="#2F4157"
    />
    <circle
      cx="60.209"
      cy="41.4088"
      r="13.5"
      fill="white"
      stroke="#2F4157"
      strokeWidth="3"
    />
    <mask
      id="mask0_121_112"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="48"
      y="29"
      width="24"
      height="25"
    >
      <rect x="48" y="29.5" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_121_112)">
      <path
        d="M57.5501 47.5L51.8501 41.8L53.2751 40.375L57.5501 44.65L66.7251 35.475L68.1501 36.9L57.5501 47.5Z"
        fill="#2F4157"
      />
    </g>
  </svg>
);

export default PaymentIcon;
