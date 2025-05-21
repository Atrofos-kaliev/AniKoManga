import axios from "axios";
import { ApiInstance } from "./api-instance";
import type {
  GetMangaSearchParams,
  JikanApiGenre,
  JikanApiMangaByIdResponse,
  JikanApiSearchResponse,
  JikanMangaData,
} from "../@types/types";

export const getMangaSearch = async (
  params: GetMangaSearchParams
): Promise<JikanApiSearchResponse<JikanMangaData>> => {
  try {
    const response = await ApiInstance.get<
      JikanApiSearchResponse<JikanMangaData>
    >("/manga", {
      params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching manga search:", error.message);
    } else {
      console.error("Unexpected error fetching manga search:", error);
    }
    throw error;
  }
};

export const getMangaById = async (
  id: number | string
): Promise<JikanMangaData> => {
  try {
    const response = await ApiInstance.get<JikanApiMangaByIdResponse>(`/manga/${id}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error fetching manga by ID ${id}:`, error.message);
      if (error.response?.status === 404) {
      }
    } else {
      console.error(`Unexpected error fetching manga by ID ${id}:`, error);
    }
    throw error;
  }
};
