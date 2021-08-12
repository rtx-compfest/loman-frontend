import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import NavAdmin from './NavAdmin'

describe('NavAdmin', () => {
  it('should render a navbar with top up button, avatar button and list menu', () => {
    render(<NavAdmin />)

    const logoutText = screen.getByText(/log out/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })
    const linkFundraising = screen.getByRole('link', {
      name: /dashboard/i,
    })

    expect(linkFundraising).toBeInTheDocument()
    expect(logoutText).not.toBeVisible()
    expect(avatarButton).toBeVisible()
  })

  it('should appear menu with default name and logout button when avatar button is clicked', async () => {
    render(<NavAdmin />)

    const logoutText = screen.getByText(/log out/i)
    const nameText = screen.getByText(/admin/i)
    const adminText = screen.getByText(/admin/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })

    expect(logoutText).not.toBeVisible()
    expect(nameText).not.toBeVisible()
    expect(adminText).not.toBeVisible()

    fireEvent.click(avatarButton)

    await waitFor(() => {
      expect(logoutText).toBeVisible()
      expect(nameText).toBeVisible()
      expect(adminText).toBeVisible()
    })
  })
})
