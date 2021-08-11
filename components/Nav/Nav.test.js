import {render, screen} from '@testing-library/react'
import Nav from './Nav'

describe('Unregistred User Nav', () => {
  it('should render a sign in link and list menu', () => {
    render(<Nav />)

    expect(
      screen.getByRole('link', {
        name: /sign in/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /fundraising/i,
      }),
    ).toBeInTheDocument()
  })
})
