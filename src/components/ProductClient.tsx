"use client";
import React, { useState } from "react";
import Image from "next/image";
import DimensionInput from "@/components/DimensionInput";
import ArrowHorizontalIcon from "@/components/Media/ArrowHorizontalIcon";
import ArrowVerticalIcon from "@/components/Media/ArrowVerticalIcon";
import Extra from "@/components/Extra";
import Material from "@/components/Material";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import {ExtraFeature, WallpaperProduct} from "@/interfaces/product";
import {mapProductToCartItem} from "@/utils/cartMapper";

interface ProductClientProps {
    product: WallpaperProduct;
    globalFeatures: ExtraFeature[];
    productType?: ProductType;
}

const ProductClient: React.FC<ProductClientProps> = ({ product, globalFeatures, productType }) => {
    const { addToCart } = useCart();
    // 1. Dimensions State
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(250);

    // 2. Material State - Initialize with the first available material ID from backend
    const [selectedMaterialId, setSelectedMaterialId] = useState<string>(
        product.materials && product.materials.length > 0
            ? Array.from(product.materials)[0].id
            : ""
    );

    // 3. Extra Features State - Uses a Record to track multiple selections by ID
    const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});

    const toggleFeature = (id: string) => {
        setSelectedFeatures((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const calculatePrice = () => {
        const area = (width * height) / 10000; // cm2 to m2
        const basePrice = product.salePrice || product.basePrice;
        let total = basePrice * area;

        // Calculate dynamic features from backend
        globalFeatures?.forEach((feature) => {
            if (selectedFeatures[feature.id]) {
                // Heuristic: If price is low (e.g. < 100), it's likely per m2 (like lamination)
                // If price is high, it's likely a flat fee (like glue)
                if (feature.price < 100) {
                    total += feature.price * area;
                } else {
                    total += feature.price;
                }
            }
        });

        return Math.round(total);
    };

    const handleAddToCart = () => {
        const cartItem = mapProductToCartItem({
            product,
            productType,
            selectedFeatures,
            extraFeatures: globalFeatures,
            specifications: {
                width: width.toString(),
                height: height.toString(),
                material_id: selectedMaterialId,
            },
            quantity: 1,
            totalPrice: calculatePrice(),
        });

        addToCart(cartItem);
        toast.success("Товар додано до кошика!");
    };

    // const handleAddToCart = () => {
    //     // Map selected features to the format expected by your OrderItemExtraFeature join entity
    //     const options = Array.from(globalFeatures || [])
    //         .filter((f) => selectedFeatures[f.id])
    //         .map((f) => ({
    //             id: f.id, // Database UUID
    //             label: f.name,
    //             price: f.price,
    //         }));
    //
    //     addToCart({
    //         productId: product.id,
    //         productType: productType,
    //         title: product.name,
    //         code: product.article,
    //         imageUrl: product.image?.startsWith("/")
    //             ? `http://localhost:8080${product.image}`
    //             : product.image,
    //         specifications: {
    //             width: width.toString(),
    //             height: height.toString(),
    //             material_id: selectedMaterialId,
    //         },
    //         options,
    //         quantity: 1,
    //         price: product.salePrice || product.basePrice,
    //         total: calculatePrice(),
    //     });
    //
    //     toast.success("Товар додано до кошика!");
    // };

    return (
        <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-12 bg-gray-50 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">

                {/* Left Column: Visuals & Tech Specs */}
                <div className="flex-1 flex flex-col">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                            <Image
                                src={
                                    product.image?.startsWith("/")
                                        ? `http://localhost:8080${product.image}`
                                        : product.image || ""
                                }
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl text-navy mb-4">Характеристики</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex justify-between border-b border-gray-100 pb-2">
                                <span>Щільність</span>
                                <span className="font-medium text-navy">{product.density} г/м²</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-100 pb-2">
                                <span>Вологостійкість</span>
                                <span className="font-medium text-navy">{product.waterproof ? "Так" : "Ні"}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-100 pb-2">
                                <span>Приміщення</span>
                                <span className="font-medium text-navy">{product.rooms?.join(", ")}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Configuration & Checkout logic */}
                <div className="lg:w-[500px] xl:w-[550px] flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h1 className="text-3xl font-bold text-navy mb-2">{product.name}</h1>
                            <div className="text-gray-400 text-sm font-medium mb-6">Артикул: {product.article}</div>

                            {/* 1. Wall Dimensions */}
                            <div className="mb-8">
                                <h3 className="font-bold text-lg text-navy mb-4">Розміри стіни</h3>
                                <div className="flex gap-4">
                                    <DimensionInput label="Ширина" value={width} onChange={setWidth} unit="см" icon={<ArrowHorizontalIcon />} />
                                    <DimensionInput label="Висота" value={height} onChange={setHeight} unit="см" icon={<ArrowVerticalIcon />} />
                                </div>
                            </div>

                            {/* 2. Dynamic Materials from Java WallpaperDetailedResponse */}
                            <div className="mb-8">
                                <h3 className="font-bold text-lg text-navy mb-4">Матеріал</h3>
                                <div className="space-y-3">
                                    {Array.from(product.materials || []).map((m) => (
                                        <Material
                                            key={m.id}
                                            label={m.name}
                                            desc={m.description}
                                            checked={selectedMaterialId === m.id}
                                            onChange={() => setSelectedMaterialId(m.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* 3. Dynamic Extra Features from Java BaseProductDetailedResponse */}
                            <div className="mb-8">
                                <h3 className="font-bold text-lg text-navy mb-4">Додаткові опції</h3>
                                <div className="space-y-3">
                                    {globalFeatures.map((feature) => (
                                        <Extra
                                            key={feature.id}
                                            checked={selectedFeatures[feature.id]}
                                            onChange={() => toggleFeature(feature.id)}
                                            heading={feature.name}
                                            price={`+${feature.price} грн`}
                                            desc={feature.description}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Price Calculation & Cart Action */}
                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-gray-500 font-medium">Загальна вартість:</span>
                                    <div className="text-3xl font-extrabold text-navy">{calculatePrice()} грн</div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20"
                                >
                                    ДОДАТИ В КОШИК
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductClient;