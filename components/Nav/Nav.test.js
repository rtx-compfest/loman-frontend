import {render, screen} from '@testing-library/react'
import Nav from './Nav'

describe('Nav', () => {
  it('should render a navbar with logo', () => {
    render(<Nav />)

    const logo = screen.getByRole('img', {
      name: /loman logo/i,
    })

    expect(logo).toBeInTheDocument()
  })
})
