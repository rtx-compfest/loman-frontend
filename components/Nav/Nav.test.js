import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Nav from './Nav'

describe('Unregistred User Nav', () => {
  it('should render a navbar with avatar button and list menu', () => {
    render(<Nav />)

    const signInText = screen.getByText(/sign in/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })
    const linkFundraising = screen.getByRole('link', {
      name: /fundraising/i,
    })

    expect(linkFundraising).toBeInTheDocument()
    expect(signInText).not.toBeVisible()
    expect(avatarButton).toBeVisible()
  })

  it('should appear menu when avatar button is clicked', async () => {
    render(<Nav />)

    const signInText = screen.getByText(/sign in/i)
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })

    expect(signInText).not.toBeVisible()

    fireEvent.click(avatarButton)

    await waitFor(() => {
      expect(signInText).toBeVisible()
    })
  })
})
