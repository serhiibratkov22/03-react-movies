import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import type { Movie } from "../../types/movie.ts";
import { fetchMovies } from "../../services/movieService.ts";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const handleSubmit = (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(null);

    fetchMovies(query)
      .then((data: { results: Movie[] }) => {
        if (!data.results.length) {
          toast.error("No movies found for your request");
        }
        setMovies(data.results);
      })
      .catch((e: Error) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  };

  function onSelect(movie: Movie): void {
    setCurrentMovie(movie);
  }

  function onClose() {
    setCurrentMovie(null);
  }

  if (error) {
    return (
      <>
        <SearchBar onSubmit={handleSubmit} />
        {loading ? <Loader /> : <ErrorMessage message={error} />}
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onMovieSelect={onSelect} />
      )}
      {currentMovie && <MovieModal movie={currentMovie} onClose={onClose} />}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
