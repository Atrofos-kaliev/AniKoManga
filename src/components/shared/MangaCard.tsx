"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Users, BookOpen } from "lucide-react";
import type { JikanMangaData } from "@/@types/types";

interface MangaCardProps {
  manga: JikanMangaData;
}

export default function MangaCard({ manga }: MangaCardProps) {
  const imageUrl =
    manga.images.webp?.large_image_url ||
    manga.images.webp?.image_url ||
    manga.images.jpg?.large_image_url ||
    manga.images.jpg?.image_url ||
    "/placeholder-cover.png";

  const score = manga.score ? manga.score.toFixed(1) : "N/A";
  const members = manga.members || 0;

  return (
    <Link
      href={`/manga/${manga.mal_id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-800 shadow-md transition-all hover:shadow-neutral-600/30 hover:border-neutral-600"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={manga.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {manga.chapters && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 px-2 py-1 text-xs text-neutral-200">
            Глав: {manga.chapters}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="mb-1 truncate text-sm font-semibold text-neutral-100 group-hover:text-sky-400">
          {manga.title_english || manga.title}
        </h3>
        {manga.authors && manga.authors.length > 0 && (
          <p className="mb-1 truncate text-xs text-neutral-400">
            {manga.authors[0].name}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-y-1 text-xs text-neutral-400">
          {manga.score && (
            <div className="flex items-center">
              <Star size={14} className="mr-1 text-yellow-400" />
              <span>{score}</span>
            </div>
          )}
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>{members > 1000 ? `${(members/1000).toFixed(1)}K` : members}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function MangaCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-md">
      <div className="aspect-[2/3] w-full animate-pulse bg-neutral-700"></div>
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-neutral-700"></div>
        <div className="mb-2 h-3 w-1/2 animate-pulse rounded bg-neutral-700"></div>
        <div className="mt-auto flex items-center justify-between">
          <div className="h-3 w-10 animate-pulse rounded bg-neutral-700"></div>
          <div className="h-3 w-10 animate-pulse rounded bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
}