import PrintingClient from "@/components/PrintingClient";
import { ExtraFeature, PrintingProduct } from "@/interfaces/product";
import { notFound } from "next/navigation";
import { ProductType } from "@/interfaces/productType";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

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
  // When building for production (e.g. Vercel) without a running backend,
  // we cannot fetch the list of products.
  // We return an empty array to allow the build to succeed.
  // Note: This means individual product pages won't be statically generated
  // and will likely result in 404s on a static export unless handled otherwise.
  try {
    const res = await fetch("http://localhost:8080/printings?size=1000");
    if (!res.ok) return [];
    const data = await res.json();

    let productList: { slug: string }[] = [];
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
    // Backend likely not available during build
    return [];
  }
}
