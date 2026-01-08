"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import CategoryPreview from "@/components/CategoryPreview";
import Benefit from "@/components/Benefit";
import FileIcon from "@/components/Media/benefit_icons/FileIcon";
import DeliveryIcon from "@/components/Media/benefit_icons/DeliveryIcon";
import HandsIcon from "@/components/Media/benefit_icons/HandsIcon";
import PaymentIcon from "@/components/Media/benefit_icons/PaymentIcon";
import ProductPreview from "@/components/ProductPreview";
import { WallpaperProduct } from "@/interfaces/product";

export default function Home() {
  const [popularProducts, setPopularProducts] = useState<WallpaperProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random products for the "Popular" section
    // We'll just fetch wallpapers for now as an example, or you could create a specific "featured" endpoint
    fetch("http://localhost:8080/wallpapers?size=4&sort=random")
      .then((res) => {
        if (!res.ok) {
          // Fallback if random sort isn't supported or fails, try standard
          return fetch("http://localhost:8080/wallpapers?size=4");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        // Handle varied API response structures
        let products = [];
        if (data.products && Array.isArray(data.products.content)) {
          products = data.products.content;
        } else if (data.content && Array.isArray(data.content)) {
          products = data.content;
        } else if (Array.isArray(data)) {
          products = data;
        }
        setPopularProducts(products);
      })
      .catch((err) => console.error("Failed to fetch popular products", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Banner />
      <div className="flex flex-col px-[clamp(1rem,6vw,7.5rem)] gap-y-20 xl:gap-y-30 py-14 lg:py-20">
        <div className="flex flex-col gap-y-8 gap-x-10 md:flex-row">
          <CategoryPreview
            title="Фотошпалери"
            link="/wallpapers"
            imageUrl="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop"
          />
          <CategoryPreview
            title="Сувеніри"
            link="/souvenirs"
            imageUrl="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop"
          />
          <CategoryPreview
            title="Поліграфія"
            link="/printings"
            imageUrl="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-navy font-semibold text-3xl md:text-4xl mb-13">
            Чому обирають нас
          </h2>
          <div className="gap-x-8 gap-y-12 grid grid-cols-1 md:grid-cols-2 max-xl:justify-between xl:flex xl:flex-row">
            <Benefit
              title="Власне виробництво"
              description="Виготовляємо продукцію самостійно, контролюючи якість на кожному етапі."
              icon={<FileIcon />}
            />
            <Benefit
              title="Швидка доставка"
              description="Оперативна та надійна доставка, щоб ви отримали замовлення вчасно."
              icon={<DeliveryIcon />}
            />
            <Benefit
              title="Індивідуальний підхід"
              description="Персональні рішення, що відповідають вашим потребам і побажанням."
              icon={<HandsIcon />}
            />
            <Benefit
              title="Онлайн оплата"
              description="Зручні та безпечні способи оплати безпосередньо на сайті."
              icon={<PaymentIcon />}
            />
          </div>
        </div>
        <div>
          <div className="text-center">
            <h2 className="text-navy font-semibold max-md:text-3xl text-4xl mb-5">
              Популярні товари
            </h2>
            <h3 className="text-black  max-md:hidden font-normal text-xl">
              Вибране для вас — бестселери, новинки та хіти продажів
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 my-12">
            {loading ? (
              // Skeleton / Loading state
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 h-[300px] rounded-xl w-full"
                />
              ))
            ) : popularProducts.length > 0 ? (
              popularProducts.map((p) => {
                const imageUrl = p.image?.startsWith("/")
                  ? `http://localhost:8080${p.image}`
                  : p.image;

                const finalPrice = p.salePrice || p.basePrice;

                return (
                  <ProductPreview
                    key={p.id}
                    title={p.name}
                    price={`${finalPrice} грн/м²`}
                    oldPrice={p.salePrice ? `${p.basePrice} грн/м²` : undefined}
                    imageUrl={imageUrl}
                    slug={p.slug}
                    basePath="/wallpapers" // Assuming we fetched wallpapers
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-400 py-10">
                Наразі популярних товарів немає
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
