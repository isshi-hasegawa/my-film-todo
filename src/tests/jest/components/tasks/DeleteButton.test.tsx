import { fireEvent, render, screen } from '@testing-library/react'
import DeleteButton from 'src/components/tasks/DeleteButton'

describe('DeleteButton', () => {
  it('DeleteButton', () => {
    const onClick = jest.fn()
    render(<DeleteButton taskId="abcdefg" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
