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
import { useKeywordState } from 'src/hooks/useKeywordState'
import SearchInput from 'src/components/search/SearchInput'
import WatchProviders from 'src/components/search/WatchProviders'
import { useSearchResults } from 'src/hooks/useSearchResults'

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
  const { keyword } = useKeywordState()
  const { searchResults, isFetching, createTaskMutate } = useSearchResults()

  return (
    <>
      <SearchInput />

      <br />
      <Text>登録したい作品をクリックしてください</Text>
      <br />

      {!keyword.length ? null : isFetching ? (
        <Spinner size="xl" placeItems="center" />
      ) : (
        <Grid py={5}>
          <VStack {...vStackProps} data-testid="search-results">
            {searchResults?.map((result) => (
              <HStack
                data-testid="search-result"
                key={result.id}
                onClick={() => createTaskMutate(result.id!)}
                _hover={{ bg: 'gray.300' }}
                p={5}
                cursor="pointer"
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
        </Grid>
      )}
    </>
  )
}

export default Search
