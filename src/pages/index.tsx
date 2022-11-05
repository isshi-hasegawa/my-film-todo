import { Flex, Grid } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import About from 'src/components/about'
import Footer from 'src/components/footer'
import Header from 'src/components/header'
import Search from 'src/components/search'
import Tasks from 'src/components/tasks'
import { useIsShowSearchState } from 'src/hooks/useIsShowSearchState'

const Home: NextPage = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])

  const { isShowSearch } = useIsShowSearchState()

  return (
    <>
      <Head>
        <title>俺の映画リスト</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {!session ? (
        <Flex direction="column" minH="100vh">
          <About />
          <Footer />
        </Flex>
      ) : (
        <Flex direction="column" minH="100vh">
          <Header />
          <Grid placeItems="center" py="72px" flex={1}>
            {!isShowSearch ? <Tasks /> : <Search />}
          </Grid>
          <Footer />
        </Flex>
      )}
    </>
  )
}

export default Home
