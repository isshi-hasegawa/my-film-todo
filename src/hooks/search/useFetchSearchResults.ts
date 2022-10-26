import { useQuery } from '@tanstack/react-query'
import { MovieResult } from 'moviedb-promise'
import { searchMovie } from 'src/api/tmdbApi'
import { useKeywordState } from 'src/hooks/useKeywordState'

export const useFetchSearchResults = () => {
  const { keyword } = useKeywordState()

  const fetchSearchResults = async () => {
    const response = await searchMovie(keyword)
    return response.results as MovieResult[]
  }

  return useQuery<MovieResult[], Error>(
    ['searchResults', keyword],
    fetchSearchResults
  )
}
