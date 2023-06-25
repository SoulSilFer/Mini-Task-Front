import { LocalStorage } from 'core/infra'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

type SettingsContextData = {
  lightMode: boolean
  switchThemeMode: () => void
}

export const SettingsContext = createContext<SettingsContextData>({
  lightMode: false,
  switchThemeMode: () => false
})

type SettingsContextProviderProps = {
  children: ReactNode
}

export const SettingsContextProvider: React.FC<
SettingsContextProviderProps
> = ({ children }) => {
  const storage = new LocalStorage()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [lightMode, setLightMode] = useState<boolean>(true)

  useEffect(() => {
    if (isLoaded) return
    const sessionTheme = storage.get('theme')
    const isLightMode = !!(sessionTheme && sessionTheme === 'light')
    setLightMode(isLightMode)
    setIsLoaded(true)
  }, [isLoaded])

  const switchThemeMode = (): void => {
    const isLightMode = !lightMode ? 'light' : 'dark'
    void storage.set('theme', isLightMode)
    setLightMode((prev) => !prev)
  }

  return (
    <SettingsContext.Provider
      value={{
        lightMode,
        switchThemeMode
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = (): SettingsContextData =>
  useContext(SettingsContext)
