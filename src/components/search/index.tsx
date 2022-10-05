import {
  Grid,
  HStack,
  Image,
  Input,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { MovieResult } from 'moviedb-promise/dist/request-types'
import { useState } from 'react'
import { searchMovie } from 'src/api/tmdbApi'
import WatchProviders from 'src/components/search/WatchProviders'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTasks } from 'src/hooks/tasks'

const vStackProps = {
  p: '4',
  w: '100%',
  maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
  borderColor: 'gray.200',
  borderWidth: '2px',
  borderRadius: 'lg',
  alignItems: 'stretch',
  divider: <StackDivider />,
  bgColor: 'gray.100',
  cursor: 'pointer',
}

const Search = () => {
  const [keyword, setKeyword] = useState<string>('')
  const toast = useToast()
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
      onSuccess: () =>
        toast({
          title: 'タスクを登録しました！',
          status: 'success',
          duration: 3000,
          position: 'bottom-left',
        }),
      onError: () =>
        toast({
          title: 'タスクの登録に失敗しました…',
          status: 'error',
          duration: 3000,
          position: 'bottom-left',
        }),
    }
  )

  return (
    <>
      <Input
        id="field"
        color="secondary"
        variant="flushed"
        placeholder="タイトルを入力してください"
        onChange={(e) => setKeyword(e.target.value)}
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
      />

      <Grid py={5}>
        {isFetching && <Spinner size="xl" placeItems="center" />}
        {keyword === '' ? null : (
          <VStack {...vStackProps}>
            {searchResults?.map((result) => (
              <HStack
                key={result.id}
                onClick={() => createTaskMutate(result.id!)}
                _hover={{ bg: 'gray.200' }}
              >
                {result.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                    alt="poster"
                    width={{ base: '60px', sm: '60px', md: '150px' }}
                    height={{ base: '84px', sm: '84px', md: '210px' }}
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
        )}
      </Grid>
    </>
  )
}

export default Search
