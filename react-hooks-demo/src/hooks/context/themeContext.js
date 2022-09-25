import React from "react"

export const themes = {
  light: {
    foreground: '#000',
    background: '#eee'
  },
  dark: {
    foreground: '#fff',
    background: '#222'
  },
}
const ThemeContext = React.createContext(themes.light)

export default ThemeContext
