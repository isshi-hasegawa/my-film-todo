import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'silver',
        color: 'gray.900',
      },
      html: {
        height: '100%',
      },
    },
  },
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={session}>
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
