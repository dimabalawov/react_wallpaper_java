(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/CategorySidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const CategorySidebar = (param)=>{
    let { categories, onCategoryClick, activeCategory } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "h-100vh border-r border-gray-200 bg-white w-full max-w-xs flex flex-col max-lg:hidden",
        children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "text-left px-5 py-4 w-full text-black border-b border-gray-200 transition hover:bg-gray-50 focus:bg-gray-100 ".concat(activeCategory === cat ? "bg-gray-100" : ""),
                onClick: ()=>onCategoryClick === null || onCategoryClick === void 0 ? void 0 : onCategoryClick(cat),
                children: cat
            }, cat, false, {
                fileName: "[project]/src/components/CategorySidebar.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/CategorySidebar.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CategorySidebar;
const __TURBOPACK__default__export__ = CategorySidebar;
var _c;
__turbopack_context__.k.register(_c, "CategorySidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Media/AddToCartIcon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const AddToCartIcon = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "32",
        height: "32",
        viewBox: "0 0 25 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                id: "mask0_303_389",
                style: {
                    maskType: "alpha"
                },
                maskUnits: "userSpaceOnUse",
                x: "0",
                y: "0",
                width: "25",
                height: "24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "0.80127",
                    width: "24",
                    height: "24",
                    fill: "#D9D9D9"
                }, void 0, false, {
                    fileName: "[project]/src/components/Media/AddToCartIcon.tsx",
                    lineNumber: 21,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Media/AddToCartIcon.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                mask: "url(#mask0_303_389)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M11.8014 9V6H8.80139V4H11.8014V1H13.8014V4H16.8014V6H13.8014V9H11.8014ZM7.80139 22C7.25139 22 6.78056 21.8042 6.38889 21.4125C5.99722 21.0208 5.80139 20.55 5.80139 20C5.80139 19.45 5.99722 18.9792 6.38889 18.5875C6.78056 18.1958 7.25139 18 7.80139 18C8.35139 18 8.82222 18.1958 9.21389 18.5875C9.60556 18.9792 9.80139 19.45 9.80139 20C9.80139 20.55 9.60556 21.0208 9.21389 21.4125C8.82222 21.8042 8.35139 22 7.80139 22ZM17.8014 22C17.2514 22 16.7806 21.8042 16.3889 21.4125C15.9972 21.0208 15.8014 20.55 15.8014 20C15.8014 19.45 15.9972 18.9792 16.3889 18.5875C16.7806 18.1958 17.2514 18 17.8014 18C18.3514 18 18.8222 18.1958 19.2139 18.5875C19.6056 18.9792 19.8014 19.45 19.8014 20C19.8014 20.55 19.6056 21.0208 19.2139 21.4125C18.8222 21.8042 18.3514 22 17.8014 22ZM1.80139 4V2H5.07639L9.32639 11H16.3264L20.2264 4H22.5014L18.1014 11.95C17.9181 12.2833 17.6722 12.5417 17.3639 12.725C17.0556 12.9083 16.7181 13 16.3514 13H8.90139L7.80139 15H19.8014V17H7.80139C7.05139 17 6.48056 16.675 6.08889 16.025C5.69722 15.375 5.68472 14.7167 6.05139 14.05L7.40139 11.6L3.80139 4H1.80139Z",
                    fill: "#2F4157"
                }, void 0, false, {
                    fileName: "[project]/src/components/Media/AddToCartIcon.tsx",
                    lineNumber: 24,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Media/AddToCartIcon.tsx",
                lineNumber: 23,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Media/AddToCartIcon.tsx",
        lineNumber: 4,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = AddToCartIcon;
const __TURBOPACK__default__export__ = AddToCartIcon;
var _c;
__turbopack_context__.k.register(_c, "AddToCartIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ProductPreview.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Media$2f$AddToCartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Media/AddToCartIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const ProductPreview = (param)=>{
    let { imageUrl, title, price, oldPrice, code = "FOB-2045" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: "/wallpapers/product",
        className: "flex flex-col bg-white rounded-xl w-full lg:max-w-[370px] h-full relative group no-underline",
        children: [
            imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: imageUrl,
                alt: title,
                width: 500,
                height: 500,
                className: "w-full aspect-square object-cover rounded-2xl mb-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ProductPreview.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full aspect-square bg-mock rounded-2xl mb-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ProductPreview.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-bold text-lg text-black leading-tight mb-1 break-words",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ProductPreview.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm md:text-lg text-[#7A8B99] font-medium mb-2",
                children: code
            }, void 0, false, {
                fileName: "[project]/src/components/ProductPreview.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end justify-between mt-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            oldPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm sm:text-lg text-[#42576A] font-bold line-through mb-1",
                                children: oldPrice
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductPreview.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-medium sm:text-xl text-[#2F4157] font-extrabold",
                                children: price
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductPreview.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductPreview.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ml-2 p-2 rounded-lg hover:bg-gray-100 transition-colors",
                        "aria-label": "Додати в кошик",
                        onClick: (e)=>e.preventDefault(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Media$2f$AddToCartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/ProductPreview.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductPreview.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductPreview.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductPreview.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ProductPreview;
const __TURBOPACK__default__export__ = ProductPreview;
var _c;
__turbopack_context__.k.register(_c, "ProductPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/wallpapers/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>WallpapersPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Pagination/Pagination.js [app-client] (ecmascript) <export default as Pagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WallpapersPage() {
    _s();
    const categories = [
        "ФОТОШПАЛЕРИ В ДИТЯЧУ",
        "ФОТОШПАЛЕРИ ДО ВІТАЛЬНІ",
        "ФОТОШПАЛЕРИ НА КУХНЮ",
        "3Д ФОТОШПАЛЕРИ",
        "ПРИРОДА",
        "КВІТИ"
    ];
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WallpapersPage.useEffect": ()=>{
            fetch("http://localhost:8080/wallpapers").then({
                "WallpapersPage.useEffect": (res)=>res.json()
            }["WallpapersPage.useEffect"]).then({
                "WallpapersPage.useEffect": (data)=>setProducts(data)
            }["WallpapersPage.useEffect"]).catch({
                "WallpapersPage.useEffect": (err)=>console.error("Failed to fetch products:", err)
            }["WallpapersPage.useEffect"]);
        }
    }["WallpapersPage.useEffect"], []);
    console.log(products);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-row px-[clamp(1rem,6vw,7.5rem)] gap-y-20 xl:gap-y-30 py-4 lg:py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                categories: categories
            }, void 0, false, {
                fileName: "[project]/src/app/wallpapers/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col w-full lg:ml-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-black font-semibold text-2xl md:text-3xl mb-8 lg:mb-10",
                        children: "Фотошпалери"
                    }, void 0, false, {
                        fileName: "[project]/src/app/wallpapers/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__["Pagination"], {
                        count: 10,
                        shape: "rounded",
                        size: "large",
                        color: "standard",
                        siblingCount: 1,
                        boundaryCount: 0,
                        sx: {
                            "& .MuiPaginationItem-root": {
                                color: "#2F4157",
                                fontSize: "1rem",
                                "@media (max-width: 400px)": {
                                    fontSize: "0.85rem",
                                    minWidth: "1.7rem",
                                    height: "1.7rem"
                                }
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#F5F3F0",
                                color: "#2F4157"
                            },
                            "& .MuiPaginationItem-previousNext": {
                                backgroundColor: "#577C8E",
                                color: "#fff",
                                transition: "background 0.2s, color 0.2s, border 0.2s",
                                border: "2px solid transparent",
                                "@media (max-width: 640px)": {
                                    minWidth: "2.2rem",
                                    height: "2.2rem"
                                },
                                "@media (max-width: 400px)": {
                                    minWidth: "1.7rem",
                                    height: "1.7rem"
                                },
                                "&:hover": {
                                    backgroundColor: "#fff",
                                    color: "#577C8E",
                                    border: "2px solid #577C8E"
                                }
                            }
                        },
                        className: "mb-8 lg:mb-12"
                    }, void 0, false, {
                        fileName: "[project]/src/app/wallpapers/page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid w-full grid-cols-2 xl:grid-cols-3 gap-[clamp(1rem,2vw,2.5rem)]",
                        children: products.map((product, idx)=>{
                            var _product_image;
                            const imageUrl = ((_product_image = product.image) === null || _product_image === void 0 ? void 0 : _product_image.startsWith("/")) ? "http://localhost:8080".concat(product.image) : product.image;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                title: product.name,
                                imageUrl: imageUrl,
                                price: "".concat(product.basePrice, " грн/м²"),
                                oldPrice: product.oldPrice ? "".concat(product.oldPrice, " грн") : undefined
                            }, product.id || idx, false, {
                                fileName: "[project]/src/app/wallpapers/page.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/wallpapers/page.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/wallpapers/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/wallpapers/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(WallpapersPage, "f86L6rLANGURv6GE6gupp7+oOp4=");
_c = WallpapersPage;
var _c;
__turbopack_context__.k.register(_c, "WallpapersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_93429515._.js.map