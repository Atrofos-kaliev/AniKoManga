import { create } from 'zustand';
import type { GetMangaSearchParams } from '@/@types/types';

export interface SearchFilters {
  type?: GetMangaSearchParams['type'];
  status?: GetMangaSearchParams['status'];
  order_by?: GetMangaSearchParams['order_by'];
  sort?: GetMangaSearchParams['sort'];
  genres?: string;
}

interface SearchFiltersState extends SearchFilters {
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  isDefault: () => boolean;
}

const initialState: SearchFilters = {
  type: undefined,
  status: undefined,
  order_by: 'popularity',
  sort: 'desc',
  genres: undefined,
};

export const useSearchFiltersStore = create<SearchFiltersState>((set, get) => ({
  ...initialState,
  setFilters: (filters) =>
    set((state) => ({
      ...state,
      ...filters,
    })),
  resetFilters: () => set(initialState),
  isDefault: () => {
    const currentState = get();
    return (
      currentState.type === initialState.type &&
      currentState.status === initialState.status &&
      currentState.order_by === initialState.order_by &&
      currentState.sort === initialState.sort &&
      currentState.genres === initialState.genres
    );
  }
}));