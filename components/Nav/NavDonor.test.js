import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import NavDonor from './NavDonor'

describe('NavDonor', () => {
  it('should render a navbar with avatar button and list menu', () => {
    render(<NavDonor />)

    const logoutText = screen.getByText(/log out/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })
    const linkFundraising = screen.getByRole('link', {
      name: /fundraising/i,
    })

    expect(linkFundraising).toBeInTheDocument()
    expect(logoutText).not.toBeVisible()
    expect(avatarButton).toBeVisible()
  })

  it('should appear menu with default name, zero balance, and logout when no props and avatar button is clicked', async () => {
    render(<NavDonor />)

    const logoutText = screen.getByText(/log out/i)
    const nameText = screen.getByText(/name/i)
    const donorText = screen.getByText(/donor/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })

    expect(logoutText).not.toBeVisible()
    expect(nameText).not.toBeVisible()
    expect(donorText).not.toBeVisible()

    fireEvent.click(avatarButton)

    await waitFor(() => {
      const balanceAmount = screen.getByRole('menuitem', {
        name: /balance 0/i,
      })

      expect(logoutText).toBeVisible()
      expect(nameText).toBeVisible()
      expect(donorText).toBeVisible()
      expect(balanceAmount).toBeVisible()
    })
  })

  it('should appear menu with given name, balance, and logout and avatar button is clicked', async () => {
    const name = 'Dimas'
    const balance = 10000

    render(<NavDonor name={name} balance={balance} />)

    const logoutText = screen.getByText(/log out/i)
    const nameText = screen.getByText(name)
    const donorText = screen.getByText(/donor/i)
    const avatarButton = screen.getByRole('button', {name: name})

    expect(logoutText).not.toBeVisible()
    expect(nameText).not.toBeVisible()
    expect(donorText).not.toBeVisible()

    fireEvent.click(avatarButton)

    await waitFor(() => {
      const balanceAmount = screen.getByRole('menuitem', {
        name: `Balance ${balance}`,
      })

      expect(logoutText).toBeVisible()
      expect(nameText).toBeVisible()
      expect(donorText).toBeVisible()
      expect(balanceAmount).toBeVisible()
    })
  })
})
