import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Pagination from "../components/Pagination";
import Trending from "../components/Trending";
import { Total_Length } from "../constant/const";
import useMoviesPaginated from "../hooks/useMoviesPaginated";
import { APIResponse, Result } from "../models/responses_types";
import {
  getPopularMovies,
  getTopRatedMovies,
} from "../services/moviesServices";

const recordPerPage = 10;
function Movies() {
  const [moviesList, setMoviesList] = useState<Result[]>([]);

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
  } = useMoviesPaginated();

  // const [moviesList, setMoviesList] = useState<Result[]>();

  // useEffect(() => {
  //   if (data?.results) {
  //     console.log("🚀 ~ file: Movies.tsx:36 ~ useEffect ~ data", data);
  //     let newData = [...data?.results];
  //     setMoviesList(newData.slice(0, 10));
  //     setFirstSlice(newData.slice(0, 10));
  //     setSecondSlice(newData.slice(10));
  //   }
  // }, [data]);

  // useEffect(() => {
  //   let expectedServerPage = currentPage % 2;

  //   if (
  //     expectedServerPage === 1 &&
  //     currentPage > 2 &&
  //     currentPage > serverPage
  //   ) {
  //     console.log("this is new page to call from backend ");
  //     setServerPage(serverPage + 1);
  //   } else {
  //     console.log("this is next slide  to call from frontend  ");
  //     // it is one of the two slices
  //     // 1 - 2
  //     // 3 - 4
  //     // 5 - 6
  //     if (currentPage % 2 === 1) {
  //       setMoviesList(firstSlice);
  //       console.log(
  //         "🚀 ~ file: Movies.tsx:67 ~ useEffect ~ firstSlice",
  //         firstSlice
  //       );
  //     } else {
  //       setMoviesList(secondSlice);
  //       console.log(
  //         "🚀 ~ file: Movies.tsx:69 ~ useEffect ~ secondSlice",
  //         secondSlice
  //       );
  //     }
  //   }
  // }, [currentPage]);

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

  const handleClick = (id: number) => {};
  return isLoading || isMoviesLoading ? (
    <div className="flex flex-col items-center justify-center flex-1">
      <Logo />
      <h2 className="text-white">Loading ... </h2>
    </div>
  ) : (
    <div className="m-4 ">
      {/* Trending Movies   */}

      {topRatedMovies?.results.length === 0 ? (
        <h1 className="text-center text-white">
          there is no data , please try after minute
        </h1>
      ) : (
        <Trending data={topRatedMovies?.results} title="movies" />
      )}

      <br />
      <br />
      <br />
      <div className="flex items-center justify-between mb-2 text-center ">
        <h2 className="font-bold text-white ">All Movies</h2>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={Math.floor(Total_Length / recordPerPage)}
        />
      </div>
      {
        <div className="flex flex-col flex-wrap items-center gap-2 md:flex-row md:justify-evenly">
          {moviesList.map((mv: Result) => (
            <Card size="sm" key={mv.id} {...mv} handleClickCard={handleClick} />
          ))}
        </div>
      }
    </div>
  );
}

export default Movies;
