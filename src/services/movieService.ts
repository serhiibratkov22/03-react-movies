// src/services/movieService.ts
import http from "../libs/api-service";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<MovieResponse> => {
  try {
    const response = await http.get<MovieResponse>("/search/movie", {
      params: {
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};
