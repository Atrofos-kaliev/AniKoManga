"use client";

import Link from "next/link";
import { Rocket, BookHeadphones } from "lucide-react";
import React from "react";

 const scrollToTrending = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const trendingSection = document.getElementById("trending-manga-section");
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          Dive into the World of <span className="text-purple-300">Manga</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-100 md:text-xl">
          Discover thousands of captivating stories. Read new releases, popular titles, and genre classics all in one place.
        </p>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            onClick={scrollToTrending}
            className="inline-flex items-center justify-center rounded-md bg-teal-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-black/50"
          >
            <Rocket size={20} className="mr-2" />
            Start Reading
          </button>

          <Link
            href="/search?order_by=start_date&sort=desc"
            className="inline-flex items-center justify-center rounded-md bg-neutral-700/50 px-8 py-3 text-base font-medium text-neutral-100 shadow-sm hover:bg-neutral-600/70 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors duration-300 ease-in-out"
          >
            <BookHeadphones size={20} className="mr-    2" />
            New Chapters
          </Link>
        </div>
      </div>
    </section>
  );
}
