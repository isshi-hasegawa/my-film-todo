import { Input } from '@chakra-ui/react'

const SearchInput = ({ onChange }: { onChange: (title: string) => void }) => {
  return (
    <Input
      data-testid="search-input"
      color="secondary"
      variant="flushed"
      placeholder="作品名を入力してください 例：スパイダーマン"
      onChange={(e) => onChange(e.target.value)}
      maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
    />
  )
}

export default SearchInput
