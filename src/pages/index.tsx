import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Button, Grid, Heading, Spinner } from '@chakra-ui/react'
import SignIn from './auth/signin'
import Header from 'src/components/Header'
import Tasks from 'src/components/Tasks'
import { useState } from 'react'
import Search from 'src/components/Search'
import { useRecoilState } from 'recoil'
import { taskListIdState } from 'src/states/taskListIdState'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const [taskListId] = useRecoilState<string>(taskListIdState)
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false)

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
          <Header setIsShowSearch={setIsShowSearch} />
          {taskListId === '' ? (
            <Heading>リストを作成してください</Heading>
          ) : (
            <Grid placeItems="center" px="5rem" paddingTop="72px">
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
          <Header setIsShowSearch={setIsShowSearch} />
          <Grid placeItems="center" px="5rem" paddingTop="72px">
            <Search />
          </Grid>
        </>
      )}
    </>
  )
}

export default Home
