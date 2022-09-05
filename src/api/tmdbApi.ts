import { MovieDb } from "moviedb-promise";
import {
  MovieImagesResponse,
  MovieResponse,
  MovieResultsResponse,
  WatchProviderResponse,
} from "moviedb-promise/dist/request-types";

const moviedb = new MovieDb(process.env.TMDB_API_KEY as string);

export async function getMovieData(id: number): Promise<MovieResponse> {
  return await moviedb.movieInfo({ id });
}

export async function getWatchProviders(
  id: number
): Promise<WatchProviderResponse> {
  return await moviedb.movieWatchProviders({ id });
}

export async function getMovieImages(id: number): Promise<MovieImagesResponse> {
  return await moviedb.movieImages({ id });
}

export const searchMovie = async (
  name: string
): Promise<MovieResultsResponse> => {
  return await moviedb.searchMovie({ query: name, language: "ja-JP" });
};
