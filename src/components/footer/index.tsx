import { Box, Container, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import SocialButton from 'src/components/footer/SocialButton'

const Footer = () => {
  return (
    <Box w="100%">
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2022 isshi-hasegawa All rights reserved.</Text>
        <Text>powered by TMDb, JustWatch</Text>
        <Link href="/terms_of_service">利用規約</Link>
        <Link href="/privacy_policy">プライバシーポリシー</Link>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label="Twitter"
            href="https://twitter.com/isshi_hasegawa"
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton label="GitHub" href="https://github.com/isshi-hasegawa">
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
