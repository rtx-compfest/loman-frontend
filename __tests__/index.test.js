import {render, screen} from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />)

    const linkFundraising = screen.getByRole('link', {
      name: /fundraising/i,
    })
    const avatarButton = screen.getByRole('button', {
      name: /avatar/i,
    })

    expect(linkFundraising).toBeInTheDocument()
    expect(avatarButton).toBeVisible()
  })
})
