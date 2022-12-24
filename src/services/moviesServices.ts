import axios from "axios";
import { API_URL, AUTH_TOKEN } from "../constant/const";
import { APIResponse } from "../models/responses_types";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Authorization"] = `bearer ${AUTH_TOKEN}`;

export const getPopularMovies = async (pageParam = 1, resultLength = 0) => {
  // 1 ---> 1
  //2  ---< 1
  // 3 ---> 2

  // 5 ---> 3

  const result = await axios(`/movie/popular?page=${pageParam}`);
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

export default { getPopularMovies, getPopularSeries };
