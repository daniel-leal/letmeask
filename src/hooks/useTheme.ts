import { useContext } from 'react'
import {
  CustomThemeContext,
  CustomContextType
} from '../contexts/CustomThemeContext'

export function useTheme(): CustomContextType {
  const value = useContext(CustomThemeContext)

  return value
}
