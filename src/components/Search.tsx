import {
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { MovieResult } from 'moviedb-promise/dist/request-types'
import { useEffect, useState } from 'react'
import { getMovieData, searchMovie } from 'src/api/tmdbApi'
import { FiPlusCircle } from 'react-icons/fi'
import WatchProviders from 'src/components/WatchProviders'
import { createTask } from 'src/api/tasksApi'
import { useSession } from 'next-auth/react'
import { CreateTaskParam } from 'src/types/tasks'

type Props = {
  selectedTaskListId: string
}

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

const buttonProps = {
  icon: <FiPlusCircle />,
  isRound: true,
  'aria-label': 'check',
}

const Search = ({ selectedTaskListId }: Props) => {
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const [keyword, setKeyword] = useState<string>('')
  const [searchResults, setSearchResults] = useState<MovieResult[]>([])

  useEffect(() => {
    if (keyword.length === 0) return

    const fetchSearchResults = async () => {
      const response = await searchMovie(keyword)
      setSearchResults(response.results as MovieResult[])
    }
    fetchSearchResults()
  }, [keyword])

  const createMovieTask = (id: number) => {
    const fetchMovieData = async () => {
      const response = await getMovieData(id, 'watch/providers')

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

      const params: CreateTaskParam = {
        taskListId: selectedTaskListId,
        title: response.title,
        notes,
      } as const

      await createTask(params, token)
    }

    fetchMovieData()
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
      {keyword && searchResults.length > 0 && (
        <VStack {...vStackProps} backgroundColor="gray.100">
          {searchResults.map((result) => (
            <HStack key={result.id} onClick={() => createMovieTask(result.id!)}>
              <IconButton {...buttonProps} />
              {result.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                  alt="poster"
                  width="150px"
                  height="210px"
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
    </>
  )
}

export default Search
