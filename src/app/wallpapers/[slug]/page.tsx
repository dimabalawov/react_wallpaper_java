import ProductClient from "@/components/ProductClient";
import { WallpaperProduct } from "@/interfaces/wallpaper";
import { notFound } from "next/navigation";

// Server Component: fetch product data and render client component
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const res = await fetch(`http://localhost:8080/wallpapers/${slug}`);
  if (!res.ok) return notFound();
  const product: WallpaperProduct = await res.json();
  if (!product) return notFound();
  return <ProductClient product={product} />;
}

// Required for static export: generate all possible slugs for pre-rendering
export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8080/wallpapers?size=1000");
    if (!res.ok) {
      console.error("Failed to fetch wallpapers for static params");
      return [];
    }
    const wallpapers = await res.json();
    let wallpaperList: { slug: string }[] = [];

    if (wallpapers.products && Array.isArray(wallpapers.products.content)) {
      wallpaperList = wallpapers.products.content;
    } else if (Array.isArray(wallpapers.content)) {
      wallpaperList = wallpapers.content;
    }

    return wallpaperList.map((wp: { slug: string }) => ({ slug: wp.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
