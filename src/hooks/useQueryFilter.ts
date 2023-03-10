/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useQuery } from "react-query";
import { APIResponse } from "../types/responses_types";
import { getPopularData, seachData } from "../services/api_services";
import { IPaginatedHook } from "./useMoviesPaginated";

export interface IQueryFilerHook extends IPaginatedHook {
  currentPage: number;
  serverPage: number;
}

const useQueryFilter = ({
  search = "",
  serverPage = 1,
  currentPage = 1,
  type = "movie",
}: IQueryFilerHook) => {
  if (search && search.length > 0) {
    return useQuery<APIResponse>(
      [`search${type}:${serverPage}:${currentPage}:${search}`, serverPage],
      () => seachData({ type, search, pageParam: serverPage }),
      {
        keepPreviousData: true,
      }
    );
  }

  return useQuery<APIResponse>(
    [`${type}s:${serverPage}:${currentPage}`, serverPage],
    () => getPopularData({ pageParam: serverPage, type }),
    {
      keepPreviousData: true,
    }
  );
};

export default useQueryFilter;
