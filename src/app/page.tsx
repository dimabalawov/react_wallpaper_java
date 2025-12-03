import Banner from "@/components/Banner";
import CategoryPreview from "@/components/CategoryPreview";
import Benefit from "@/components/Benefit";
import FileIcon from "@/components/Media/benefit_icons/FileIcon";
import DeliveryIcon from "@/components/Media/benefit_icons/DeliveryIcon";
import HandsIcon from "@/components/Media/benefit_icons/HandsIcon";
import PaymentIcon from "@/components/Media/benefit_icons/PaymentIcon";
import ProductPreview from "@/components/ProductPreview";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="flex flex-col px-[clamp(1rem,6vw,7.5rem)] gap-y-20 xl:gap-y-30 py-14 lg:py-20">
        <div className="flex flex-col gap-y-8 gap-x-10 md:flex-row">
          <CategoryPreview title="Фотошпалери" link="/wallpapers" />
          <CategoryPreview title="Сувеніри" />
          <CategoryPreview title="Поліграфія" />
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
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
            <ProductPreview
              title="Казковий ліс"
              price="450 грн/м²"
              oldPrice="450 грн/м²"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
