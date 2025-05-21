"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavoritesStore } from "@/store/favoritesStore";
import FavoriteItemCard, { FavoriteItemCardSkeleton } from "./components/FavoriteItemCard";
import { ListX } from "lucide-react";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavoriteById = useFavoritesStore((state) => state.toggleFavorite);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemoveFavorite = (mangaId: number) => {
    const favoriteToRemove = favorites.find(fav => fav.mal_id === mangaId);
    if (favoriteToRemove) {
      toggleFavoriteById(favoriteToRemove);
    }
  };

  if (!isClient) {
    return (
      <div className="container mx-auto min-h-screen px-4 py-8 text-neutral-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 md:text-4xl">
            Избранное
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <FavoriteItemCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 text-neutral-100">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-50 md:text-4xl">
          Избранное
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 p-10 text-center">
          <ListX size={64} className="mb-6 text-neutral-500" />
            <h2 className="text-xl font-semibold text-neutral-300">
            Favorites list is empty
            </h2>
            <p className="mt-2 text-neutral-400">
            Add manga to your favorites and they will appear here.
            </p>
            <Link
            href="/"
            className="mt-6 rounded-md bg-sky-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            >
            Search manga
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {favorites.map((favManga) => (
            <FavoriteItemCard
              key={favManga.mal_id}
              favorite={favManga}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}