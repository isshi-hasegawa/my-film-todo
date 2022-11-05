import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray',
        color: 'gray.900',
      },
      html: {
        height: '100%',
      },
    },
  },
})
