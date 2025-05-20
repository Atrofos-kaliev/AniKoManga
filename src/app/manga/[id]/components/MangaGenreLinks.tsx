import Link from 'next/link';
import type { JikanApiGenre } from '@/@types/types';

interface MangaGenreLinksProps {
  genres: JikanApiGenre[] | undefined;
  typeLabel: string;
}

export default function MangaGenreLinks({ genres, typeLabel }: MangaGenreLinksProps) {
  if (!genres || genres.length === 0) return null;

  return (
    <div className="mb-3">
      <h3 className="mb-1.5 text-sm font-semibold text-neutral-400">{typeLabel}:</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Link
            key={genre.mal_id}
            href={`/manga?genres=${genre.mal_id}`}
            className="rounded-full bg-neutral-700 px-3 py-1 text-xs text-neutral-200 transition-colors hover:bg-sky-500 hover:text-white"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}