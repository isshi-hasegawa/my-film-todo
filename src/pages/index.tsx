import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Grid, Heading, Spinner } from "@chakra-ui/react";
import SignIn from "./auth/signin";
import Header from "src/components/Header";
import { Tasks } from "src/components/Tasks";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [selectedTaskListId, setSelectedTaskListId] = useState<string>("");

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
      {session && (
        <>
          <Header setSelectedTaskListId={setSelectedTaskListId} />
          <Grid
            sx={{
              placeItems: "center",
              px: "5rem",
            }}
            paddingTop="64px"
          >
            <Tasks selectedTaskListId={selectedTaskListId} />
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
