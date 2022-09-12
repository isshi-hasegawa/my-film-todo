import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Button, Grid, Heading, Spinner } from '@chakra-ui/react'
import SignIn from './auth/signin'
import Header from 'src/components/header'
import Tasks from 'src/components/tasks'
import Search from 'src/components/search'
import { useTaskListIdState } from 'src/hooks/taskListIdState'
import { useIsShowSearchState } from 'src/hooks/isShowSearchState'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { taskListId } = useTaskListIdState()
  const { isShowSearch, setIsShowSearch } = useIsShowSearchState()

  if (status === 'loading')
    return (
      <Grid h="100vh" placeItems="center" px="5rem">
        <Spinner size="xl" />
      </Grid>
    )

  return (
    <>
      {!session && (
        <Grid
          sx={{
            h: '100vh',
            placeItems: 'center',
            px: '5rem',
          }}
        >
          <Heading>ログインしてください</Heading>
          <SignIn />
        </Grid>
      )}
      {session && !isShowSearch && (
        <>
          <Header />
          {taskListId === '' ? (
            <Heading>リストを作成してください</Heading>
          ) : (
            <Grid placeItems="center" px="1rem" paddingTop="72px">
              <Button my={4} onClick={() => setIsShowSearch(true)}>
                タスクを登録する
              </Button>
              <Tasks />
            </Grid>
          )}
        </>
      )}
      {session && isShowSearch && (
        <>
          <Header />
          <Grid placeItems="center" px="3rem" paddingTop="72px">
            <Search />
          </Grid>
        </>
      )}
    </>
  )
}

export default Home
