import { Input } from '@chakra-ui/react'
import { useKeywordState } from 'src/hooks/useKeywordState'

const SearchInput = () => {
  const { setKeyword } = useKeywordState()

  return (
    <Input
      data-testid="search-input"
      variant="outline"
      placeholder="作品名を入力してください 例：スパイダーマン"
      onChange={(e) => setKeyword(e.target.value)}
      maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
      bgColor="whiteAlpha.700"
    />
  )
}

export default SearchInput
