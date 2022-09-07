import { MovieResponse, WatchProviderResponse } from 'moviedb-promise'

export type appendedMovieResponse = {
  'watch/providers'?: WatchProviderResponse
} & Partial<MovieResponse>

export type WatchProvider = {
  display_priority?: number
  logo_path?: string
  provider_id?: number
  provider_name?: string
}
