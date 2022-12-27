import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Pagination from "../components/Pagination";
import Cards from "../components/Cards";
import { Total_Length } from "../constant/const";
import useDataPaginated from "../hooks/useMoviesPaginated";
import { APIResponse, Result } from "../types/responses_types";
import { getPopularData, getTopRatedMovies } from "../services/api_services";
import Search from "../components/Search";

const recordPerPage = 10;
function Movies() {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState<Result[]>([]);
  let [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const {
    isLoading,
    isError,
    data: topRatedMovies,
  } = useQuery<APIResponse>("topRatedMovies", () => getTopRatedMovies(1, 5), {
    keepPreviousData: true,
  });

  const {
    firstSlice,
    secondSlice,
    isLoading: isMoviesLoading,
    currentPage,
    setCurrentPage,
  } = useDataPaginated({ search });

  useEffect(() => {
    if (currentPage % 2 === 1) setMoviesList(firstSlice);
    else {
      setMoviesList(secondSlice);
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
    navigate("/movies/" + id);
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

  return isLoading || isMoviesLoading ? (
    <div className="flex flex-col items-center justify-center flex-1">
      <Logo />
      <h2 className="text-white">Loading ... </h2>
    </div>
  ) : (
    <div className="m-4 ">
      <Search searchRef={searchRef} handleSearch={handleSearch} />

      {/* Trending Movies   */}

      {topRatedMovies?.results.length === 0 ? (
        <h1 className="text-center text-white">
          there is no data , please try after minute
        </h1>
      ) : (
        <Cards data={topRatedMovies?.results} title="Top Rated movies" />
      )}

      <br />
      <br />
      <br />
      <div className="flex flex-col items-center justify-between gap-2 mb-5 text-center md:flex-row">
        <h2 className="font-bold text-white ">All Movies</h2>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={Math.floor(Total_Length / recordPerPage)}
        />
      </div>
      {
        <div className="flex flex-col flex-wrap items-center gap-4 md:flex-row md:justify-evenly">
          {moviesList.map((mv: Result) => (
            <Card size="sm" key={mv.id} {...mv} handleClickCard={handleClick} />
          ))}
        </div>
      }
    </div>
  );
}

export default Movies;
