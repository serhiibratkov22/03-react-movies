// src/components/MovieGrid/MovieGrid.tsx
import React from "react";
import type { Movie } from "../../types/movie";
import { BASE_IMAGE_PATH } from "../../constants";

interface MovieGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieSelect }) => {
  const handleKeyDown = (event: React.KeyboardEvent, movie: Movie) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onMovieSelect(movie);
    }
  };

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => onMovieSelect(movie)}
          onKeyDown={(e) => handleKeyDown(e, movie)}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${movie.title}`}
        >
          <img
            src={
              movie.poster_path
                ? `${BASE_IMAGE_PATH}${movie.poster_path}`
                : "/placeholder.jpg"
            }
            alt={movie.title}
            className="movie-poster"
          />
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
