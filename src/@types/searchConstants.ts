import type { GetMangaSearchParams } from "@/@types/types";

export const RESULTS_PER_PAGE = 18;

export const mangaTypes: { value: Required<GetMangaSearchParams>['type']; label: string }[] = [
  { value: "manga", label: "Манга" },
  { value: "novel", label: "Новелла" },
  { value: "lightnovel", label: "Лайт-новелла" },
  { value: "oneshot", label: "Ваншот" },
  { value: "doujin", label: "Додзинси" },
  { value: "manhwa", label: "Манхва" },
  { value: "manhua", label: "Маньхуа" },
];

export const mangaStatuses: { value: Required<GetMangaSearchParams>['status']; label: string }[] = [
  { value: "publishing", label: "Выпускается" },
  { value: "complete", label: "Завершено" },
  { value: "hiatus", label: "Перерыв" },
  { value: "discontinued", label: "Прекращено" },
  { value: "upcoming", label: "Анонс" },
];

export const mangaOrderBys: { value: Required<GetMangaSearchParams>['order_by']; label: string }[] = [
  { value: "mal_id", label: "ID" },
  { value: "title", label: "Название" },
  { value: "start_date", label: "Дата начала" },
  { value: "chapters", label: "Главы" },
  { value: "volumes", label: "Тома" },
  { value: "score", label: "Оценка" },
  { value: "scored_by", label: "Кол-во оценок" },
  { value: "rank", label: "Ранг" },
  { value: "popularity", label: "Популярность" },
  { value: "members", label: "Участники" },
  { value: "favorites", label: "В избранном (MAL)" },
];

export const popularGenres: { id: number; name: string }[] = [
    { id: 1, name: "Экшен" }, { id: 2, name: "Приключения" }, { id: 4, name: "Комедия" },
    { id: 8, name: "Драма" }, { id: 10, name: "Фэнтези" }, { id: 7, name: "Мистика" },
    { id: 22, name: "Романтика" }, { id: 24, name: "Фантастика" }, { id: 23, name: "Школа" },
    { id: 42, name: "Сейнен" }, { id: 27, name: "Сёнен" }, { id: 25, name: "Сёдзё" },
    { id: 37, name: "Сверхъестественное" }, { id: 30, name: "Спорт" }, { id: 14, name: "Ужасы" },
    { id: 36, name: "Повседневность" }, { id: 41, name: "Триллер" }, { id: 13, name: "Исторический"}
];