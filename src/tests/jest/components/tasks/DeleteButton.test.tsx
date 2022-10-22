import { screen } from '@testing-library/react'
import { setup } from 'src/tests/jest/userEvent'
import DeleteButton from 'src/components/tasks/DeleteButton'

describe('DeleteButton', () => {
  it('DeleteButton', async () => {
    const onClick = jest.fn()
    const { user } = setup(<DeleteButton taskId="abcdefg" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
