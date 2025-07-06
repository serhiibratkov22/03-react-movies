// src/components/MovieModal/MovieModal.tsx
import React, { useEffect } from "react";
import type { Movie } from "../../types/movie";
import { BASE_IMAGE_PATH } from "../../constants";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>

        <div className="modal-body">
          <img
            src={
              movie.poster_path
                ? `${BASE_IMAGE_PATH}${movie.poster_path}`
                : "/placeholder.jpg"
            }
            alt={movie.title}
            className="modal-poster"
          />

          <div className="modal-info">
            <h2 id="modal-title">{movie.title}</h2>
            <p className="modal-overview">{movie.overview}</p>
            <div className="modal-details">
              <p>
                <strong>Release Date:</strong> {movie.release_date || "N/A"}
              </p>
              <p>
                <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
              </p>
              <p>
                <strong>Votes:</strong> {movie.vote_count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
