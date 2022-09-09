import { Link, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

const NavLink = ({
  children,
  setTaskListId,
  taskListId,
  setIsShowSearch,
}: {
  children: ReactNode
  setTaskListId: (id: string) => void
  taskListId: string
  setIsShowSearch: (boolean: boolean) => void
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
      setIsShowSearch(false)
    }}
  >
    {children}
  </Link>
)

export default NavLink
