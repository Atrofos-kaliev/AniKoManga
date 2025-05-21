import type { GetMangaSearchParams } from "@/@types/types";

export const RESULTS_PER_PAGE = 18;

export const mangaTypes: { value: Required<GetMangaSearchParams>['type']; label: string }[] = [
  { value: "manga", label: "Manga" },
  { value: "novel", label: "Novel" },
  { value: "lightnovel", label: "Light Novel" },
  { value: "oneshot", label: "Oneshot" },
  { value: "doujin", label: "Doujinshi" },
  { value: "manhwa", label: "Manhwa" },
  { value: "manhua", label: "Manhua" },
];

export const mangaStatuses: { value: Required<GetMangaSearchParams>['status']; label: string }[] = [
  { value: "publishing", label: "Publishing" },
  { value: "complete", label: "Completed" },
  { value: "hiatus", label: "Hiatus" },
  { value: "discontinued", label: "Discontinued" },
  { value: "upcoming", label: "Upcoming" },
];

export const mangaOrderBys: { value: Required<GetMangaSearchParams>['order_by']; label: string }[] = [
  { value: "mal_id", label: "ID" },
  { value: "title", label: "Title" },
  { value: "start_date", label: "Start Date" },
  { value: "chapters", label: "Chapters" },
  { value: "volumes", label: "Volumes" },
  { value: "score", label: "Score" },
  { value: "scored_by", label: "Scored By" },
  { value: "rank", label: "Rank" },
  { value: "popularity", label: "Popularity" },
  { value: "members", label: "Members" },
  { value: "favorites", label: "Favorites (MAL)" },
];

export const popularGenres: { id: number; name: string }[] = [
    { id: 1, name: "Action" }, { id: 2, name: "Adventure" }, { id: 4, name: "Comedy" },
    { id: 8, name: "Drama" }, { id: 10, name: "Fantasy" }, { id: 7, name: "Mystery" },
    { id: 22, name: "Romance" }, { id: 24, name: "Sci-Fi" }, { id: 23, name: "School" },
    { id: 42, name: "Seinen" }, { id: 27, name: "Shounen" }, { id: 25, name: "Shoujo" },
    { id: 37, name: "Supernatural" }, { id: 30, name: "Sports" }, { id: 14, name: "Horror" },
    { id: 36, name: "Slice of Life" }, { id: 41, name: "Thriller" }, { id: 13, name: "Historical"}
];