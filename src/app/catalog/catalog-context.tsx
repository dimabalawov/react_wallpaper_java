"use client";
import React, {createContext, useContext} from "react";
import {ProductType} from "@/interfaces/catalog";

const CatalogContext = createContext<{ productTypes: ProductType[] }>({
    productTypes: [],
});

export const CatalogProvider = ({
                                    children,
                                    productTypes
                                }: {
    children: React.ReactNode;
    productTypes: ProductType[]
}) => {
    return (
        <CatalogContext.Provider value={{productTypes}}>
            {children}
        </CatalogContext.Provider>
    );
};

export const useCatalog = () => useContext(CatalogContext);