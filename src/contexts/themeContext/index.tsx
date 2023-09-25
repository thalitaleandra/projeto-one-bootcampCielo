'use client'

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { PaletteMode } from '@mui/material'

const ThemeContext = createContext({
  selectedTheme: 'light',
  toggleTheme: () => {
    console.log('toggleTheme')
  },
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProviderWrapper = ({ children }: PropsWithChildren) => {
  const [selectedTheme, setSelectedTheme] = useState<PaletteMode>('light')

  const toggleTheme = () => {
    const newTheme = selectedTheme === 'light' ? 'dark' : 'light'
    setSelectedTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setSelectedTheme(savedTheme as PaletteMode)
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
      setSelectedTheme(prefersDarkMode.matches ? 'dark' : 'light')
    }
  }, [])

  const theme = createTheme({
    palette: {
      mode: selectedTheme,
      background: {
        default: selectedTheme === 'light' ? '#FFFFFF' : '#0f1216',
      },
      primary: {
        main: '#a6f750',
      },
      secondary: {
        light: '#FFFAFA',
        dark: '#181c23',
        main: '#181c23',
      },
    },
  })

  return (
    <ThemeContext.Provider value={{ selectedTheme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
