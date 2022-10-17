import { Button, Center, Text, Image } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  const router = useRouter()
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
    <Button
      variant={'outline'}
      // leftIcon={<FcGoogle />}
      onClick={() => router.push('login')}
    >
      <Center>
        <Text>Googleでログインする</Text>
      </Center>
    </Button>
  )
}

export default SignIn
