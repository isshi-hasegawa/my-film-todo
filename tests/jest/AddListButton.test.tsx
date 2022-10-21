import { fireEvent, render, screen } from '@testing-library/react'
import AddListButton from 'src/components/header/AddListButton'

describe('AddListButton', () => {
  it('AddListButton', () => {
    const onClick = jest.fn()
    render(<AddListButton onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
