import { screen } from '@testing-library/react'
import { setup } from 'src/tests/jest/userEvent'
import CompleteButton from 'src/components/tasks/CompleteButton'

describe('CompleteButton', () => {
  it('CompleteButton', async () => {
    const onClick = jest.fn()
    const { user } = setup(
      <CompleteButton taskId="abcdefg" onClick={onClick} />
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
