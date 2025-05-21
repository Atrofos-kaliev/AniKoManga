"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMangaSearch } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Dices, AlertTriangle, Loader2 } from "lucide-react";

export default function RandomMangaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findAndRedirectToRandomManga = async () => {
    setIsLoading(true);
    setError(null);

    const MAX_ATTEMPTS = 30;
    let attempts = 0;

    try {
      const initialResponse = await getMangaSearch({ limit: 1, sfw: true });
      const lastVisiblePage = initialResponse.pagination?.last_visible_page;

      if (!lastVisiblePage || lastVisiblePage === 0) {
        setError("Failed to get page information for selecting a random manga.");
        setIsLoading(false);
        return;
      }

      while (attempts < MAX_ATTEMPTS) {
        attempts++;
        const randomPage = Math.floor(Math.random() * lastVisiblePage) + 1;
        const mangaPageResponse = await getMangaSearch({ page: randomPage, sfw: true, limit: 25 });

        if (mangaPageResponse.data?.length) {
          const randomIndex = Math.floor(Math.random() * mangaPageResponse.data.length);
          const chosenManga = mangaPageResponse.data[randomIndex];
          router.push(`/manga/${chosenManga.mal_id}`);
          return;
        }
      }

    setError(`Please try again.`);

    } catch (err: any) {
        let errorMessage = "An error occurred while searching for a random manga.";
        if (err.response?.status === 404) {
            errorMessage = "Could not find a random manga. Please try again later.";
        } else if (err.response?.status === 500) {
            errorMessage = "The server is temporarily unavailable. Please try again later.";
        }
        setError(errorMessage);
        setIsLoading(false);
    }
};

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-4 py-8 text-neutral-100">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-neutral-50 md:text-4xl">
          Find a Random Manga
        </h1>
        <p className="mx-auto max-w-md text-neutral-400">
          Not sure what to read? Click the button and we'll pick something random for you!
        </p>
      </div>

      <Button
        onClick={findAndRedirectToRandomManga}
        disabled={isLoading}
        size="lg"
        className="group bg-sky-500 px-8 py-6 text-lg hover:bg-sky-600"
      >
        {isLoading ? (
          <Loader2 size={24} className="mr-2 animate-spin" />
        ) : (
          <Dices size={24} className="mr-2 transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-110" />
        )}
        Find me a manga!
      </Button>

      {!isLoading && error && (
        <div className="mt-8 flex max-w-md flex-col items-center rounded-md border border-red-600 bg-red-900/30 p-6 text-center text-red-400">
          <AlertTriangle size={48} className="mb-4" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}