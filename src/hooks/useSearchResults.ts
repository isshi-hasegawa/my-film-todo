import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCustomToast } from 'src/hooks/useCustomToast'
import { useKeywordState } from 'src/hooks/useKeywordState'
import { useCreateTask } from 'src/hooks/useCreateTask'
import { searchMovie } from 'src/api/tmdbApi'
import { MovieResult } from 'moviedb-promise'

export const useSearchResults = () => {
  const customToast = useCustomToast()
  const { keyword } = useKeywordState()
  const { createTaskWithSearchResult } = useCreateTask()

  const fetchSearchResults = async () => {
    const response = await searchMovie(keyword)
    return response.results as MovieResult[]
  }

  const { data: searchResults, isFetching } = useQuery<MovieResult[]>(
    ['searchResults', keyword],
    fetchSearchResults
  )

  const queryClient = useQueryClient()

  const { mutate: createTaskMutate } = useMutation(
    (id: number) => createTaskWithSearchResult(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['taskLists'])
        customToast('タスクを登録しました！', 'success')
      },
      onError: () => customToast('タスクの登録に失敗しました…', 'error'),
    }
  )

  return { searchResults, isFetching, createTaskMutate }
}
