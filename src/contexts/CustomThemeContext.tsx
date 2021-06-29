import React, { createContext, useCallback, ReactNode } from 'react'

import dark from '../styles/themes/dark'
import light from '../styles/themes/light'

import { DefaultTheme, ThemeProvider } from 'styled-components'
import usePersistedState from '../utils/usePersistedState'

export type CustomContextType = {
  toggleTheme(): void
  theme: DefaultTheme
}

export const CustomThemeContext = createContext({} as CustomContextType)

type ThemeContextProviderProps = {
  children: ReactNode
}

export const CustomThemeProvider: React.FC<ThemeContextProviderProps> = ({
  children
}) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('light', light)

  const toggleTheme = useCallback(() => {
    setTheme(theme.name === 'light' ? dark : light)
  }, [theme])

  return (
    <CustomThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}
