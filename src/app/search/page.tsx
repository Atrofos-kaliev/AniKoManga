"use client";
import { useState, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { MangaCardSkeleton } from "@/components/shared/MangaCard";
import { SearchForm } from "./components/SearchForm";
import { SearchFiltersPanel } from "./components/SearchFiltersPanel";
import { SearchResultsGrid } from "./components/SearchResultsGrid";
import { SearchPagination } from "./components/SearchPagination";
import { useMangaSearch } from "./hooks/useMangaSearch";

function SearchPageContent() {
  const {
    searchQueryInput,
    results,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalResults,
    hasSearchedOrFiltered,
    setSearchQueryInput,
    handleSearchSubmit,
    handleFilterChange,
    handleGenreToggle,
    resetAllFiltersAndSearch,
    handlePageChange,
    isStoreDefault,
  } = useMangaSearch();

  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  useEffect(() => {
    if (!isStoreDefault() && !showFiltersPanel) {
      setShowFiltersPanel(true);
    }
  }, [isStoreDefault]);

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 text-neutral-100">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-neutral-50 md:text-4xl">
          Поиск Манги
        </h1>
        <Button
          variant="outline"
          onClick={() => setShowFiltersPanel(!showFiltersPanel)}
          className="bg-neutral-700 border-neutral-600 text-neutral-100 hover:bg-neutral-600 hover:text-neutral-50 md:w-auto w-full"
          >
          <SlidersHorizontal size={18} className="mr-2" />
          {showFiltersPanel ? "Скрыть фильтры" : "Показать фильтры"}
          {!isStoreDefault() && <span className="ml-2 h-2 w-2 rounded-full bg-sky-500"></span>}
        </Button>
      </div>

      <SearchForm
        searchQueryInput={searchQueryInput}
        onSearchQueryChange={setSearchQueryInput}
        onSearchSubmit={handleSearchSubmit}
        isLoading={isLoading}
      />

      <SearchFiltersPanel
        showFilters={showFiltersPanel}
        onFilterChange={handleFilterChange}
        onGenreToggle={handleGenreToggle}
        onResetFilters={resetAllFiltersAndSearch}
        searchQueryInput={searchQueryInput}
      />

      <SearchResultsGrid
        isLoading={isLoading}
        error={error}
        results={results}
        totalResults={totalResults}
        hasSearchedOrFiltered={hasSearchedOrFiltered}
      />

      {!isLoading && !error && results.length > 0 && (
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  );
}

const SearchPageSkeleton = () => (
<div className="container mx-auto min-h-screen px-4 py-8 text-neutral-100 animate-pulse">
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="h-8 w-1/3 rounded bg-neutral-700"></div>
        <div className="h-8 w-24 rounded bg-neutral-700"></div>
    </div>
    <div className="mb-6 flex gap-2">
        <div className="h-8 flex-grow rounded bg-neutral-700"></div>
        <div className="h-8 w-16 rounded bg-neutral-700"></div>
    </div>
    <div className="mb-8 grid grid-cols-2 gap-4 rounded border border-neutral-700 bg-neutral-800/50 p-4">
        {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
                <div className="mb-1 h-3 w-1/4 rounded bg-neutral-600"></div>
                <div className="h-8 w-full rounded bg-neutral-700"></div>
            </div>
        ))}
        <div className="col-span-2">
            <div className="mb-1 h-3 w-1/6 rounded bg-neutral-600"></div>
            <div className="h-10 w-full rounded bg-neutral-700"></div>
        </div>
        <div className="col-span-2 flex justify-end pt-2">
            <div className="h-8 w-24 rounded bg-neutral-700"></div>
        </div>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 4 }).map((_, index) => (
            <MangaCardSkeleton key={index} />
        ))}
    </div>
</div>
);