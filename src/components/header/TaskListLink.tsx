import { Link } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTaskListIdState } from 'src/hooks/taskListIdState'
import { useIsShowSearchState } from 'src/hooks/isShowSearchState'

const TaskListLink = ({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) => {
  const { setTaskListId } = useTaskListIdState()
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
      data-testid="task-list"
    >
      <div data-testid="task-list-title">{children}</div>
    </Link>
  )
}

export default TaskListLink
