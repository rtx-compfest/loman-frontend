const formatCurrency = (amount, locale = 'id-ID', currency = 'IDR') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  })

  return formatter.format(amount)
}

export default formatCurrency
