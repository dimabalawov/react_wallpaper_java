import React from "react";

export default function ArrowVerticalIcon({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="25"
      viewBox="0 0 12 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6 25L0 19L1.4 17.6L5 21.2V12H7V21.2L10.6 17.6L12 19L6 25Z"
        fill="#577C8E"
      />
      <path
        d="M5 13V3.8L1.4 7.4L0 6L6 0L12 6L10.6 7.4L7 3.8V13H5Z"
        fill="#577C8E"
      />
    </svg>
  );
}
