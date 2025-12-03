import React, { ReactElement, SVGProps } from "react";

interface BenefitProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Benefit: React.FC<BenefitProps> = ({ title, description, icon }) => (
  <div className="flex max-xl:flex-row flex-col w-full gap-4">
    <div className="flex items-center justify-center w-20 h-20">
      {React.isValidElement(icon)
        ? React.cloneElement(icon as ReactElement<SVGProps<SVGSVGElement>>, {
            width: 64,
            height: 64,
          })
        : icon}
    </div>
    <div className="flex-1">
      <h3 className="text-xl sm:text-2xl font-semibold text-black">{title}</h3>
      <p className="text-lg text-black leading-snug">{description}</p>
    </div>
  </div>
);

export default Benefit;
