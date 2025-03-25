import { MoonStars, SunDim } from "phosphor-react"
import { useTheme } from "../../ThemeProvider.tsx"
import {useCallback} from "react"
import { Colors } from '../../../src/colors';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme])

  return (
    <button className="rounded-lg bg-primary-25 p-2.5 dark:bg-white" onClick={handleChangeTheme}>
      <MoonStars size={20} color={Colors.gray[800]} className="hidden dark:block" />
      <SunDim size={20} color={Colors.gray[600]} className="block dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}