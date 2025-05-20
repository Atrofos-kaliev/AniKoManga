"use client";

import BrowseByGenre from "@/components/home/BrowseByGenre";
import HeroSection from "@/components/home/HeroSection";
import RecentlyUpdated from "@/components/home/RecentlyUpdated";
import TrendingManga from "@/components/home/TrendingManga";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <TrendingManga />
      <RecentlyUpdated />
      <BrowseByGenre />
    </main>
  );
}