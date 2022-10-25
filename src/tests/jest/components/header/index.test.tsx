import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
import { signOut, useSession } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import Header from 'src/components/header'
import { setup } from 'src/tests/jest/userEvent'

jest.mock('next-auth/react')
const mockUseSession = useSession as jest.Mock
;(signOut as jest.Mock).mockImplementation(() => jest.fn())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
})

describe('Header', () => {
  const renderHeader = () => {
    const { user } = setup(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    )

    const hamburgerIcon = screen.getByTestId('hamburger-icon')
    const hamburgerIconButton = screen.getByTestId('hamburger-icon-button')
    const signOutButton = screen.getByTestId('signout-button')

    return { user, hamburgerIcon, hamburgerIconButton, signOutButton }
  }

  it('ログアウト', async () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    const { user, signOutButton } = renderHeader()

    expect(signOutButton).toBeInTheDocument()
    await user.click(signOutButton)
    expect(signOut).toHaveBeenCalledTimes(1)
  })

  it('ハンバーガーアイコンの開閉', async () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: null,
    })

    const { user, hamburgerIcon, hamburgerIconButton } = renderHeader()

    expect(hamburgerIcon).toBeInTheDocument()
    expect(hamburgerIconButton).toBeInTheDocument()
    await user.click(hamburgerIconButton)
    expect(hamburgerIcon).not.toBeInTheDocument()
  })
})
