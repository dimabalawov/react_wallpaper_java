import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryPreviewProps {
  title: string;
  imageUrl?: string;
  link?: string;
}

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
  title,
  imageUrl,
  link,
}) => {
  const content = (
    <div className="w-full aspect-[16/9] md:aspect-[4/3] bg-mock rounded-xl flex items-center justify-center text-xl lg:text-2xl font-semibold text-black relative overflow-hidden cursor-pointer">
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <Image
            src={imageUrl}
            alt={title}
            width={120}
            height={120}
            className="mb-4"
          />
        </>
      )}
      <span className="relative z-10 uppercase tracking-wide">{title}</span>
    </div>
  );

  return link ? (
    <Link href={link} className="block w-full h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

export default CategoryPreview;
