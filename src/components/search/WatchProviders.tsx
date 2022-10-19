import { HStack, Image } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getWatchProviders } from 'src/api/tmdbApi'
import { WatchProvider } from 'src/types/tmdb'

const WatchProviders = ({ id }: { id: number }) => {
  const fetchWatchProviders = async () => {
    const response = await getWatchProviders(id)

    const myWatchProviders = response.results!.JP!.flatrate!.filter(
      (provider) =>
        provider.provider_name === 'Netflix' ||
        provider.provider_name === 'Amazon Prime Video' ||
        provider.provider_name === 'Disney Plus'
    )
    const appleItunes = response.results!.JP!.buy!.filter(
      (provider) => provider.provider_name === 'Apple iTunes'
    )

    return [...myWatchProviders, ...appleItunes]
  }

  const { data: watchProviders } = useQuery<WatchProvider[]>(
    ['watchProviders', id],
    fetchWatchProviders
  )

  return (
    <HStack boxSizing="border-box">
      {watchProviders?.map((provider) => (
        <Image
          key={provider.provider_id}
          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
          alt="logo"
          borderRadius={50}
          boxSize={{ base: '20px', sm: '25px', md: '50px' }}
        />
      ))}
    </HStack>
  )
}

export default WatchProviders
