import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Grid, Heading, Spinner } from "@chakra-ui/react";
import SignIn from "./auth/signin";
import Header from "src/components/Header";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

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
          <Header />
        </>
      )}
    </>
  );
};

export default Home;
