import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { theme } from 'src/theme/theme'

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
