"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
}

export function SearchPagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: SearchPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-2 sm:gap-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        variant="outline"
        size="sm"
        className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100"
      >
        <ChevronLeft size={18} className="mr-1" /> <span className="hidden sm:inline">Назад</span>
      </Button>
      <span className="text-neutral-300 text-sm sm:text-base whitespace-nowrap">
        Стр. {currentPage} из {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        variant="outline"
        size="sm"
        className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100"
      >
        <span className="hidden sm:inline">Вперед</span> <ChevronRight size={18} className="ml-1" />
      </Button>
    </div>
  );
}