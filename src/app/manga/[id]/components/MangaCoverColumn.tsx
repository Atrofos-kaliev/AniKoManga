import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { JikanMangaData } from '@/@types/types';
import { useFavoritesStore } from '@/store/favoritesStore';
import { Heart } from 'lucide-react';

interface MangaCoverColumnProps {
  manga: JikanMangaData;
}

export default function MangaCoverColumn({ manga }: MangaCoverColumnProps) {
  const imageUrl =
    manga.images.webp?.large_image_url ||
    manga.images.jpg?.large_image_url ||
    manga.images.webp?.image_url ||
    manga.images.jpg?.image_url ||
    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg";

  const [clientLoaded, setClientLoaded] = useState(false);

  const isFavorite = useFavoritesStore((state) => state.isFavorite(manga.mal_id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  const handleToggleFavorite = () => {
    toggleFavorite({
      mal_id: manga.mal_id,
      title: manga.title_english || manga.title,
      imageUrl: manga.images.webp?.image_url ||
              manga.images.jpg?.image_url ||
              manga.images.webp?.large_image_url ||
              manga.images.jpg?.large_image_url,
  });
};

  return (
    <div className="md:col-span-4 lg:col-span-3">
      <div className="sticky top-24">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={imageUrl}
            alt={manga.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
            priority
          />
        </div>

        <button className="mt-4 w-full rounded-md bg-sky-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600">
          Начать читать (Глава 1)
        </button>

        <button
          onClick={handleToggleFavorite}
          disabled={!clientLoaded}
          className={`mt-2 flex w-full items-center justify-center rounded-md border py-2.5 text-sm font-semibold transition-colors
            ${
              clientLoaded && isFavorite
                ? "border-pink-500 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20"
                : "border-neutral-600 bg-neutral-700/60 text-neutral-100 hover:bg-neutral-600"
            }`}
        >
          <Heart
            size={18}
            className={`mr-2 ${clientLoaded && isFavorite ? "fill-current" : ""}`}
          />
          {clientLoaded && isFavorite ? "В избранном" : "В избранное"}
        </button>
      </div>
    </div>
  );
}