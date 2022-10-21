import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AddDueButton from 'src/components/tasks/AddDueButton'

describe('AddDueButton', () => {
  it('AddDueButton', async () => {
    const onChange = jest.fn()
    render(<AddDueButton taskId="abcdefg" onChange={onChange} />)

    fireEvent.click(screen.getByTestId('add-due-button'))
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('add-due-button'), {
        target: { value: '2022-06-22' },
      })
    )
    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
