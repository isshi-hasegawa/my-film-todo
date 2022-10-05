import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Button, Grid, Heading, Spinner } from '@chakra-ui/react'
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
        <>
          <Header />
          {!isShowSearch ? (
            <Grid placeItems="center" px="1rem" py="72px">
              <Button my={4} onClick={() => setIsShowSearch(true)}>
                タスクを登録する
              </Button>
              <Tasks />
            </Grid>
          ) : (
            <Grid placeItems="center" px="3rem" py="72px">
              <Search />
            </Grid>
          )}
          <Footer />
        </>
      )}
    </>
  )
}

export default Home
