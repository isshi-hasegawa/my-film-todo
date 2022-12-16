import { Box, Image, Link, Text, VStack } from '@chakra-ui/react'
import SignIn from 'src/components/about/SignIn'

const About = () => {
  return (
    <>
      <Box bgColor="blackAlpha.700" p={30} textAlign="center">
        <Text
          as="h1"
          fontFamily="Dela Gothic One"
          color="white"
          fontSize={{ base: '5xl', sm: '5xl', md: '6xl' }}
          pb={5}
        >
          俺の映画リスト
        </Text>

        <Text color="white">
          動画配信サービスで大量に映画鑑賞する人のためのタスク管理ツール。
        </Text>

        <Text color="white">
          動画配信サービスを横断して「次にどの映画を観るか」を管理。
        </Text>

        <Box textAlign="center">
          <SignIn />
          <Text color="lightgray" fontSize="sm">
            ご利用にはGoogleアカウントが必要です
          </Text>
          <Text color="lightgray" fontSize="sm">
            本サービスはユーザーのGoogleアカウントに紐づく
            <Link
              color="white"
              href="https://support.google.com/tasks/answer/7675772?co=GENIE.Platform%3DDesktop&hl=ja"
            >
              Google Todoリスト
            </Link>
            に操作を行います
          </Text>
        </Box>
      </Box>

      <VStack textAlign="center" py={30}>
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
