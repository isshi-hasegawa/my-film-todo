import { HStack, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getWatchProviders } from 'src/api/tmdbApi'
import { WatchProvider } from 'src/types/tmdb'

type Props = {
  id: number
}

const WatchProviders = ({ id }: Props) => {
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
    <HStack boxSizing="border-box">
      {watchProviders.map((provider) => (
        <Image
          key={provider.provider_id}
          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
          alt="logo"
          borderRadius={50}
          boxSize={{ base: '15px', sm: '25px', md: '50px' }}
        />
      ))}
      {isPurchasableInAppleItunes && (
        <Image
          src={`https://image.tmdb.org/t/p/original/peURlLlr8jggOwK53fJ5wdQl05y.jpg`}
          alt="logo"
          borderRadius={50}
          boxSize={{ base: '15px', sm: '25px', md: '50px' }}
        />
      )}
    </HStack>
  )
}

export default WatchProviders
