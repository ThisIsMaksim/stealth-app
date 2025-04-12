import { observer } from "mobx-react"
import { useCallback } from "react"
import { Logo } from "../../components/Logo"
import { useStores } from "../../stores"
import { ComponentProps } from "../../types/Component"
import { User } from "./User"
import { Button } from "@gravity-ui/uikit"
import {ArrowRightFromLine} from '@gravity-ui/icons'
import { ThemeSwitcher } from "../../components/ThemeSwitcher"

interface HeaderProps extends ComponentProps {}

export const Header = observer(({className}: HeaderProps) => {
  const { UserStore } = useStores()
  const user = UserStore.user

  const handleLogout = useCallback(async () => {
    UserStore.logout(
      () => {
        window.location.href= '/signin'
      }
    )
  }, [UserStore])

  return (
    <div className={`fixed top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-black border-b border-metal-100 dark:border-metal-800 ${className}`}>
      <div className="flex items-center space-x-4">
        <Logo />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <User
            className="cursor-pointer"
            name={user?.name}
            subtitle={user?.email}
            avatarSrc={user?.linkedin_account?.avatar_url}
          />
          <Button
            className="flex items-center justify-center"
            view="flat"
            size="l"
            onClick={handleLogout}
            title="Logout"
          >
            <ArrowRightFromLine />
          </Button>
        </div>
      </div>
    </div>
  )
}) 