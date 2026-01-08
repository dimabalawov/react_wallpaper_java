import PrintingClient from "@/components/PrintingClient";
import { ExtraFeature, PrintingProduct } from "@/interfaces/product";
import { notFound } from "next/navigation";
import { ProductType } from "@/interfaces/productType";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PrintingPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // 1. Fetch data in parallel
  const [productRes, typesRes] = await Promise.all([
    fetch(`http://localhost:8080/printings/${slug}`, {
      next: { revalidate: 3600 },
    }),
    fetch(`http://localhost:8080/catalog/product-types`, {
      next: { revalidate: 86400 },
    }),
  ]);

  if (!productRes.ok) return notFound();

  const product: PrintingProduct = await productRes.json();
  const allProductTypes: ProductType[] = await typesRes.json();

  const printingType = allProductTypes.find(
    (t) => t.name.toUpperCase() === "PRINTING"
  );

  let features: ExtraFeature[] = [];
  if (printingType) {
    const featuresRes = await fetch(
      `http://localhost:8080/catalog/features/${printingType.id}`
    );
    if (featuresRes.ok) {
      features = await featuresRes.json();
    }
  }

  return (
    <PrintingClient
      product={product}
      extraFeatures={features}
      productType={printingType}
    />
  );
}

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8080/printings?size=1000");
    if (!res.ok) {
      console.error("Failed to fetch printings for static params");
      return [];
    }

    const data = await res.json();
    let productList: { slug: string }[] = [];

    // Safely extract the list depending on pagination or raw list
    if (data.products && Array.isArray(data.products.content)) {
      productList = data.products.content;
    } else if (Array.isArray(data.content)) {
      productList = data.content;
    } else if (Array.isArray(data)) {
      productList = data;
    }

    return productList.map((p) => ({
      slug: p.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for printings:", error);
    return [];
  }
}
