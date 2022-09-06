import { MovieDb } from "moviedb-promise";
import {
  MovieImagesResponse,
  MovieResponse,
  MovieResultsResponse,
  WatchProviderResponse,
} from "moviedb-promise/dist/request-types";

export type WatchProvider = {
  display_priority?: number;
  logo_path?: string;
  provider_id?: number;
  provider_name?: string;
};

const moviedb = new MovieDb(process.env.NEXT_PUBLIC_TMDB_API_KEY as string);

export async function getMovieData(id: number): Promise<MovieResponse> {
  return await moviedb.movieInfo({ id });
}

export async function getMovieImages(id: number): Promise<MovieImagesResponse> {
  return await moviedb.movieImages({ id });
}

export const searchMovie = async (
  name: string
): Promise<MovieResultsResponse> => {
  return await moviedb.searchMovie({
    query: name,
    include_adult: false,
    language: "ja-JP",
  });
};

export const getWatchProviders = async (
  id: number
): Promise<WatchProviderResponse> => {
  return await moviedb.movieWatchProviders({ id });
};
