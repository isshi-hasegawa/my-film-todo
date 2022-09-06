import { HStack, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getWatchProviders, WatchProvider } from 'src/api/tmdbApi'

type Props = {
  id: number
}

const WatchProviders = ({ id }: Props) => {
  const [watchProviders, setWatchProviders] = useState<WatchProvider[]>([])
  const [isPurchasableInAppleItunes, setIsPurchasableInAppleItunes] =
    useState<boolean>(false)

  useEffect(() => {
    const fetchWatchProviders = async () => {
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
    }

    fetchWatchProviders()
  }, [id])

  return (
    <HStack>
      {watchProviders.map((provider) => (
        <Image
          key={provider.provider_id}
          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
          alt="logo"
          borderRadius={50}
          boxSize={50}
        />
      ))}
      {isPurchasableInAppleItunes && (
        <Image
          src={`https://image.tmdb.org/t/p/original/peURlLlr8jggOwK53fJ5wdQl05y.jpg`}
          alt="logo"
          borderRadius={50}
          boxSize={50}
        />
      )}
    </HStack>
  )
}

export default WatchProviders
