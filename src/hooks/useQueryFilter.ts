/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useQuery } from "react-query";
import { APIResponse } from "../models/responses_types";
import { getPopularMovies, seachMovies } from "../services/moviesServices";

const useQueryFilter = (search = "", serverPage = 1, currentPage = 1) => {
  if (search && search.length > 0) {
    return useQuery<APIResponse>(
      [`searchMovies:${serverPage}:${currentPage}:${search}`, serverPage],
      () => seachMovies(search, serverPage),
      {
        keepPreviousData: true,
      }
    );
  }

  return useQuery<APIResponse>(
    [`movies:${serverPage}:${currentPage}`, serverPage],
    () => getPopularMovies(serverPage),
    {
      keepPreviousData: true,
    }
  );
};

export default useQueryFilter;
