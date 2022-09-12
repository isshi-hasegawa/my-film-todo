import { Button, Center, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  return (
    <Button
      variant={'outline'}
      leftIcon={<FcGoogle />}
      onClick={() => signIn('google')}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  )
}

export default SignIn
