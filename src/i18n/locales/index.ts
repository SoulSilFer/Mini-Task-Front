import enUsTranslations from './en-us'
import ptBrTranslations from './pt-br'

export type Translations = typeof enUsTranslations

export const i18nTranslations: {
  'pt-BR': Translations
  'en-US': Translations
} = {
  'pt-BR': ptBrTranslations, // Atente-se a usar as abreviaturas corretas
  'en-US': enUsTranslations // https://support.mozilla.org/pt-BR/kb/abreviacao-de-localizacao
}

export default i18nTranslations
