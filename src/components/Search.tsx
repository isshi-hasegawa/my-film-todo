import {
  Grid,
  HStack,
  IconButton,
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
import { getMovieData, searchMovie } from 'src/api/tmdbApi'
import { FiPlusCircle } from 'react-icons/fi'
import WatchProviders from 'src/components/WatchProviders'
import { createTask } from 'src/api/tasksApi'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { taskListIdState } from 'src/states/taskListIdState'

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
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const [keyword, setKeyword] = useState<string>('')
  const [taskListId] = useRecoilState<string>(taskListIdState)
  const toast = useToast()

  const fetchSearchResults = async () => {
    const response = await searchMovie(keyword)
    return response.results as MovieResult[]
  }

  const { data: searchResults, isFetching } = useQuery<MovieResult[]>(
    ['searchResults', keyword],
    fetchSearchResults
  )

  const { mutate: createTaskMutate, isLoading } = useMutation(
    (resultId: number) => mutateCreateTask(resultId),
    {
      onSuccess: () =>
        toast({
          title: 'タスクを登録しました！',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        }),
    }
  )

  const mutateCreateTask = async (id: number) => {
    const response = await getMovieData(id, 'watch/providers')
    const title = response.title
    let notes: string = ''
    response['watch/providers']?.results?.JP?.flatrate?.map((provider) => {
      if (provider.provider_name === 'Netflix')
        notes = notes.concat('Netflix', ' ')
      if (provider.provider_name === 'Amazon Prime Video')
        notes = notes.concat('Amazon Prime Video', ' ')
      if (provider.provider_name === 'Disney Plus')
        notes = notes.concat('Disney+', ' ')
    })
    notes = notes.concat(`${response.runtime}分`)

    await createTask(
      {
        taskListId,
        title,
        notes,
      },
      token
    )
  }

  return (
    <>
      <Input
        id="field"
        color="secondary"
        variant="flushed"
        placeholder="タイトルを入力してください"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Grid py={5}>
        {isFetching ? (
          <Spinner size="xl" placeItems="center" />
        ) : (
          <VStack {...vStackProps}>
            {isLoading ? (
              <Spinner size="xl" />
            ) : (
              searchResults?.map((result) => (
                <HStack
                  key={result.id}
                  onClick={() => createTaskMutate(result.id!)}
                >
                  <IconButton
                    icon={<FiPlusCircle />}
                    isRound
                    aria-label="Add Button"
                  />
                  {result.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                      alt="poster"
                      width={{ base: '45px', sm: '60px', md: '150px' }}
                      height={{ base: '63px', sm: '84px', md: '210px' }}
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
              ))
            )}
          </VStack>
        )}
      </Grid>
    </>
  )
}

export default Search
