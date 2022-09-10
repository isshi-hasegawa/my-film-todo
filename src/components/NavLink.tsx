import { Link, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { taskListIdState } from 'src/states/taskListIdState'

const NavLink = ({
  children,
  taskListId,
  setIsShowSearch,
}: {
  children: ReactNode
  taskListId: string
  setIsShowSearch: (boolean: boolean) => void
}) => {
  const [, setTaskListId] = useRecoilState<string>(taskListIdState)

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
        setTaskListId(taskListId)
        setIsShowSearch(false)
      }}
    >
      {children}
    </Link>
  )
}

export default NavLink
