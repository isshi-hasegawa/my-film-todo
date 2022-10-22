import { screen } from '@testing-library/react'
import { setup } from 'src/tests/jest/userEvent'
import DeleteDueButton from 'src/components/tasks/DeleteDueButton'

describe('DeleteDueButton', () => {
  it('DeleteDueButton', async () => {
    const onClick = jest.fn()
    const { user } = setup(
      <DeleteDueButton taskId="abcdefg" onClick={onClick} />
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
