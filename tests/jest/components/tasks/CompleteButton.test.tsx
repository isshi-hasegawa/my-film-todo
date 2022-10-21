import { fireEvent, render, screen } from '@testing-library/react'
import CompleteButton from 'src/components/tasks/CompleteButton'

describe('CompleteButton', () => {
  it('CompleteButton', () => {
    const onClick = jest.fn()
    render(<CompleteButton taskId="abcdefg" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
