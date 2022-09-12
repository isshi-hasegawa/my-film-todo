import { Link, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTaskListIdState } from 'src/hooks/taskListIdState'
import { useIsShowSearchState } from 'src/hooks/isShowSearchState'

const NavLink = ({ children, id }: { children: ReactNode; id: string }) => {
  const { setTaskListId } = useTaskListIdState()
  const { setIsShowSearch } = useIsShowSearchState()

  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={() => {
        setTaskListId(id)
        setIsShowSearch(false)
      }}
    >
      {children}
    </Link>
  )
}

export default NavLink