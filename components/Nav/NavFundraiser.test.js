import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import NavFundraiser from './NavFundraiser'

describe('NavFundraiser', () => {
  it('should render a navbar with top up button, avatar button and list menu', () => {
    render(<NavFundraiser />)

    const logoutText = screen.getByText(/log out/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })
    const linkFundraising = screen.getByRole('link', {
      name: /fundraising/i,
    })
    const linkWithdraw = screen.getByRole('link', {
      name: /withdraw/i,
    })
    const linkEWallet = screen.getByRole('link', {name: /e\-wallet/i})

    expect(linkFundraising).toBeInTheDocument()
    expect(linkWithdraw).toBeInTheDocument()
    expect(linkEWallet).toBeInTheDocument()
    expect(logoutText).not.toBeVisible()
    expect(avatarButton).toBeVisible()
  })

  it('should appear menu with default name, zero balance, and logout when no props and avatar button is clicked', async () => {
    render(<NavFundraiser />)

    const logoutText = screen.getByText(/log out/i)
    const nameText = screen.getByText(/name/i)
    const fundraiserText = screen.getByText(/fundraiser/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })

    expect(logoutText).not.toBeVisible()
    expect(nameText).not.toBeVisible()
    expect(fundraiserText).not.toBeVisible()

    fireEvent.click(avatarButton)

    await waitFor(() => {
      const balanceAmount = screen.getByRole('menuitem', {
        name: /balance 0/i,
      })

      expect(logoutText).toBeVisible()
      expect(nameText).toBeVisible()
      expect(fundraiserText).toBeVisible()
      expect(balanceAmount).toBeVisible()
    })
  })

  it('should appear menu with given name, balance, and logout and avatar button is clicked', async () => {
    const name = 'Dimas'
    const balance = 10000

    render(<NavFundraiser name={name} balance={balance} />)

    const logoutText = screen.getByText(/log out/i)
    const nameText = screen.getByText(name)
    const fundraiserText = screen.getByText(/fundraiser/i)
    const avatarButton = screen.getByRole('button', {name: name})

    expect(logoutText).not.toBeVisible()
    expect(nameText).not.toBeVisible()
    expect(fundraiserText).not.toBeVisible()

    fireEvent.click(avatarButton)

    await waitFor(() => {
      const balanceAmount = screen.getByRole('menuitem', {
        name: `Balance ${balance}`,
      })

      expect(logoutText).toBeVisible()
      expect(nameText).toBeVisible()
      expect(fundraiserText).toBeVisible()
      expect(balanceAmount).toBeVisible()
    })
  })
})
