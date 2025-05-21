"use client";

import Link from "next/link";
import { Drama, Swords, Laugh, Heart, Ghost, Skull, School, BookOpen } from "lucide-react";
import React from "react";

const genresData = [
  { name: "Экшен", id: 1, iconName: "Swords" },
  { name: "Комедия", id: 4, iconName: "Laugh" },
  { name: "Драма", id: 8, iconName: "Drama" },
  { name: "Романтика", id: 22, iconName: "Heart" },
  { name: "Фэнтези", id: 10, iconName: "Ghost" },
  { name: "Хоррор", id: 14, iconName: "Skull" },
  { name: "Школа", id: 23, iconName: "School" },
];

const GenreIcon = ({ name }: { name: string }) => {
  const iconProps = { size: 24, className: "mb-2 text-sky-400 group-hover:text-white transition-colors" };
  switch (name) {
    case "Swords": return <Swords {...iconProps} />;
    case "Laugh": return <Laugh {...iconProps} />;
    case "Drama": return <Drama {...iconProps} />;
    case "Heart": return <Heart {...iconProps} />;
    case "Ghost": return <Ghost {...iconProps} />;
    case "Skull": return <Skull {...iconProps} />;
    case "School": return <School {...iconProps} />;
    default: return <BookOpen {...iconProps} />;
  }
};


export default function BrowseByGenre() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-100 sm:text-3xl">
            Популярные Жанры
          </h2>
          <p className="mt-2 text-neutral-400">
            Найдите мангу на свой вкус.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {genresData.map((genre) => (
            <Link
              key={genre.name}
              href={`/search?genres=${genre.id}`}
              className="group flex flex-col items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 p-4 text-center shadow-md transition-all hover:bg-sky-500 hover:border-sky-400 hover:shadow-lg"
            >
              <GenreIcon name={genre.iconName} />
              <span className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">{genre.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}