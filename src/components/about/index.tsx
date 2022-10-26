import { Heading, Image, Link, Mark, Text, VStack } from '@chakra-ui/react'
import SignIn from 'src/pages/auth/signin'

const About = () => {
  return (
    <>
      <Heading as="h1" p="25px">
        <Image
          src="/logo.png"
          alt="俺の映画リスト"
          htmlWidth={500}
          htmlHeight={80}
        />
      </Heading>

      <Text>
        動画配信サービスで大量に映画鑑賞する人のためのタスク管理ツール
      </Text>

      <SignIn />

      <Text fontSize="sm">ご利用にはGoogleアカウントが必要です</Text>
      <Text fontSize="sm">
        このサービスは、あなたのGoogleアカウントに紐づく
        <Link
          color="teal.500"
          href="https://support.google.com/tasks/answer/7675772?co=GENIE.Platform%3DDesktop&hl=ja"
        >
          Google Todoリスト
        </Link>
        に操作を行います
      </Text>

      <VStack bgColor="gray.200" p={10} m={10}>
        <Mark bg="black" color="white" px="2" py="1">
          <Text as="b">どんなサービス？</Text>
        </Mark>

        <Text>
          動画配信サービスをまたいで「次にどの映画を観るか」を管理しましょう
        </Text>

        <Image src="/demo1.png" alt="demo1" htmlWidth={450} htmlHeight={350} />
        <Text>映画を検索することができます</Text>

        <Text>
          Apple
          TVのアイコン以外は、表示されている動画配信サービスで見放題配信中であることを示しています
        </Text>

        <Text>観たい映画をクリックすると...</Text>

        <Image src="/demo2.png" alt="demo2" htmlWidth={450} htmlHeight={350} />
        <Text>映画をタスクとして登録することができます</Text>
        <Text>
          登録されたタスクの詳細には、見放題中の動画配信サービスの名前と上映時間が保存されます
        </Text>

        <Image src="/demo3.png" alt="demo3" htmlWidth={450} htmlHeight={350} />
        <Text>タスクには期限を設定することができます</Text>
        <Text>タスクの完了やタスク自体の削除も行うことができます</Text>
      </VStack>
    </>
  )
}

export default About
