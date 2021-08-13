import {render, screen} from '@testing-library/react'
import differenceInDays from 'date-fns/differenceInDays'
import DonationCard from './DonationCard'

jest.mock('@lib/formatCurrency')

import formatCurrency from '@lib/formatCurrency'

formatCurrency.mockImplementation(() => 'Rp 18.584.332,00')

describe('DonationCard', () => {
  it("should render DonationCard when props it's empty", () => {
    render(<DonationCard />)

    const img = screen.getByRole('img', {
      name: /alt image/i,
    })
    const title = screen.getByRole('heading', {
      name: /donation name/i,
    })
    const fundraiser = screen.getByText(/fundraiser/i)
    const terkumpul = screen.getByText(/terkumpul/i)
    const sisaHari = screen.getByText(/sisa hari/i)

    expect(img).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(fundraiser).toBeInTheDocument()
    expect(terkumpul).toBeInTheDocument()
    expect(sisaHari).toBeInTheDocument()
  })

  it('should render DonationCard according to props', () => {
    const donation = {
      name: 'Bantuan untuk Tenaga Kesehatan Yang Jalani Isolasi',
      target_amount: 500000000,
      amount: 18584332,
      deadline: '2021-08-31',
      fundraiser: 'Kitabisa.com',
    }

    // formatCurrency.mockImplementation(() => 'Rp 18.584.332,00')

    render(<DonationCard {...donation} />)

    const img = screen.getByRole('img', {
      name: /alt image/i,
    })
    const title = screen.getByRole('heading', {
      name: donation.name,
    })
    const fundraiser = screen.getByText(donation.fundraiser)
    const terkumpul = screen.getByText(/terkumpul/i)
    const amount = screen.getByText(/rp/i)
    const sisaHari = screen.getByText(/sisa hari/i)
    const deadline = screen.getByText(
      differenceInDays(new Date(donation.deadline), new Date()),
    )

    expect(img).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(fundraiser).toBeInTheDocument()
    expect(terkumpul).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
    expect(sisaHari).toBeInTheDocument()
    expect(deadline).toBeInTheDocument()
  })
})
