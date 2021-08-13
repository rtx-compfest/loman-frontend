import {render, screen} from '@testing-library/react'
import Footer from './Footer.js'

describe('Footer', () => {
  it('should render copyright info', () => {
    render(<Footer />)

    const copyrightText = screen.getByText(
      /copyright © 2021 Loman. All Rights Reserved/i,
    )

    expect(copyrightText).toBeInTheDocument()
  })
})
