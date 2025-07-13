import axios from "axios";
import type { Movie } from "../types/movie.ts";

const BEARER_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const SEARCH_MOVIE_ENDPOINT = "/search/movie";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const TMDB_IMAGE_ORIGINAL_URL = "https://image.tmdb.org/t/p/original";

export const getImageUrl = (
  imagePath: string | null,
  size: "w500" | "original" = "w500"
): string => {
  if (!imagePath) return "";
  const baseUrl =
    size === "original"
      ? "https://image.tmdb.org/t/p/original"
      : "https://image.tmdb.org/t/p/w500";
  return `${baseUrl}${imagePath}`;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${BEARER_KEY}`,
  },
});

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovie = async (
  query: string,
  page: string = "1"
): Promise<MoviesResponse> => {
  const urlSearchParams = new URLSearchParams({
    query,
    page,
  });

  const { data } = await api.get<MoviesResponse>(
    `${SEARCH_MOVIE_ENDPOINT}?${urlSearchParams.toString()}`
  );

  return data;
};
