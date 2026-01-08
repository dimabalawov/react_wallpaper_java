import {ExtraFeature, SouvenirProduct, WallpaperProduct} from "@/interfaces/wallpaper";

interface CartMapperParams {
    product: WallpaperProduct | SouvenirProduct;
    productType?: ProductType;
    selectedFeatures: Record<string, boolean>;
    extraFeatures: ExtraFeature[];
    specifications: Record<string, string>;
    quantity: number;
    totalPrice: number;
}

export const mapProductToCartItem = ({
                                         product,
                                         productType,
                                         selectedFeatures,
                                         extraFeatures,
                                         specifications,
                                         quantity,
                                         totalPrice,
                                     }: CartMapperParams) => {
    const options = (extraFeatures || [])
        .filter((f) => selectedFeatures[f.id])
        .map((f) => ({
            id: f.id,
            label: f.name ?? "",
            price: f.price,
        }));

    const baseUrl = "http://localhost:8080";
    const imageUrl = product.image?.startsWith("/")
        ? `${baseUrl}${product.image}`
        : product.image;

    return {
        productId: product.id,
        productType: productType,
        title: product.name,
        code: product.article,
        imageUrl: imageUrl,
        specifications: specifications,
        options: options,
        quantity: quantity,
        price: product.salePrice || product.basePrice,
        total: totalPrice,
    };
};