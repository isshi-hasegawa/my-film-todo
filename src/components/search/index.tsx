import {
  Grid,
  HStack,
  Image,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { MovieResult } from 'moviedb-promise/dist/request-types'
import { searchMovie } from 'src/api/tmdbApi'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useKeywordState } from 'src/hooks/useKeywordState'
import { useTasks } from 'src/hooks/useTasks'
import { useCustomToast } from 'src/hooks/useCustomToast'
import SearchInput from 'src/components/search/SearchInput'
import WatchProviders from 'src/components/search/WatchProviders'

const vStackProps = {
  p: '4',
  w: '100%',
  maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
  borderColor: 'gray.200',
  borderWidth: '2px',
  borderRadius: 'lg',
  alignItems: 'stretch',
  divider: <StackDivider />,
}

const Search = () => {
  const customToast = useCustomToast()
  const { keyword } = useKeywordState()
  const { createTaskWithMovieInfo } = useTasks()

  const fetchSearchResults = async () => {
    const response = await searchMovie(keyword)
    return response.results as MovieResult[]
  }

  const { data: searchResults, isFetching } = useQuery<MovieResult[]>(
    ['searchResults', keyword],
    fetchSearchResults
  )

  const { mutate: createTaskMutate } = useMutation(
    (id: number) => createTaskWithMovieInfo(id),
    {
      onSuccess: () => customToast('タスクを登録しました！', 'success'),
      onError: () => customToast('タスクの登録に失敗しました…', 'error'),
    }
  )

  return (
    <>
      <SearchInput />

      <br />
      <Text>登録したい作品をクリックしてください</Text>
      <br />

      {isFetching ? (
        <Spinner size="xl" placeItems="center" />
      ) : (
        <Grid py={5}>
          {keyword === '' ? null : (
            <>
              <VStack {...vStackProps} data-testid="search-results">
                {searchResults?.map((result) => (
                  <HStack
                    key={result.id}
                    onClick={() => createTaskMutate(result.id!)}
                    _hover={{ bg: 'gray.300' }}
                    p={5}
                    cursor="pointer"
                    data-testid="search-result"
                  >
                    {result.poster_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                        alt="poster"
                        width={{ base: '75px', sm: '75px', md: '150px' }}
                        height={{ base: '95px', sm: '95px', md: '210px' }}
                      />
                    )}
                    <Stack>
                      <Text>{result.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {result.release_date?.substring(0, 4)}
                      </Text>
                      <WatchProviders id={result.id!} />
                    </Stack>
                  </HStack>
                ))}
              </VStack>
            </>
          )}
        </Grid>
      )}
    </>
  )
}

export default Search
