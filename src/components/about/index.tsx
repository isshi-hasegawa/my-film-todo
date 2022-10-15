import { Heading, Image, Text, VStack, Link } from '@chakra-ui/react'
import SignIn from 'src/pages/auth/signin'

const About = () => {
  return (
    <>
      <VStack>
        <Heading as="h1">
          <Image src="/logo.png" alt="logo" htmlWidth={500} htmlHeight={80} />
        </Heading>
      </VStack>
      <br />
      <Text>
        動画配信サービスで大量に映画鑑賞する人のためのタスク管理ツール
      </Text>
      <br />
      <Text>
        動画配信サービスをまたいで「次にどの映画を観るか」を管理しましょう
      </Text>
      <br />
      <SignIn />
      <Text fontSize="sm">ご利用にはGoogleアカウントが必要です</Text>
      <br />
      <VStack bgColor="ivory">
        <br />
        <Image src="/demo1.png" alt="demo1" htmlWidth={450} htmlHeight={350} />
        <Text>映画を検索することができます</Text>
        <Text>気に入った映画をクリックすると...</Text>
        <br />
        <Image src="/demo2.png" alt="demo2" htmlWidth={450} htmlHeight={350} />
        <Text>映画をタスクとして登録することができます</Text>
        <br />
        <Text>
          （登録したタスクは
          <Link
            color="teal.500"
            href="https://support.google.com/tasks/answer/7675772?co=GENIE.Platform%3DDesktop&hl=ja"
          >
            Google Todoリスト
          </Link>
          からも確認できます）
        </Text>
        <br />
      </VStack>
      <br />
    </>
  )
}

export default About
