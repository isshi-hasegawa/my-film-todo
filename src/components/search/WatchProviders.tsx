import { HStack, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getWatchProviders } from 'src/api/tmdbApi'
import { WatchProvider } from 'src/types/tmdb'

const WatchProviders = ({ id }: { id: number }) => {
  const [watchProviders, setWatchProviders] = useState<WatchProvider[]>([])
  const [isPurchasableInAppleItunes, setIsPurchasableInAppleItunes] =
    useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const response = await getWatchProviders(id)
      if (response.results?.JP?.flatrate) {
        const mySubscribedWatchProviders =
          response.results?.JP?.flatrate.filter(
            (provider) =>
              provider.provider_name === 'Netflix' ||
              provider.provider_name === 'Amazon Prime Video' ||
              provider.provider_name === 'Disney Plus'
          )
        setWatchProviders(mySubscribedWatchProviders)
      }
      const appleItunes = response.results?.JP?.buy?.find(
        (provider) => provider.provider_name === 'Apple iTunes'
      )
      if (appleItunes) setIsPurchasableInAppleItunes(true)
    })()
  }, [id])

  return (
    <HStack>
      {watchProviders?.map((provider) => (
        <Image
          key={provider.provider_id}
          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
          alt="logo"
          borderRadius={50}
          boxSize={{ base: '40px', sm: '40px', md: '60px' }}
        />
      ))}
      {isPurchasableInAppleItunes && (
        <Image
          src={`https://image.tmdb.org/t/p/original/peURlLlr8jggOwK53fJ5wdQl05y.jpg`}
          alt="logo"
          borderRadius={50}
          boxSize={{ base: '40px', sm: '40px', md: '60px' }}
        />
      )}
    </HStack>
  )
}
export default WatchProviders
