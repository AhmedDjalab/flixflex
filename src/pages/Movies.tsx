import React from "react";
import { useQuery } from "react-query";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Trending from "../components/Trending";
import { APIResponse, Result } from "../models/responses_types";
import {
  getPopularMovies,
  getTopRatedMovies,
} from "../services/moviesServices";

function Movies() {
  const {
    isLoading,
    isError,
    data: topRatedMovies,
  } = useQuery<APIResponse>("topRatedMovies", () => getTopRatedMovies(1));
  const {
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    data: moviesList,
  } = useQuery<APIResponse>("movies", () => getPopularMovies(1));

  const { total_pages, total_results, page } = moviesList!;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Logo />
        <h2 className="text-white">Error accured , please try again </h2>
      </div>
    );

  const handleClick = (id: number) => {};
  return isLoading ? (
    <div className="flex flex-col items-center justify-center flex-1">
      <Logo />
      <h2 className="text-white">Loading ... </h2>
    </div>
  ) : (
    <div className="m-4 ">
      {/* Trending Movies   */}
      <Trending data={topRatedMovies?.results.splice(0, 5)} title="movies" />
      <br />
      <br />
      <br />
      <h2 className="mb-2 font-bold text-white ">All Movies</h2>
      <div className="flex flex-col flex-wrap items-center gap-2 md:flex-row md:justify-evenly">
        {moviesList?.results.map((mv: Result) => (
          <Card size="sm" key={mv.id} {...mv} handleClickCard={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
