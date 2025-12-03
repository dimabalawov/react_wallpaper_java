"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "./Media/Search";
import CartIcon from "./Media/Cart";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const iconProps = { width: 24, height: 24, fill: "#2F4156" };

const navLinks = [
  {
    label: "ФОТОШПАЛЕРИ",
    href: "/wallpapers",
    subcategories: [
      "Фотошпалери в дитячу",
      "Фотошпалери до вітальні",
      "Фотошпалери на кухню",
      "3Д фотошпалери",
      "Природа",
      "Квіти",
    ],
  },
  { label: "Сувеніри", href: "/", subcategories: [] },
  { label: "Поліграфія", href: "/", subcategories: [] },
];

const Header: React.FC = () => {
  const [openCategory, setOpenCategory] = React.useState<string | null>(
    navLinks[0].label
  );
  return (
    <Disclosure as="nav" className="bg-white text-black w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-32">
        <div className="flex h-20 items-center justify-between relative">
          {/* Burger and Logo (Left) */}
          <div className="flex items-center gap-6">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 lg:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy">
              <span className="sr-only">Open main menu</span>
              {/* The open/close icon will be handled by DisclosurePanel below */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#2F4156"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </DisclosureButton>
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image src="/logo.png" alt="Logo" width={92} height={44} />
            </Link>
          </div>
          {/* Desktop Links (Center) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex gap-6 uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-navy transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Icons (Right) */}
          <div className="flex items-center gap-6">
            <SearchIcon {...iconProps} />
            <Link href="/cart" className="cursor-pointer">
              <CartIcon {...iconProps} />
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <DisclosurePanel className="lg:hidden fixed inset-0 z-50 flex">
        {/* Sidebar (left) */}
        <div className="relative w-4/5 max-w-xs bg-white h-full shadow-xl flex flex-col animate-slide-in-left">
          <DisclosureButton
            className="absolute top-6 left-6 text-black p-2"
            aria-label="Закрити меню"
            as="button"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#2F4156"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DisclosureButton>
          <div className="flex flex-col gap-0 pt-20">
            {navLinks.map((cat) => (
              <div key={cat.label}>
                <div className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 text-left text-lg font-semibold text-black uppercase focus:outline-none">
                  {cat.subcategories.length > 0 ? (
                    <>
                      <a
                        href={cat.href}
                        className="flex-1 text-left block hover:text-navy"
                        onClick={(e) => {
                          // If the user clicks the arrow, don't navigate
                          if (
                            e.target instanceof SVGElement ||
                            e.target instanceof HTMLButtonElement
                          ) {
                            e.preventDefault();
                            setOpenCategory(
                              openCategory === cat.label ? null : cat.label
                            );
                          }
                        }}
                      >
                        {cat.label}
                      </a>
                      <button
                        className="ml-2 p-2 -m-2 flex items-center justify-center"
                        style={{ minWidth: 40, minHeight: 40 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenCategory(
                            openCategory === cat.label ? null : cat.label
                          );
                        }}
                        tabIndex={0}
                        aria-label="Розгорнути підкатегорії"
                        type="button"
                      >
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openCategory === cat.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="#2F4156"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <a href={cat.href} className="flex-1 text-left block">
                      {cat.label}
                    </a>
                  )}
                </div>
                {cat.subcategories.length > 0 && openCategory === cat.label && (
                  <div className="pl-8 pb-2">
                    {cat.subcategories.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block py-2 text-black text-base border-b border-gray-200 last:border-b-0"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Overlay (right) */}
        <div className="flex-1 bg-black/30" />
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
