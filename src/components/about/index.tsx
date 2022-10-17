import {
  Heading,
  Image,
  Text,
  VStack,
  Link,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
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
      <Text as="b">どんなサービス？</Text>
      <br />
      <Text>
        動画配信サービスで大量に映画鑑賞する人のためのタスク管理ツールです
      </Text>
      <br />
      <Text>
        動画配信サービスをまたいで「次にどの映画を観るか」を管理しましょう
      </Text>
      <br />
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
        にタスクを追加したり、更新したり、削除する操作を行います
      </Text>
      <br />
      <VStack bgColor="gray.300" px="50px">
        <br />
        <Image src="/demo1.png" alt="demo1" htmlWidth={450} htmlHeight={350} />
        <Text>映画を検索することができます</Text>
        <Text>各サービスのアイコンは</Text>
        <UnorderedList>
          <ListItem>
            Netflix、Amazon Prime Video、Disney+で見放題配信中
          </ListItem>
          <ListItem>Apple TVで購入可能</ListItem>
        </UnorderedList>
        <Text>であるということを示しています</Text>
        <br />
        <Text>観たい映画をクリックすると...</Text>
        <br />
        <Image src="/demo2.png" alt="demo2" htmlWidth={450} htmlHeight={350} />
        <Text>映画をタスクとして登録することができます</Text>
        <Text>
          登録されたタスクの詳細には、見放題中の動画配信サービスの名前と上映時間が保存されます
        </Text>
        <br />
        <Image src="/demo3.png" alt="demo3" htmlWidth={450} htmlHeight={350} />
        <Text>タスクには期限を設定することができます</Text>
        <Text>タスクの完了やタスク自体の削除も行うことができます</Text>
        <br />
      </VStack>
      <br />
    </>
  )
}

export default About
