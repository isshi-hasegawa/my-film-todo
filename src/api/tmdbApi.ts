import { MovieDb } from 'moviedb-promise'
import {
  MovieResultsResponse,
  WatchProviderResponse,
} from 'moviedb-promise/dist/request-types'
import { appendedMovieResponse } from 'src/types/tmdb'

const moviedb = new MovieDb(process.env.NEXT_PUBLIC_TMDB_API_KEY as string)

export const getMovieData = async (
  id: number,
  append_to_response?: string
): Promise<appendedMovieResponse> => {
  return await moviedb.movieInfo({ id, language: 'ja-JP', append_to_response })
}

export const searchMovie = async (
  name: string
): Promise<MovieResultsResponse> => {
  return await moviedb.searchMovie({
    query: name,
    include_adult: false,
    language: 'ja-JP',
  })
}

export const getWatchProviders = async (
  id: number
): Promise<WatchProviderResponse> => {
  return await moviedb.movieWatchProviders({ id })
}
