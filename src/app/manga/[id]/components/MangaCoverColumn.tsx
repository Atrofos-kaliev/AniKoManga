// src/app/manga/[id]/components/MangaCoverColumn.tsx
import Image from 'next/image';
import type { JikanMangaData } from '@/@types/types';

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
        <button className="mt-2 w-full rounded-md border border-neutral-600 bg-neutral-700/60 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:bg-neutral-600">
          Добавить в список
        </button>
      </div>
    </div>
  );
}