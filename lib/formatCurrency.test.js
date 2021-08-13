import formatCurrency from './formatCurrency'

describe('formatCurrency', () => {
  it('should return formatted currency in IDR', () => {
    const currency = {
      unformatted: 18584332,
      formatted: 'Rp 18.584.332,00',
    }

    const currencyIDR = formatCurrency(currency.unformatted)

    expect(currencyIDR).toBe(currency.formatted)
  })

  it('should return formatted currency in custom format', () => {
    const currency = {
      unformatted: 18584332,
      formatted: '$18,584,332.00',
    }

    const customCurrency = formatCurrency(
      currency.unformatted,
      'en-US',
      'USD',
    )

    expect(customCurrency).toBe(currency.formatted)
  })
})
