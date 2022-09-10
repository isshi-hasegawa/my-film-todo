import { Link, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { taskListIdState } from 'src/states/taskListIdState'
import { isShowSearchState } from 'src/states/isShowSearchState'

const NavLink = ({
  children,
  propTaskListId,
}: {
  children: ReactNode
  propTaskListId: string
}) => {
  const [, setTaskListId] = useRecoilState<string>(taskListIdState)
  const [, setIsShowSearch] = useRecoilState<boolean>(isShowSearchState)

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
        setTaskListId(propTaskListId)
        setIsShowSearch(false)
      }}
    >
      {children}
    </Link>
  )
}

export default NavLink
