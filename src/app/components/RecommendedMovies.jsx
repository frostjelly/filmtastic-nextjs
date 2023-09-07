"use client";

import { useParams } from "next/navigation";
import MovieList from "./MovieList";

const RecommendedMovies = () => {
  const { id } = useParams();

  const storedMovieList = localStorage.getItem("movieList");
  const movieList = JSON.parse(storedMovieList);
  const recommenedMovies = movieList?.Search.filter(
    movie => movie.imdbID !== id
    // && movie.Poster !== "N/A"
  );
  return (
    <>
      {recommenedMovies?.length > 1 && (
        <div className="flex flex-col sm:mt-6 mr-2 space-y-4 sm:space-y-6">
          <h2 className="self-center font-bold text-3xl">Recommended Movies</h2>
          <MovieList movieListRef={recommenedMovies} />
        </div>
      )}
    </>
  );
};

export default RecommendedMovies;
