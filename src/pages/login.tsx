import { Button, Center, Text, Image, Flex } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import Footer from 'src/components/footer'
import { useRouter } from 'next/router'

const LogIn = () => {
  const router = useRouter()

  return (
    <Flex direction="column" minH="100vh" placeItems="center">
      <Text>ログインしてください</Text>
      <Image
        src="/btn_google_signin_light_normal_web.png"
        alt="login_button"
        onClick={() => {
          signIn('google')
          router.push('login')
        }}
      />
    </Flex>
  )
}

export default LogIn
