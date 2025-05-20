import type { JikanMangaData } from '@/@types/types';
import MangaInfoItem from './MangaInfoItem';
import MangaGenreLinks from './MangaGenreLinks';
import { BookOpen, CalendarDays, Tag } from 'lucide-react';

interface MangaDetailsSectionProps {
  manga: JikanMangaData;
}

export default function MangaDetailsSection({ manga }: MangaDetailsSectionProps) {
  return (
    <>
      <div className="mb-6 space-y-3">
        <MangaGenreLinks genres={manga.genres} typeLabel="Жанры" />
        <MangaGenreLinks genres={manga.themes} typeLabel="Темы" />
        <MangaGenreLinks genres={manga.demographics} typeLabel="Демография" />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-neutral-200">
        Детали
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <MangaInfoItem label="Тип" value={manga.type} icon={<BookOpen size={16} />} />
        <MangaInfoItem label="Статус" value={manga.status} icon={<CalendarDays size={16} />} />
        <MangaInfoItem label="Глав" value={manga.chapters} icon={<Tag size={16} />} />
        <MangaInfoItem label="Томов" value={manga.volumes} icon={<Tag size={16} />} />
        {manga.authors && manga.authors.length > 0 && (
          <MangaInfoItem label="Автор(ы)" value={manga.authors.map(a => a.name).join(', ')} />
        )}
        {manga.serializations && manga.serializations.length > 0 && (
          <MangaInfoItem label="Публикуется в" value={manga.serializations.map(s => s.name).join(', ')} />
        )}
      </div>
    </>
  );
}