import {render, screen} from '@testing-library/react'
import DonationCard from './DonationCard'

describe('DonationCard', () => {
  it('should render DonationCard', () => {
    render(<DonationCard />)

    const title = screen.getByText(/donation name/i)
    expect(title).toBeInTheDocument()
  })
})
