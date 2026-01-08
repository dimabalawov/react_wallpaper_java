import SouvenirClient from "@/components/SouvenirClient";
import { ExtraFeature, SouvenirProduct } from "@/interfaces/wallpaper"; // Assuming SouvenirProduct is here
import { notFound } from "next/navigation";

// Define the ProductType interface if not already imported
interface ProductType {
    id: number;
    name: string;
}

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function SouvenirPage({ params }: ProductPageProps) {
    const { slug } = await params;

    // 1. Parallel fetch for product data and all product types
    const [productRes, typesRes] = await Promise.all([
        fetch(`http://localhost:8080/souvenirs/${slug}`, { next: { revalidate: 3600 } }),
        fetch(`http://localhost:8080/catalog/product-types`, { next: { revalidate: 86400 } })
    ]);

    if (!productRes.ok) return notFound();

    const product: SouvenirProduct = await productRes.json();
    const allProductTypes: ProductType[] = await typesRes.json();

    const souvenirType = allProductTypes.find(
        (t) => t.name.toUpperCase() === "SOUVENIR"
    );

    let features: ExtraFeature[] = [];
    if (souvenirType) {
        const featuresRes = await fetch(
            `http://localhost:8080/catalog/features/${souvenirType.id}`,
            { next: { revalidate: 86400 } }
        );
        if (featuresRes.ok) {
            features = await featuresRes.json();
        }
    }

    return (
        <SouvenirClient
            product={product}
            extraFeatures={features}
            productType={souvenirType}
        />
    );
}

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
        } else if (Array.isArray(data)) {
            productList = data;
        }

        return productList.map((p) => ({
            slug: p.slug,
        }));
    } catch (error) {
        console.error("Error generating static params for souvenirs:", error);
        return [];
    }
}