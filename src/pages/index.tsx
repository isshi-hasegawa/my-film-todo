import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Button, Grid, Heading, Spacer, Spinner } from "@chakra-ui/react";
import SignIn from "./auth/signin";
import Header from "src/components/Header";
import { Tasks } from "src/components/Tasks";
import { useState } from "react";
import Search from "src/components/Search";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [selectedTaskListId, setSelectedTaskListId] = useState<string>("");
  const [isShowSearchMovies, setIsShowSearchMovies] = useState<boolean>(false);

  if (status === "loading")
    return (
      <Grid
        sx={{
          h: "100vh",
          placeItems: "center",
          px: "5rem",
        }}
      >
        <Spinner size="xl" />
      </Grid>
    );

  return (
    <>
      {!session && (
        <Grid
          sx={{
            h: "100vh",
            placeItems: "center",
            px: "5rem",
          }}
        >
          <Heading>ログインしてください</Heading>
          <SignIn />
        </Grid>
      )}
      {session && !isShowSearchMovies && (
        <>
          <Header
            setSelectedTaskListId={setSelectedTaskListId}
            setIsShowSearchMovies={setIsShowSearchMovies}
          />
          <Grid
            sx={{
              placeItems: "center",
              px: "5rem",
            }}
            paddingTop="72px"
          >
            <Button onClick={() => setIsShowSearchMovies(true)}>
              タスクを登録する
            </Button>
            <Tasks selectedTaskListId={selectedTaskListId} />
          </Grid>
        </>
      )}
      {session && isShowSearchMovies && (
        <>
          <Header
            setSelectedTaskListId={setSelectedTaskListId}
            setIsShowSearchMovies={setIsShowSearchMovies}
          />
          <Grid
            sx={{
              placeItems: "center",
              px: "5rem",
            }}
            paddingTop="72px"
          >
            <Search />
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
