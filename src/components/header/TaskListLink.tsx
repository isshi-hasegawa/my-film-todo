import { Link } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useIsShowSearchState } from 'src/hooks/useIsShowSearchState'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'

const TaskListLink = ({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) => {
  const { taskListId, setTaskListId } = useTaskListIdState()
  const { setIsShowSearch } = useIsShowSearchState()

  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.500',
      }}
      onClick={() => {
        setTaskListId(id)
        setIsShowSearch(false)
      }}
      color="white"
      bg={id === taskListId ? 'whiteAlpha.600' : ''}
      data-testid="task-list-link"
    >
      <div data-testid="task-list-title">{children}</div>
    </Link>
  )
}

export default TaskListLink
