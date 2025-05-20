"use client";

import Link from "next/link";
import { Rocket, BookHeadphones } from "lucide-react";
import React from "react";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 lg:py-32"
      style={{
        backgroundImage:
          "url('https://images.wallpaperscraft.ru/image/single/devushka_vzgliad_makiiazh_1341337_3840x2160.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-100 sm:text-5xl md:text-6xl">
          Погрузись в Мир <span className="text-purple-300">Манги</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-100 md:text-xl">
          Откройте для себя тысячи захватывающих историй. Читайте новинки, популярные тайтлы и классику жанра в одном месте.
        </p>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/manga/search"
            className="inline-flex items-center justify-center rounded-md bg-teal-600 opacity-80 px-8 py-3 text-base font-semibold text-white shadow-lg hover:opacity-95 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors duration-300 ease-in-out"
          >
            <Rocket size={20} className="mr-2" />
            Начать Читать
          </Link>

          <Link
            href="/manga"
            className="inline-flex items-center justify-center rounded-md bg-neutral-700/50 px-8 py-3 text-base font-medium text-neutral-100 shadow-sm hover:bg-neutral-600/70 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors duration-300 ease-in-out"
          >
            <BookHeadphones size={20} className="mr-2" />
            Новые Главы
          </Link>
        </div>
      </div>
    </section>
  );
}
