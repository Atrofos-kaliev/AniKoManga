import type { JikanMangaData } from '@/@types/types';
import { Star, Users } from 'lucide-react';

interface MangaHeaderProps {
  manga: JikanMangaData;
}

export default function MangaHeader({ manga }: MangaHeaderProps) {
  return (
    <>
      <h1 className="mb-1 text-3xl font-bold text-neutral-50 md:text-4xl">
        {manga.title}
      </h1>
      {manga.title_english && (
        <h2 className="mb-4 text-lg text-neutral-400">
          {manga.title_english}
        </h2>
      )}
      {manga.title_japanese && (
        <h3 className="mb-4 text-sm text-neutral-500">
          {manga.title_japanese}
        </h3>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        {manga.score && (
          <div className="flex items-center text-yellow-400">
            <Star size={20} className="mr-1.5" />
            <span className="text-lg font-semibold">{manga.score.toFixed(1)}</span>
            {manga.scored_by && <span className="ml-1 text-xs text-neutral-400">({manga.scored_by.toLocaleString()})</span>}
          </div>
        )}
        {manga.members && (
          <div className="flex items-center text-neutral-400">
            <Users size={18} className="mr-1.5" />
            <span className="text-sm">{manga.members.toLocaleString()} участников</span>
          </div>
        )}
        {manga.rank && (
          <div className="flex items-center text-neutral-400">
            <span className="mr-1 text-xs font-medium">Ранг:</span>
            <span className="text-sm font-semibold">#{manga.rank.toLocaleString()}</span>
          </div>
        )}
        {manga.popularity && (
          <div className="flex items-center text-neutral-400">
            <span className="mr-1 text-xs font-medium">Популярность:</span>
            <span className="text-sm font-semibold">#{manga.popularity.toLocaleString()}</span>
          </div>
        )}
      </div>
    </>
  );
}