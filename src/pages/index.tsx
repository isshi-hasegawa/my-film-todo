import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Box, Button, Flex, Grid, Heading, Spinner } from '@chakra-ui/react'
import SignIn from './auth/signin'
import Header from 'src/components/header'
import Tasks from 'src/components/tasks'
import Search from 'src/components/search'
import { useIsShowSearchState } from 'src/hooks/isShowSearchState'
import Footer from 'src/components/footer'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { isShowSearch, setIsShowSearch } = useIsShowSearchState()

  if (status === 'loading')
    return (
      <Grid h="100vh" placeItems="center" px="5rem">
        <Spinner size="xl" />
      </Grid>
    )

  return (
    <>
      {!session ? (
        <Grid h="100vh" placeItems="center" px="5rem">
          <Heading>ログインしてください</Heading>
          <SignIn />
        </Grid>
      ) : (
        <Flex direction="column" minH="100vh">
          <Header />
          <Grid placeItems="center" px="1rem" py="72px" flex={1}>
            {!isShowSearch ? (
              <>
                <Button my={4} onClick={() => setIsShowSearch(true)}>
                  タスクを登録する
                </Button>
                <Tasks />
              </>
            ) : (
              <Search />
            )}
          </Grid>
          <Footer />
        </Flex>
      )}
    </>
  )
}

export default Home
