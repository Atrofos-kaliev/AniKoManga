import React from 'react';

interface MangaInfoItemProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}

export default function MangaInfoItem({ label, value, icon }: MangaInfoItemProps) {
  if (value === null || value === undefined || String(value).trim() === "") return null;

  return (
    <div className="rounded-lg bg-neutral-800 p-3 shadow">
      <div className="mb-1 flex items-center text-xs font-semibold text-sky-400">
        {icon && <span className="mr-1.5">{icon}</span>}
        {label}
      </div>
      <p className="text-sm text-neutral-200">{String(value)}</p>
    </div>
  );
}