import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Pagination from "../components/Pagination";
import Cards from "../components/Cards";
import { Total_Length } from "../constant/const";
import useMoviesPaginated from "../hooks/useMoviesPaginated";
import { APIResponse, Result } from "../models/responses_types";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTopRatedSeries,
} from "../services/moviesServices";
import Search from "../components/Search";

const recordPerPage = 10;
function Series() {
  const navigate = useNavigate();
  const [seriesList, setSeriesList] = useState<Result[]>([]);
  let [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const {
    isLoading,
    isError,
    data: topRatedSeries,
  } = useQuery<APIResponse>("topRatedSeries", () => getTopRatedSeries(1, 5), {
    keepPreviousData: true,
  });

  const {
    firstSlice,
    secondSlice,
    isLoading: isSeriessLoading,
    currentPage,
    setCurrentPage,
  } = useMoviesPaginated({ search, type: "tv" });

  useEffect(() => {
    if (currentPage % 2 === 1) setSeriesList(firstSlice);
    else {
      setSeriesList(secondSlice);
    }
  }, [firstSlice, secondSlice, currentPage]);

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Logo />
        <h2 className="text-white">Error accured , please try again </h2>
      </div>
    );

  const handleClick = (id: number) => {
    navigate("/series/" + id);
  };
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    // add debouncing
    if (searchRef !== null) {
      searchRef.current!.value = e.currentTarget.value;
    }
    setTimeout(() => {
      setSearch(searchRef.current!.value);
    }, 800);
  };

  return isLoading || isSeriessLoading ? (
    <div className="flex flex-col items-center justify-center flex-1">
      <Logo />
      <h2 className="text-white">Loading ... </h2>
    </div>
  ) : (
    <div className="m-4 ">
      <Search searchRef={searchRef} handleSearch={handleSearch} />

      {/* Trending Movies   */}

      {topRatedSeries?.results.length === 0 ? (
        <h1 className="text-center text-white">
          there is no data , please try after minute
        </h1>
      ) : (
        <Cards data={topRatedSeries?.results} title="Top Rated series" />
      )}

      <br />
      <br />
      <br />
      <div className="flex flex-col items-center justify-between gap-2 mb-5 text-center md:flex-row ">
        <h2 className="font-bold text-white ">All Series</h2>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={Math.floor(Total_Length / recordPerPage)}
        />
      </div>
      {
        <div className="flex flex-col flex-wrap items-center gap-2 md:flex-row md:justify-evenly">
          {seriesList.map((sr: Result) => (
            <Card size="sm" key={sr.id} {...sr} handleClickCard={handleClick} />
          ))}
        </div>
      }
    </div>
  );
}

export default Series;
