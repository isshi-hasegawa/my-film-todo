import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  return (
    <>
      <Head>
        <title>Next.js Google Tasks API</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {status === "unauthenticated" && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {status === "loading" && <>Loading ...</>}
        {status === "authenticated" && (
          <>
            Signed in as{" "}
            <Image
              src={session.user?.image ?? ""}
              alt=""
              width={50}
              height={50}
            />{" "}
            {session.user?.name ?? ""} <br />
            AccessToken : {accessToken} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
