export const currencyFormatter = (
  value: number | bigint,
  removeSign?: boolean
): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
    currencySign: 'accounting'
  })
    .format(value)
    .replace(removeSign ? 'R$' : '', '')
