import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FavoriteManga {
  mal_id: number;
  title: string;
  imageUrl?: string | null;
}

interface FavoritesState {
  favorites: FavoriteManga[];
  isFavorite: (mangaId: number) => boolean;
  toggleFavorite: (manga: FavoriteManga) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (mangaId) => get().favorites.some(fav => fav.mal_id === mangaId),
      toggleFavorite: (mangaItem) =>
        set((state) => {
          const existing = state.favorites.find(fav => fav.mal_id === mangaItem.mal_id);
          if (existing) {
            return { favorites: state.favorites.filter(fav => fav.mal_id !== mangaItem.mal_id) };
          } else {
            return { favorites: [...state.favorites, mangaItem] };
          }
        }),
    }),
    {
      name: 'manga-favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);