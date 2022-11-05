import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import Link from 'next/link'

const UnauthenticatedHeader = () => {
  return (
    <Box bgColor="black" px={4} position="fixed" w="100%" zIndex={1}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              htmlWidth={250}
              htmlHeight={40}
              cursor="pointer"
            />
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}

export default UnauthenticatedHeader
