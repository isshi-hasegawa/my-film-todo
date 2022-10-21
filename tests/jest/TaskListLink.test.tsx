import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import TaskListLink from 'src/components/header/TaskListLink'

describe('TaskListLink', () => {
  it('TaskListLink', () => {
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
    fireEvent.click(screen.getByTestId('task-list-link'))
    expect(screen.getByTestId('task-list-link')).toHaveStyle({
      backgroundColor: 'whiteAlpha.600',
    })
  })
})
