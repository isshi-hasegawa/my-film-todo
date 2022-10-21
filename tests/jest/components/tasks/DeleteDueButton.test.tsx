import { fireEvent, render, screen } from '@testing-library/react'
import DeleteDueButton from 'src/components/tasks/DeleteDueButton'

describe('DeleteDueButton', () => {
  it('DeleteDueButton', () => {
    const onClick = jest.fn()
    render(<DeleteDueButton taskId="abcdefg" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
