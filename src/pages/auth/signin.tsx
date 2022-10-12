import { Button, Center, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'

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
      alt="signin_button"
      width={191}
      height={46}
      onClick={() => signIn('google')}
    />
  )
}

export default SignIn
