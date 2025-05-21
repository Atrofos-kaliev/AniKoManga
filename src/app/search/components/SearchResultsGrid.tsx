"use client";

import React from 'react';
import MangaCard, { MangaCardSkeleton } from '@/components/shared/MangaCard';
import { JikanMangaData } from '@/@types/types';
import { RESULTS_PER_PAGE } from '@/@types/searchConstants';
import { AlertTriangle, Frown, SearchIcon as SearchPlaceholderIcon } from 'lucide-react';

interface SearchResultsGridProps {
  isLoading: boolean;
  error: string | null;
  results: JikanMangaData[];
  totalResults: number;
  hasSearchedOrFiltered: boolean;
}

export function SearchResultsGrid({
  isLoading,
  error,
  results,
  totalResults,
  hasSearchedOrFiltered,
}: SearchResultsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: RESULTS_PER_PAGE }).map((_, index) => (
          <MangaCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-red-700 bg-red-900/30 p-8 text-center text-red-300">
        <AlertTriangle size={48} className="mb-4" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (hasSearchedOrFiltered && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 p-8 text-center text-neutral-400">
        <Frown size={48} className="mb-4" />
        <p className="text-lg font-semibold">
          Nothing was found for your query and filters.
        </p>
        <p className="text-sm">Try changing the query or loosening the filters.</p>
      </div>
    );
  }

  if (!hasSearchedOrFiltered && results.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 p-10 text-center text-neutral-400">
           <SearchPlaceholderIcon size={64} className="mb-6 text-neutral-500" />
           <h2 className="text-xl font-semibold text-neutral-300">
             Start searching or select filters
           </h2>
           <p className="mt-2">
             Enter a manga title, author, or use the filters.
           </p>
         </div>
      );
  }


  if (results.length > 0) {
    return (
      <>
        <div className="mb-4 text-sm text-neutral-400">
          Results found: {totalResults.toLocaleString()}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {results.map((manga) => (
            <MangaCard key={manga.mal_id} manga={manga} />
          ))}
        </div>
      </>
    );
  }
  
  return null;
}