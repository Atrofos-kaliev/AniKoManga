"use client";

import React, { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, X } from 'lucide-react';

interface SearchFormProps {
  searchQueryInput: string;
  onSearchQueryChange: (value: string) => void;
  onSearchSubmit: (e?: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function SearchForm({
  searchQueryInput,
  onSearchQueryChange,
  onSearchSubmit,
  isLoading,
}: SearchFormProps) {
  return (
    <form onSubmit={onSearchSubmit} className="mb-6 flex gap-2">
      <div className="relative flex-grow">
        <Input
          type="text"
          value={searchQueryInput}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Название манги, автор..."
          className="pr-10"
          aria-label="Поле для поиска манги"
        />
        {searchQueryInput && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-neutral-400 hover:text-neutral-100"
            onClick={() => onSearchQueryChange("")}
            aria-label="Очистить поле поиска"
          >
            <X size={18} />
          </Button>
        )}
      </div>
      <Button type="submit" disabled={isLoading} className="bg-sky-500 hover:bg-sky-600">
        <SearchIcon size={20} className="mr-2 sm:mr-0 md:mr-2" />
        <span className="hidden md:inline">Искать</span>
      </Button>
    </form>
  );
}