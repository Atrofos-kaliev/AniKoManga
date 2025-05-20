"use client";

import { useEffect, useState } from "react";
import MangaCard, { MangaCardSkeleton } from "./MangaCard";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { getMangaSearch } from "@/services/api";
import { JikanMangaData } from "@/@types/types";

export default function TrendingManga() {
  const [mangaList, setMangaList] = useState<JikanMangaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingManga = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getMangaSearch({
          order_by: "popularity",
          sort: "desc",
          limit: 6,
          sfw: true,
        });
        setMangaList(response.data);
      } catch (err) {
        console.error("Failed to fetch trending manga:", err);
        setError("Не удалось загрузить популярную мангу. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingManga();
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex items-center text-2xl font-bold text-neutral-100 sm:text-3xl">
            <TrendingUp size={28} className="mr-3 text-sky-400" />
            В Тренде
          </h2>
          <Link
            href="/manga?order_by=popularity&sort=desc"
            className="text-sm font-medium text-sky-400 hover:text-sky-300 hover:underline"
          >
            Смотреть все
          </Link>
        </div>
        {isLoading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <MangaCardSkeleton key={index} />
            ))}
          </div>
        )}
        {!isLoading && error && (
          <div className="rounded-md border border-red-700 bg-red-900/30 p-4 text-center text-red-300">
            {error}
          </div>
        )}
        {!isLoading && !error && mangaList.length === 0 && (
           <div className="text-center text-neutral-400">Популярная манга не найдена.</div>
        )}
        {!isLoading && !error && mangaList.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {mangaList.map((manga) => (
              <MangaCard key={manga.mal_id} manga={manga} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}