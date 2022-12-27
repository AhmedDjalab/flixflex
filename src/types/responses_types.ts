export interface APIResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: OriginalLanguage;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  title: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: Date;
  release_date: Date;
  vote_average: number;
  vote_count: number;
  origin_country: OriginCountry[];
}

export enum MediaType {
  Tv = "tv",
  All = "all",
  Movie = "movie",
}

export enum OriginCountry {
  De = "DE",
  GB = "GB",
  Jp = "JP",
  Us = "US",
}

export enum OriginalLanguage {
  De = "de",
  En = "en",
  Ja = "ja",
}
