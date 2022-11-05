import { Button, Center, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  return (
    <Button
      data-testid="login-button"
      bgColor="white"
      variant="outline"
      leftIcon={<FcGoogle />}
      onClick={() => signIn('google')}
      m={5}
    >
      <Center>
        <Text>Googleでログインする</Text>
      </Center>
    </Button>
  )
}

export default SignIn
