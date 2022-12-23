import React, { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Trending from "../components/Trending";
import { API_URL } from "../constant/const";
import { APIResponse } from "../models/responses_types";
import { getPopularMovies, getPopularSeries } from "../services/moviesServices";

function Home() {
  const {
    isLoading,
    isError,
    data: movies,
  } = useQuery<APIResponse>("movies", () => getPopularMovies(1, 5));
  const {
    isLoading: isLoadingSeries,
    isError: isErrorSeries,
    data: series,
  } = useQuery<APIResponse>("series", () => getPopularSeries(1, 5));

  if (isError || isErrorSeries)
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Logo />
        <h2 className="text-white">Error accured , please try again </h2>
      </div>
    );

  return isLoading || isLoadingSeries ? (
    <div className="flex flex-col items-center justify-center flex-1">
      <Logo />
      <h2 className="text-white">Loading ... </h2>
    </div>
  ) : (
    <div className="m-4">
      {/* Trending Movies   */}
      <Trending data={movies?.results} title="movies" />
      {/* Trending Series*/}
      <Trending data={series?.results} title="series" />
    </div>
  );
}

export default Home;
