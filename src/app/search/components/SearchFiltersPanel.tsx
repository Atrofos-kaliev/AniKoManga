"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchFiltersStore, SearchFilters } from '@/store/searchFiltersStore';
import { mangaTypes, mangaStatuses, mangaOrderBys, popularGenres } from '@/@types/searchConstants';

interface SearchFiltersPanelProps {
  showFilters: boolean;
  onFilterChange: <K extends keyof SearchFilters>(filterName: K, value: SearchFilters[K] | undefined) => void;
  onGenreToggle: (genreId: number) => void;
  onResetFilters: () => void;
  searchQueryInput: string;
}

export function SearchFiltersPanel({
  showFilters,
  onFilterChange,
  onGenreToggle,
  onResetFilters,
  searchQueryInput,
}: SearchFiltersPanelProps) {
  const { type, status, order_by, sort, genres, isDefault } = useSearchFiltersStore();
  const selectedGenreIds = genres ? genres.split(',').map(Number) : [];

  return (
    <div
      className={cn(
        "mb-8 overflow-hidden transition-all duration-300 ease-in-out",
        showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="filter-type" className="mb-1.5 block text-sm font-medium text-neutral-300">Type</label>
          <Select
            value={type || "all"}
            onValueChange={(v) => onFilterChange('type', v === "all" ? undefined : (v as SearchFilters['type']))}
          >
            <SelectTrigger id="filter-type" className="w-full bg-neutral-700 border-neutral-600 text-neutral-100 focus:ring-sky-500">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-100">
              <SelectItem value="all">Any type</SelectItem>
              {mangaTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="filter-status" className="mb-1.5 block text-sm font-medium text-neutral-300">Status</label>
          <Select
            value={status || "all"}
            onValueChange={(v) => onFilterChange('status', v === "all" ? undefined : (v as SearchFilters['status']))}
          >
            <SelectTrigger id="filter-status" className="w-full bg-neutral-700 border-neutral-600 text-neutral-100 focus:ring-sky-500">
              <SelectValue placeholder="Any status" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-100">
              <SelectItem value="all">Any status</SelectItem>
              {mangaStatuses.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="filter-orderby" className="mb-1.5 block text-sm font-medium text-neutral-300">Sort by</label>
          <Select
            value={order_by || "popularity"}
            onValueChange={(v) => onFilterChange('order_by', v as SearchFilters['order_by'])}
          >
            <SelectTrigger id="filter-orderby" className="w-full bg-neutral-700 border-neutral-600 text-neutral-100 focus:ring-sky-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-100">
              {mangaOrderBys.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="filter-sort" className="mb-1.5 block text-sm font-medium text-neutral-300">Order</label>
          <Select
            value={sort || "desc"}
            onValueChange={(v) => onFilterChange('sort', v as SearchFilters['sort'])}
          >
            <SelectTrigger id="filter-sort" className="w-full bg-neutral-700 border-neutral-600 text-neutral-100 focus:ring-sky-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-100">
              <SelectItem value="desc">In descending order</SelectItem>
              <SelectItem value="asc">In ascending order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <label className="mb-1.5 block text-sm font-medium text-neutral-300">Genres</label>
          <div className="flex flex-wrap gap-2 rounded-md border border-neutral-600 bg-neutral-700/50 p-2 min-h-[40px]">
            {popularGenres.map(genre => (
              <Button
                key={genre.id}
                variant={selectedGenreIds.includes(genre.id) ? "default" : "outline"}
                size="sm"
                onClick={() => onGenreToggle(genre.id)}
                className={cn(
                  "text-xs h-auto py-1 px-2.5",
                  selectedGenreIds.includes(genre.id)
                    ? "bg-sky-500 hover:bg-sky-600 text-white border-sky-500"
                    : "bg-neutral-600 border-neutral-500 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-400"
                )}
              >
                {genre.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2">
          <Button
            variant="ghost"
            onClick={onResetFilters}
            className="text-sky-400 hover:text-sky-300 hover:bg-neutral-700/50"
            disabled={isDefault() && !searchQueryInput}
          >
            <FilterX size={18} className="mr-2" />
            Reset all
          </Button>
        </div>
      </div>
    </div>
  );
}