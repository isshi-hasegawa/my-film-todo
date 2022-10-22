import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil'
import TaskListLink from 'src/components/header/TaskListLink'

describe('TaskListLink', () => {
  it('TaskListLink', async () => {
    render(
      <RecoilRoot>
        <TaskListLink id={'abcdefg'}>マイタスク</TaskListLink>
      </RecoilRoot>
    )
    const taskListTitle = screen.getByTestId('task-list-title')
    expect(taskListTitle).toBeVisible()
    expect(taskListTitle).toHaveTextContent('マイタスク')
    expect(screen.getByTestId('task-list-link')).toHaveStyle({
      backgroundColor: '',
    })
    await userEvent.click(screen.getByTestId('task-list-link'))
    expect(screen.getByTestId('task-list-link')).toHaveStyle({
      backgroundColor: 'whiteAlpha.600',
    })
  })
})
