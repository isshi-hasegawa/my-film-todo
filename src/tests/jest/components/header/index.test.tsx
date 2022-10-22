import { render, screen } from '@testing-library/react'
import Header from 'src/components/header'
import userEvent from '@testing-library/user-event'
import { useSession, signOut } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('next-auth/react')
const mockUseSession = useSession as jest.Mock
;(signOut as jest.Mock).mockImplementation(() => jest.fn())

const queryClient = new QueryClient()

describe('Header', () => {
  const renderHeader = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    )

    const hamburgerIcon = screen.getByTestId('hamburger-icon')
    const hamburgerIconButton = screen.getByTestId('hamburger-icon-button')
    const signOutButton = screen.getByTestId('signout-button')

    return { hamburgerIcon, hamburgerIconButton, signOutButton }
  }

  it('ログアウト', async () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    const { signOutButton } = renderHeader()

    expect(signOutButton).toBeInTheDocument()
    await userEvent.click(signOutButton)
    expect(signOut).toHaveBeenCalledTimes(1)
  })

  it('ハンバーガーアイコンの開閉', async () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    const { hamburgerIcon, hamburgerIconButton } = renderHeader()

    expect(hamburgerIcon).toBeInTheDocument()
    expect(hamburgerIconButton).toBeInTheDocument()
    await userEvent.click(hamburgerIconButton)
    expect(hamburgerIcon).not.toBeInTheDocument()
  })
})
