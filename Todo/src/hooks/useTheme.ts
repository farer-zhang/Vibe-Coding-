import { useState, useEffect } from 'react'
import { createTheme, Theme } from '@mui/material/styles'

const THEME_KEY = 'todo-theme'

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'dark'
  })

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const theme: Theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f7fa',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            height: 40, // 统一高度
            boxShadow: isDarkMode 
              ? '0 2px 8px rgba(33, 150, 243, 0.3)' 
              : '0 2px 8px rgba(33, 150, 243, 0.2)',
            '&:hover': {
              boxShadow: isDarkMode 
                ? '0 4px 12px rgba(33, 150, 243, 0.4)' 
                : '0 4px 12px rgba(33, 150, 243, 0.3)',
            },
          },
          sizeSmall: {
            height: 32, // 小尺寸按钮
          },
          sizeLarge: {
            height: 48, // 大尺寸按钮
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              height: 40, // 统一高度
              '& input': {
                height: 'auto',
                padding: '8px 14px',
              },
            },
            '& .MuiInputBase-sizeSmall': {
              height: 32, // 小尺寸输入框
              '& input': {
                padding: '6px 12px',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            height: 40, // 统一高度
            '& .MuiSelect-select': {
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
            },
          },
          sizeSmall: {
            height: 32, // 小尺寸选择框
            '& .MuiSelect-select': {
              padding: '6px 12px',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: 40, // 统一高度
            '& .MuiOutlinedInput-input': {
              padding: '8px 14px',
            },
          },
          sizeSmall: {
            height: 32, // 小尺寸
            '& .MuiOutlinedInput-input': {
              padding: '6px 12px',
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              height: 40, // 统一高度
            },
            '& .MuiInputBase-sizeSmall': {
              height: 32, // 小尺寸
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  })

  return {
    isDarkMode,
    toggleTheme,
    theme,
  }
}