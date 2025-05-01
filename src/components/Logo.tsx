import { observer } from "mobx-react"
import logo from "../assets/logo.png"
import logo_white from "../assets/logo-white.png"
import { useTheme } from "../ThemeProvider"

export const Logo = observer(() => {
  const {theme} = useTheme()

  return (
    <div id="logo" className="flex flex-row items-center gap-1">
      <img
          className="flex-shrink-0 h-[32px]"
          src={theme === 'dark' ? logo : logo_white}
          alt="logo"
        />
    </div>
  )
})