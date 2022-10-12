import Link from 'next/link'
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import SocialButton from 'src/components/footer/SocialButton'

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      w="100%"
      position="fixed"
      bottom={0}
      display={{ base: 'none', sm: 'none', md: 'flex' }}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2022 isshi-hasegawa. All rights reserved</Text>
        <Link href="/terms_of_service">利用規約</Link>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Twitter'}
            href={'https://twitter.com/isshi_hasegawa'}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={'GitHub'}
            href={'https://github.com/isshi-hasegawa'}
          >
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
