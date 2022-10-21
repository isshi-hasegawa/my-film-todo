import { Button, Center, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  return (
    <Button
      variant={'outline'}
      leftIcon={<FcGoogle />}
      onClick={() => signIn('google')}
      data-testid="login-button"
    >
      <Center>
        <Text>Googleでログインする</Text>
      </Center>
    </Button>
  )
}

export default SignIn
