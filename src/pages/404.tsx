import { Grid, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>俺の映画リスト | このページは存在しません</title>
      </Head>
      <Grid h="100vh" placeItems="center" px="5rem">
        <VStack>
          <Text fontSize="6xl" fontWeight="bold">
            404
          </Text>
          <Text fontSize="2xl">このページは存在しません。</Text>
        </VStack>
        <Link href="/">トップページに戻る</Link>
      </Grid>
    </>
  )
}
