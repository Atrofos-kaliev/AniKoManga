"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMangaById } from "@/services/api";
import type { JikanMangaData } from "@/@types/types";
import { ArrowLeft, Info } from "lucide-react";

import MangaCoverColumn from "./components/MangaCoverColumn";
import MangaHeader from "./components/MangaHeader";
import MangaSynopsis from "./components/MangaSynopsis";
import MangaDetailsSection from "./components/MangaDetailsSection";
import { MangaDetailSkeleton } from "./components/MangaDetailSkeleton";

interface MangaPageProps {
  params: {
    id: string;
  };
}

const ErrorDisplay = ({ message, id }: { message: string; id?: string }) => (
  <div className="container mx-auto flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-4 py-8 text-center text-red-400">
    <Info size={48} className="mb-4" />
    <h1 className="mb-2 text-2xl font-semibold">Ошибка</h1>
    <p>{message}</p>
    <Link href="/" className="mt-6 rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600">
      На главную
    </Link>
  </div>
);

const NotFoundDisplay = () => (
  <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-8 text-neutral-300">
    Манга не найдена.
  </div>
);


export default function MangaPage({ params }: MangaPageProps) {
  const { id } = params;
  const [manga, setManga] = useState<JikanMangaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchMangaDetails = async () => {
      setIsLoading(true);
      setError(null);
      setManga(null);
      try {
        const mangaData = await getMangaById(id);
        setManga(mangaData);
      } catch (err: any) {
        console.error(`Failed to fetch manga ${id}:`, err);
        if (err.response?.status === 404) {
          setError(`Манга с ID ${id} не найдена.`);
        } else {
          setError("Не удалось загрузить информацию о манге. Попробуйте обновить страницу.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMangaDetails();
  }, [id]);

  if (isLoading) {
    return <MangaDetailSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} id={id} />;
  }

  if (!manga) {
    return <NotFoundDisplay />;
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 text-neutral-100">
      <Link
        href="/"
        className="mb-6 inline-flex items-center rounded-md px-3 py-1.5 text-sm text-sky-400 transition-colors hover:bg-neutral-700/50"
      >
        <ArrowLeft size={18} className="mr-1.5" />
        Назад
      </Link>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12">
        <MangaCoverColumn manga={manga} />
        <div className="md:col-span-8 lg:col-span-9">
          <MangaHeader manga={manga} />
          <MangaSynopsis synopsis={manga.synopsis} />
          <MangaDetailsSection manga={manga} />
        </div>
      </div>
    </div>
  );
}