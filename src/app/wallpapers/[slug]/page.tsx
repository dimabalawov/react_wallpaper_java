import ProductClient from "@/components/ProductClient";
import {ExtraFeature, WallpaperProduct} from "@/interfaces/product";
import {notFound} from "next/navigation";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({params}: ProductPageProps) {
    const {slug} = await params;

    const [productRes, typesRes] = await Promise.all([
        fetch(`http://localhost:8080/wallpapers/${slug}`, {next: {revalidate: 3600}}),
        fetch(`http://localhost:8080/catalog/product-types`, {next: {revalidate: 86400}})
    ]);

    if (!productRes.ok) return notFound();

    const product: WallpaperProduct = await productRes.json();
    const allProductTypes: ProductType[] = await typesRes.json();

    const wallpaperType = allProductTypes.find(
        (t) => t.name.toUpperCase() === "WALLPAPER"
    );

    let features: ExtraFeature[] = [];
    if (wallpaperType) {
        const featuresRes = await fetch(
            `http://localhost:8080/catalog/features/${wallpaperType.id}`
        );
        if (featuresRes.ok) {
            features = await featuresRes.json();
        }
    }

    return (
        <ProductClient
            product={product}
            globalFeatures={features}
            productType={wallpaperType}
        />
    );
}

export async function generateStaticParams() {
    try {
        const res = await fetch("http://localhost:8080/wallpapers?size=1000");
        if (!res.ok) {
            console.error("Failed to fetch wallpapers for static params");
            return [];
        }

        const data = await res.json();
        let wallpaperList: { slug: string }[] = [];

        // Safely extract the list based on your API structure
        if (data.products && Array.isArray(data.products.content)) {
            wallpaperList = data.products.content;
        } else if (Array.isArray(data.content)) {
            wallpaperList = data.content;
        } else if (Array.isArray(data)) {
            wallpaperList = data;
        }

        return wallpaperList.map((wp) => ({
            slug: wp.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}