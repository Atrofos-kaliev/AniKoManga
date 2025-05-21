"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'; 

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

  const buttonBaseClasses = "transition-colors duration-150 ease-in-out cursor-pointer";
  const enabledButtonClasses = "border-sky-500 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 hover:text-sky-200 focus-visible:ring-sky-400";
  const disabledButtonClasses = "border-neutral-700 bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed";

  return (
    <div className="mt-12 flex items-center justify-center gap-3 sm:gap-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        variant="outline"
        size="sm"
        className={cn(
          buttonBaseClasses,
          (currentPage === 1 || isLoading) ? disabledButtonClasses : enabledButtonClasses
        )}
      >
        <ChevronLeft size={18} className="mr-1.5" />
        <span className="hidden sm:inline">Back</span>
      </Button>

      <span className="text-sm font-medium text-sky-400 sm:text-base whitespace-nowrap px-2">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        variant="outline"
        size="sm"
        className={cn(
          buttonBaseClasses,
          (currentPage === totalPages || isLoading) ? disabledButtonClasses : enabledButtonClasses
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} className="ml-1.5" />
      </Button>
    </div>
  );
}