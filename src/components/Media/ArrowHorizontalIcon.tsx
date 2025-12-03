import React from "react";

export default function ArrowHorizontalIcon({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="12"
      viewBox="0 0 25 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M25 6L19 12L17.6 10.6L21.2 7H12V5H21.2L17.6 1.4L19 0L25 6Z"
        fill="#577C8E"
      />
      <path
        d="M13 7H3.8L7.4 10.6L6 12L0 6L6 0L7.4 1.4L3.8 5H13V7Z"
        fill="#577C8E"
      />
    </svg>
  );
}
