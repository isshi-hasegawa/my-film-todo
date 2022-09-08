import { Link, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

const NavLink = ({
  children,
  setTaskListId,
  taskListId,
  setIsShowSearchMovies,
}: {
  children: ReactNode
  setTaskListId: (id: string) => void
  taskListId: string
  setIsShowSearchMovies: (boolean: boolean) => void
}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    onClick={() => {
      setTaskListId(taskListId)
      setIsShowSearchMovies(false)
    }}
  >
    {children}
  </Link>
)

export default NavLink
