import React, { useContext, useState, useCallback } from "react";
import ThemeContext, { themes } from "./themeContext";

console.log('ThemeContext:', ThemeContext)

export default function ContextIndex() {
  const [theme, setTheme] = useState('dark')

  // function toggleTheme() {
  //   setTheme(theme === 'dark' ? 'light' : 'dark')
  // }
  const toggleTheme = useCallback(() => {
    // setTheme(theme === 'dark' ? 'light' : 'dark')
    setTheme(theme => theme === 'dark' ? 'light' : 'dark')
  } , [])

  return <div>
    <ThemeContext.Provider value={themes[theme]}>
      <Toolbar></Toolbar>
    </ThemeContext.Provider>
    <button onClick={toggleTheme}>toggle theme: {theme}</button>
  </div>
}

function Toolbar() {
  return <div>
    <ThemeButton></ThemeButton>
  </div>
}

function ThemeButton() {
  const theme = useContext(ThemeContext)
  return (
    <div>
      <button style={{
        color: theme.foreground,
        backgroundColor: theme.background,
      }}>
        I am styled by theme context!
      </button>

      <code>{JSON.stringify(theme)}</code>
    </div>
  )
}
