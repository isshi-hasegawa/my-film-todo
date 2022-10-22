import { fireEvent, screen, waitFor } from '@testing-library/react'
import { setup } from 'src/tests/jest/userEvent'
import AddDueButton from 'src/components/tasks/AddDueButton'

describe('AddDueButton', () => {
  it('AddDueButton', async () => {
    const onChange = jest.fn()
    const { user } = setup(
      <AddDueButton taskId="abcdefg" onChange={onChange} />
    )

    await user.click(screen.getByTestId('add-due-button'))
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('add-due-button'), {
        target: { value: '2022-01-01' },
      })
    )
    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
