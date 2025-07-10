import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie.ts";
import { BASE_IMAGE_PATH, SIZE } from "../../constants";

export interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    document.body.classList.add("hidden");

    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("hidden");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!movie) return null;

  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      className={css.backdrop}
      aria-labelledby="modal-title"
    >
      {/* overlay - acts as accessible backdrop button */}
      <div
        className={css.backdropOverlay}
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
      />

      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>
        <img
          src={`${BASE_IMAGE_PATH}${SIZE.original}${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2 id="modal-title">{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default MovieModal;
