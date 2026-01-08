export interface BaseProduct {
    id: string;
    name: string;
    article: string;
    basePrice: number;
    salePrice?: number;
    image: string;
    description: string;
    slug: string;
    categories: Category[];
}

export interface BaseProductAutocomplete {
    id: string;
    name: string;
    article: string;
    productType: ProductType;
}

export interface WallpaperProduct extends BaseProduct {
    density: number;
    waterproof: boolean;
    rooms: string[];
    materials: WallpaperMaterial[];
}

export interface SouvenirProduct extends BaseProduct {
    width?: number;
    length?: number;
    thickness?: number;
}

export interface Category {
    id: string;
    name: string;
}

export interface ExtraFeature {
    id: string;
    name: string | null;
    description: string;
    price: number;
    productType: ProductType
}

export interface WallpaperMaterial {
    id: string;
    name: string;
    description: string;
}


