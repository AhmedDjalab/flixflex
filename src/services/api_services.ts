import axios from "axios";
import { API_URL, AUTH_TOKEN } from "../constant/const";
import { Movie } from "../types/movie";
import { APIResponse, Result } from "../types/responses_types";
import { Serie } from "../types/serie";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Authorization"] = `bearer ${AUTH_TOKEN}`;

export interface ISearchProps {
  type?: "movie" | "tv";
  search?: string;
  pageParam?: number;
  resultLength?: number;
}

export interface IDetailedProps {
  id: string;
  type?: "movie" | "tv";
}

export const getPopularData = async ({
  pageParam = 1,
  resultLength = 0,
  type = "movie",
}: ISearchProps) => {
  const result = await axios(`/${type}/popular?page=${pageParam}`);
  if (resultLength === 0) return result.data;
  const data = result.data as APIResponse;
  data.results = [...data.results.slice(0, resultLength)];
  return data;
};
export const seachData = async ({
  type = "movie",
  search = "",
  pageParam = 1,
  resultLength = 0,
}: ISearchProps) => {
  const result = await axios(
    `/search/${type}?query=${search}&page=${pageParam}`
  );
  if (resultLength === 0) return result.data;
  const data = result.data as APIResponse;
  data.results = [...data.results.slice(0, resultLength)];
  return data;
};

export const getPopularSeries = async (pageParam = 1, resultLength = 0) => {
  const result = await axios(`/tv/popular?page=${pageParam}`);
  if (resultLength === 0) return result.data;
  const data = result.data as APIResponse;
  data.results = [...data.results.slice(0, resultLength)];
  return data;
};

export const getTopRatedMovies = async (pageParam = 1, resultLength = 0) => {
  const result = await axios(`/movie/top_rated?page=${pageParam}`);
  if (resultLength === 0) return result.data;
  const data = result.data as APIResponse;
  data.results = [...data.results.slice(0, resultLength)];
  return data;
};
export const getTopRatedSeries = async (pageParam = 1, resultLength = 0) => {
  const result = await axios(`/tv/top_rated?page=${pageParam}`);
  if (resultLength === 0) return result.data;
  const data = result.data as APIResponse;
  data.results = [...data.results.slice(0, resultLength)];
  return data;
};
export const getDetails = async <T>({ id, type = "movie" }: IDetailedProps) => {
  const result = await axios(`/${type}/${id}?append_to_response=videos`);

  const data = result.data as T;

  return data;
};

export default {
  getPopularData,
  getPopularSeries,
  seachData,
};
