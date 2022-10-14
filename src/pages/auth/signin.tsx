import { Button, Center, Text, Image } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  return (
    // <Button
    //   variant={'outline'}
    //   leftIcon={<FcGoogle />}
    //   onClick={() => signIn('google')}
    // >
    //   <Center>
    //     <Text>Googleでログインする</Text>
    //   </Center>
    // </Button>

    <Image
      src="/btn_google_signin_light_normal_web.png"
      alt="login_button"
      onClick={() => signIn('google')}
    />
  )
}

export default SignIn
