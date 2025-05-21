import Link from 'next/link';
import Image from 'next/image';
import type { FavoriteManga } from '@/store/favoritesStore';
import { HeartCrack } from 'lucide-react';

interface FavoriteItemCardProps {
  favorite: FavoriteManga;
  onRemove: (mangaId: number) => void;
}

export default function FavoriteItemCard({ favorite, onRemove }: FavoriteItemCardProps) {
  const imageUrl = favorite.imageUrl || 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg';

  return (
    <div className="group/favitem relative flex flex-col overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-800 shadow-md transition-all">
      <Link href={`/manga/${favorite.mal_id}`} className="contents">
        <div className="relative aspect-[2/3] w-full overflow-hidden group-hover/favitem:opacity-80 transition-opacity">
          <Image
            src={imageUrl}
            alt={favorite.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover/favitem:scale-105"
          />
        </div>
        <div className="p-2">
          <h3 className="truncate text-xs font-semibold text-neutral-100 group-hover/favitem:text-sky-400 sm:text-sm">
            {favorite.title}
          </h3>
        </div>
      </Link>
      <button
        onClick={() => onRemove(favorite.mal_id)}
        title="Remove from favorites"
        aria-label={`Remove ${favorite.title} from favorites`}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover/favitem:opacity-100 transition-opacity
           rounded-full bg-red-600/80 p-1.5 text-white shadow-md hover:bg-red-700 focus:opacity-100 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-neutral-800"
      >
        <HeartCrack size={16} />
      </button>
    </div>
  );
}

export function FavoriteItemCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-md">
      <div className="aspect-[2/3] w-full animate-pulse bg-neutral-700"></div>
      <div className="p-2">
        <div className="h-3 w-3/4 animate-pulse rounded bg-neutral-700 sm:h-4"></div>
      </div>
    </div>
  );
}