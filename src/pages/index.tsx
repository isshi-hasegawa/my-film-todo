import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Button, Grid, Heading, Spinner } from "@chakra-ui/react";
import SignIn from "./auth/signin";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Spinner size="xl" />;

  return (
    <Grid placeItems="center" gridRowGap="1rem">
      {session ? (
        <>
          <div style={{ borderRadius: "50%", overflow: "hidden" }}>
            <Image
              src={session.user?.image ?? ""}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <Heading>{session?.user?.name} でログイン中</Heading>
          <Button onClick={() => signOut()}>ログアウト</Button>
        </>
      ) : (
        <>
          <Heading>ログインしてください</Heading>
          <SignIn />
        </>
      )}
    </Grid>
  );
};

export default Home;
