import { AddIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { useIsShowSearchState } from 'src/hooks/useIsShowSearchState'

const SearchScreenSwitchButton = () => {
  const { setIsShowSearch } = useIsShowSearchState()

  return (
    <Button
      my={4}
      onClick={() => setIsShowSearch(true)}
      leftIcon={<AddIcon />}
      data-testid="create-task-button"
    >
      このリストに作品を登録する
    </Button>
  )
}

export default SearchScreenSwitchButton
