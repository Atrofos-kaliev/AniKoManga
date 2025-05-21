import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getMangaSearch } from '@/services/api';
import { JikanMangaData, GetMangaSearchParams } from '@/@types/types';
import { useSearchFiltersStore, SearchFilters } from '@/store/searchFiltersStore';
import { RESULTS_PER_PAGE } from '@/@types/searchConstants';

const isDefaultFilters = (filters: Partial<SearchFilters>): boolean => {
  return (
    filters.type === undefined &&
    filters.status === undefined &&
    filters.order_by === 'popularity' &&
    filters.sort === 'desc' &&
    (filters.genres === undefined || filters.genres === '')
  );
};

export function useMangaSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    type: filterType,
    status: filterStatus,
    order_by: filterOrderBy,
    sort: filterSort,
    genres: filterGenres,
    setFilters,
    resetFilters: resetStoreFilters,
    isDefault: isStoreDefault,
  } = useSearchFiltersStore();

  const initialQueryFromUrl = searchParams.get('q') || '';
  const initialPageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const [searchQueryInput, setSearchQueryInput] = useState(initialQueryFromUrl);
  const [results, setResults] = useState<JikanMangaData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPageFromUrl);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearchedOrFiltered, setHasSearchedOrFiltered] = useState(false);

  const executeFetch = async (query: string, page: number, currentFilters: SearchFilters) => {
    const trimmedQuery = query.trim();
    const filtersAreActuallyDefault = isDefaultFilters(currentFilters);

    if (!trimmedQuery && filtersAreActuallyDefault) {
      setResults([]); setTotalPages(0); setTotalResults(0); setIsLoading(false); setError(null); setHasSearchedOrFiltered(false);
      return;
    }

    setHasSearchedOrFiltered(true); setIsLoading(true); setError(null);

    const apiParams: GetMangaSearchParams = {
      page: page, limit: RESULTS_PER_PAGE, sfw: true,
    };
    if (trimmedQuery) apiParams.q = trimmedQuery;
    if (currentFilters.type) apiParams.type = currentFilters.type;
    if (currentFilters.status) apiParams.status = currentFilters.status;
    if (currentFilters.order_by) apiParams.order_by = currentFilters.order_by;
    if (currentFilters.sort) apiParams.sort = currentFilters.sort;
    if (currentFilters.genres) apiParams.genres = currentFilters.genres;

    try {
      const response = await getMangaSearch(apiParams);
      setResults(response.data);
      setTotalPages(response.pagination.last_visible_page || 0);
      setTotalResults(response.pagination.items.total || 0);
    } catch (err: any) {
      console.error("Failed to fetch search results:", err);
      let message = "Не удалось загрузить результаты поиска. Попробуйте снова.";
      if (err.response?.status === 400) message = "Ошибка в параметрах запроса. Проверьте фильтры.";
      setError(message); setResults([]); setTotalPages(0); setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUrlAndTriggerSearch = useCallback((
    query: string,
    page: number,
    filtersToApply: SearchFilters,
    triggerFetch: boolean = true
  ) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (page > 1) params.set("page", page.toString());

    if (filtersToApply.type) params.set("type", filtersToApply.type);
    if (filtersToApply.status) params.set("status", filtersToApply.status);
    if (filtersToApply.order_by && filtersToApply.order_by !== 'popularity') params.set("order_by", filtersToApply.order_by);
    else if (filtersToApply.order_by === 'popularity' && params.has('order_by')) params.delete('order_by');
    
    if (filtersToApply.sort && filtersToApply.sort !== 'desc') params.set("sort", filtersToApply.sort);
    else if (filtersToApply.sort === 'desc' && params.has('sort')) params.delete('sort');
    
    if (filtersToApply.genres) params.set("genres", filtersToApply.genres);

    const newUrl = `/search?${params.toString()}`;
    if (window.location.pathname + window.location.search !== newUrl) {
        router.push(newUrl, { scroll: false });
    } else if (triggerFetch) {
        executeFetch(query, page, filtersToApply);
    }
  }, [router]);


  useEffect(() => {
    const qFromUrl = searchParams.get("q") || "";
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    
    const filtersFromUrl: SearchFilters = {
      type: searchParams.get("type") as SearchFilters['type'] || undefined,
      status: searchParams.get("status") as SearchFilters['status'] || undefined,
      order_by: searchParams.get("order_by") as SearchFilters['order_by'] || 'popularity',
      sort: searchParams.get("sort") as SearchFilters['sort'] || 'desc',
      genres: searchParams.get("genres") || undefined,
    };
    
    setFilters(filtersFromUrl);
    setSearchQueryInput(qFromUrl);
    setCurrentPage(pageFromUrl);

    const queryExists = qFromUrl.trim() !== "";
    const activeFiltersApplied = !isDefaultFilters(filtersFromUrl);

    if (queryExists || activeFiltersApplied) {
      setHasSearchedOrFiltered(true);
      executeFetch(qFromUrl, pageFromUrl, filtersFromUrl);
    } else {
      setResults([]); setTotalPages(0); setTotalResults(0); setHasSearchedOrFiltered(false); setIsLoading(false); setError(null);
    }
  }, [searchParams, setFilters]);


  const handleSearchSubmit = () => {
    const currentGlobalFilters = { type: filterType, status: filterStatus, order_by: filterOrderBy, sort: filterSort, genres: filterGenres };
    updateUrlAndTriggerSearch(searchQueryInput.trim(), 1, currentGlobalFilters);
  };

  const handleFilterChange = <K extends keyof SearchFilters>(
    filterName: K,
    value: SearchFilters[K] | undefined
  ) => {
    const updatedValue = value === "" ? undefined : value;
    setFilters({ [filterName]: updatedValue }); 
    
    const updatedGlobalFilters = { 
        ...useSearchFiltersStore.getState(),
        [filterName]: updatedValue
    };
    updateUrlAndTriggerSearch(searchQueryInput.trim(), 1, updatedGlobalFilters);
  };

  const handleGenreToggle = (genreId: number) => {
    const currentSelectedGenres = filterGenres ? filterGenres.split(',').map(Number) : [];
    const newSelectedGenres = currentSelectedGenres.includes(genreId)
      ? currentSelectedGenres.filter(id => id !== genreId)
      : [...currentSelectedGenres, genreId];
    const newGenresString = newSelectedGenres.length > 0 ? newSelectedGenres.join(',') : undefined;
    handleFilterChange('genres', newGenresString);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      const currentGlobalFilters = { type: filterType, status: filterStatus, order_by: filterOrderBy, sort: filterSort, genres: filterGenres };
      updateUrlAndTriggerSearch(searchQueryInput.trim(), newPage, currentGlobalFilters);
    }
  };

  const resetAllFiltersAndSearch = () => {
    resetStoreFilters();
    setSearchQueryInput("");
    const defaultStoreFilters = useSearchFiltersStore.getState();
    updateUrlAndTriggerSearch("", 1, {
        type: defaultStoreFilters.type, status: defaultStoreFilters.status, 
        order_by: defaultStoreFilters.order_by, sort: defaultStoreFilters.sort, 
        genres: defaultStoreFilters.genres
    });
  };

  return {
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
  };
}