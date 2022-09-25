import React, { useContext } from "react";
import ThemeContext from "./themeContext";

function ThemeButton() {
  const theme = useContext(ThemeContext)
  return <button style={{ color: theme.foreground, backgroundColor: theme.background, border: 0 }}>I am styled by theme context!</button>
}

export default function ContextIndex() {
  const value = useContext(ThemeContext)
  return <div>
    <pre>
      <code>{JSON.stringify(value)}</code>
    </pre>
    <ThemeButton></ThemeButton>
  </div>
}
