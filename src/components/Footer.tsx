import React from "react";
import Image from "next/image";

const Footer: React.FC = () => (
  <footer className="bg-teal mt-14 py-14 px-[clamp(1rem,6vw,7.5rem)] text-white">
    <div
      className="max-w-screen justify-center items-start md:items-center flex max-md:flex-col flex-row gap-y-12"
      style={{ gap: "clamp(2rem, 20vw, 18rem)" }}
    >
      {/* Left: Logo and About */}
      <div className="flex flex-col items-start">
        {/* Replace <img> with Next.js <Image> for logo */}
        <Image
          src="/logo_footer.png"
          alt="Логотип"
          width={120}
          height={40}
          className="mb-4"
        />
        <div className="text-lg leading-relaxed max-w-xs">
          Ми створюємо унікальні фотошпалери, стильні сувеніри та поліграфію на
          замовлення. Якість, швидкість і турбота — наші головні принципи.
        </div>
      </div>
      {/* Center: Categories */}
      <div className="flex flex-col items-start">
        <h3 className="text-2xl font-normal mb-6">Категорії</h3>
        <ul className="space-y-2 text-lg">
          <li>Фотообої</li>
          <li>Сувеніри</li>
          <li>Поліграфія</li>
        </ul>
      </div>
      {/* Right: Contacts */}
      <div className="flex flex-col items-start">
        <h3 className="text-2xl font-normal mb-6">Контакти</h3>
        <ul className="space-y-2 text-lg mb-6">
          <li>+38 (098) 123-45-67</li>
          <li>info@site.com</li>
          <li>м. Київ, вул. Прикладна, 12</li>
        </ul>
        <div className="flex space-x-4">
          <a
            href="#"
            aria-label="Instagram"
            className="text-white hover:text-white/80 text-2xl"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="8" fill="none" />
              <rect
                x="7"
                y="7"
                width="18"
                height="18"
                rx="5"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="2" />
              <circle cx="22" cy="10" r="1" fill="white" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-white hover:text-white/80 text-2xl"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="8" fill="none" />
              <path
                d="M20.5 10.5h-2a2 2 0 0 0-2 2v2h-2v3h2v6h3v-6h2.1l.4-3H19.5v-1a.5.5 0 0 1 .5-.5h1V10.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
