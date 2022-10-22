import { fireEvent, render, screen } from '@testing-library/react'
import SearchInput from 'src/components/search/SearchInput'

describe('SearchInput', () => {
  it('SearchInput', () => {
    const onChange = jest.fn()
    render(<SearchInput onChange={onChange} />)
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'スパイダーマン' },
    })
    expect(onChange).toHaveBeenCalled()
  })
})
