export const dateFormatter = (value: string): string =>
  new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC'
  }).format(new Date(value))
