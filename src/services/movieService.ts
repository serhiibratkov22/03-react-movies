import { http } from "../libs/api-service.ts";
import { BEARER_KEY, BASE_URL, ROUTES } from "../constants";
import type { Movie } from "../types/movie.ts";

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

  const { data } = await http.get(
    `${BASE_URL}${ROUTES.searchMovie}?${urlSearchParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_KEY}`,
      },
    }
  );

  return data;
};
