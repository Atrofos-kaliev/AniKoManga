
export interface JikanApiImageInfo {
  image_url: string | null;
  small_image_url: string | null;
  large_image_url: string | null;
}

export interface JikanApiImages {
  jpg: JikanApiImageInfo;
  webp: JikanApiImageInfo;
}

export interface JikanApiGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanApiAuthor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanMangaData {
  mal_id: number;
  url: string | null;
  images: JikanApiImages;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: string | null;
  chapters: number | null;
  volumes: number | null;
  status: string;
  publishing: boolean;
  score: number | null;
  synopsis: string | null;
  genres: JikanApiGenre[];
  themes: JikanApiGenre[];
  demographics: JikanApiGenre[];
  scored_by: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  authors: JikanApiAuthor[];
  serializations: JikanApiGenre[];
  rank: number | null;
}

export interface JikanApiSearchResponse<T> {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface GetMangaSearchParams {
  limit?: number;
  page?: number;
  q?: string;
  type?:
    | "manga"
    | "novel"
    | "lightnovel"
    | "oneshot"
    | "doujin"
    | "manhwa"
    | "manhua";
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: "publishing" | "complete" | "hiatus" | "discontinued" | "upcoming";
  sfw?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?:
    | "mal_id"
    | "title"
    | "start_date"
    | "end_date"
    | "chapters"
    | "volumes"
    | "score"
    | "scored_by"
    | "rank"
    | "popularity"
    | "members"
    | "favorites";
  sort?: "desc" | "asc";
  letter?: string;
  magazines?: string;
  start_date?: string;
  end_date?: string;
}

export interface JikanApiMangaByIdResponse {
  data: JikanMangaData;
}