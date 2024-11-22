import { MoonStars, SunDim } from "phosphor-react"
import { useTheme } from "../../ThemeProvider.tsx"
import {useCallback} from "react"

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme])

  return (
    <button className="rounded-lg bg-primary-25 p-2.5 dark:bg-white" onClick={handleChangeTheme}>
      <MoonStars size={20} color="#1C222B" className="hidden dark:block" />
      <SunDim size={20} color="#444" className="block dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}