import React from "react";

interface CategorySidebarProps {
  categories: string[];
  onCategoryClick?: (category: string) => void;
  activeCategory?: string;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  onCategoryClick,
  activeCategory,
}) => (
  <aside className="h-100vh border-r border-gray-200 bg-white w-full max-w-xs flex flex-col max-lg:hidden">
    {categories.map((cat) => (
      <button
        key={cat}
        className={`text-left px-5 py-4 w-full text-black border-b border-gray-200 transition hover:bg-gray-50 focus:bg-gray-100 ${
          activeCategory === cat ? "bg-gray-100" : ""
        }`}
        onClick={() => onCategoryClick?.(cat)}
      >
        {cat}
      </button>
    ))}
  </aside>
);

export default CategorySidebar;
