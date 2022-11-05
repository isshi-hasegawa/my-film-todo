import {
  Grid,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import SearchInput from 'src/components/search/SearchInput'
import WatchProviders from 'src/components/search/WatchProviders'
import { useCreateTask } from 'src/hooks/search/useCreateTask'
import { useFetchSearchResults } from 'src/hooks/search/useFetchSearchResults'
import { useKeywordState } from 'src/hooks/useKeywordState'

const vStackProps = {
  p: '4',
  maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
  borderRadius: 'lg',
  alignItems: 'stretch',
  bgColor: 'whiteAlpha.700',
}

const Search = () => {
  const { keyword } = useKeywordState()
  const { data: searchResults, isFetching } = useFetchSearchResults()
  const { mutate: createTask } = useCreateTask()

  return (
    <>
      <SearchInput />

      {!keyword.length ? null : isFetching ? (
        <Spinner size="xl" placeItems="center" />
      ) : (
        <Grid py={5}>
          <Text my={5} textAlign="center" color="whiteAlpha.700">
            登録したい作品をクリックしてください
          </Text>
          <VStack {...vStackProps} data-testid="search-results">
            {searchResults?.map((result) => (
              <HStack
                data-testid="search-result"
                key={result.id}
                onClick={() => createTask(result.id!)}
                _hover={{ bg: 'whiteAlpha.700' }}
                p={5}
                cursor="pointer"
              >
                {result.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                    alt="poster"
                    width={{ base: '120px', sm: '120px', md: '150px' }}
                    height={{ base: '168px', sm: '168px', md: '210px' }}
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
        </Grid>
      )}
    </>
  )
}

export default Search
