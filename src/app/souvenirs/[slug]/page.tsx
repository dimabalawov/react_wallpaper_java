import SouvenirClient from "@/components/SouvenirClient";
import { ExtraFeature, SouvenirProduct } from "@/interfaces/product";
import { notFound } from "next/navigation";
import { ProductType } from "@/interfaces/productType";

// Server Component: fetch product data and render client component
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SouvenirPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const [productRes, typesRes] = await Promise.all([
    fetch(`http://localhost:8080/souvenirs/${slug}`),
    fetch(`http://localhost:8080/catalog/product-types`),
  ]);

  if (!productRes.ok) return notFound();

  // Explicitly type the result as SouvenirProduct from interface
  const product: SouvenirProduct = await productRes.json();
  if (!product) return notFound();

  let features: ExtraFeature[] = [];
  let souvenirType: ProductType | undefined;

  if (typesRes.ok) {
    const allProductTypes: ProductType[] = await typesRes.json();
    souvenirType = allProductTypes.find(
      (t) => t.name.toUpperCase() === "SOUVENIR"
    );

    if (souvenirType) {
      const featuresRes = await fetch(
        `http://localhost:8080/catalog/features/${souvenirType.id}`
      );
      if (featuresRes.ok) {
        features = await featuresRes.json();
      }
    }
  }

  // Use SouvenirClient instead of ProductClient
  return (
    <SouvenirClient
      product={product}
      extraFeatures={features}
      productType={souvenirType}
    />
  );
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

    return productList.map((p) => ({
      slug: p.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for souvenirs:", error);
    return [];
  }
}
