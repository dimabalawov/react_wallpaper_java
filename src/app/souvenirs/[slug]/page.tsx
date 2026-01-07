import { SouvenirProduct } from "@/interfaces/wallpaper";
import SouvenirClient from "@/components/SouvenirClient";
import { notFound } from "next/navigation";

// Helper to fetch data on the server
async function getProduct(slug: string): Promise<SouvenirProduct | null> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused = slug;
  // In a real app, you would fetch by slug here.
  // ... existing fetch logic or returning null
  return null;
}

// Server Component: fetch product data and render client component
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SouvenirPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const res = await fetch(`http://localhost:8080/souvenirs/${slug}`);
  if (!res.ok) return notFound();

  // Explicitly type the result as SouvenirProduct from interface
  const product: SouvenirProduct = await res.json();
  if (!product) return notFound();

  // Use SouvenirClient instead of ProductClient
  return <SouvenirClient product={product} />;
}

// Required for static export: generate all possible slugs for pre-rendering
export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8080/souvenirs?size=1000");
    if (!res.ok) {
      console.error("Failed to fetch souvenirs for static params");
      return [];
    }
    const data = await res.json();
    let productList: { slug: string }[] = [];

    if (data.products && Array.isArray(data.products.content)) {
      productList = data.products.content;
    } else if (Array.isArray(data.content)) {
      productList = data.content;
    }

    return productList.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch (error) {
    console.error("Error generating static params for souvenirs:", error);
    return [];
  }
}
