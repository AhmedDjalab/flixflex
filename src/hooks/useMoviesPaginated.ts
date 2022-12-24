import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { APIResponse, Result } from "../models/responses_types";
import { getPopularMovies } from "../services/moviesServices";

const useMoviesPaginated = () => {
  const [firstSlice, setFirstSlice] = useState<Result[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [serverPage, setServerPage] = useState(1);

  const [secondSlice, setSecondSlice] = useState<Result[]>([]);
  //! you will need this if you had a full primary access to TMDP API
  //! for now the maximum of free usage is 500 records
  // const [totalLength, setTotalLength] = useState<number>(0);

  const { isLoading, isError, data } = useQuery<APIResponse>(
    [`movies:${serverPage}:${currentPage}`, serverPage],
    () => getPopularMovies(serverPage),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (currentPage === 1) {
      setServerPage(1);
    } else {
      if (currentPage % 2 === 1) {
        setServerPage(Math.trunc(currentPage / 2) + 1);
      } else {
        setServerPage(currentPage / 2);
      }
    }
  }, [currentPage]);

  const getData = useCallback(() => {
    if (data?.results !== undefined) {
      let newData = [...data?.results];
      // setTotalLength(data.total_results);
      setFirstSlice(newData.slice(0, 10));
      setSecondSlice(newData.slice(10));
    }
  }, [data]);
  useEffect(() => {
    getData();
  }, [getData]);

  return {
    firstSlice,
    secondSlice,
    isLoading,
    isError,
    currentPage,
    setCurrentPage,
  };
};

export default useMoviesPaginated;
