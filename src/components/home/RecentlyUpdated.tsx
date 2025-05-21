"use client";

import { useEffect, useState } from "react";
import MangaCard, { MangaCardSkeleton } from "../shared/MangaCard";
import { Zap } from "lucide-react";
import Link from "next/link";
import { JikanMangaData } from "@/@types/types";
import { getMangaSearch } from "@/services/api";


export default function RecentlyUpdated() {
  const [mangaList, setMangaList] = useState<JikanMangaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentlyUpdatedManga = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getMangaSearch({
          order_by: "start_date",
          sort: "desc",
          status: "publishing",
          limit: 12,
          sfw: true,
        });
        setMangaList(response.data);
      } catch (err) {
        console.error("Failed to fetch recently updated manga:", err);
        setError("Failed to load recent updates. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentlyUpdatedManga();
  }, []);

  return (
    <section className="bg-neutral-800/30 py-12 md:py-16"> {}
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex items-center text-2xl font-bold text-neutral-100 sm:text-3xl">
            <Zap size={28} className="mr-3 text-sky-400" />
            Recent Updates
          </h2>
          <Link
            href="/search?order_by=start_date&sort=desc&status=publishing"
            className="text-sm font-medium text-sky-400 hover:text-sky-300 hover:underline"
          >
            All Updates
          </Link>
        </div>
        {isLoading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
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
           <div className="text-center text-neutral-400">No updates found.</div>
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