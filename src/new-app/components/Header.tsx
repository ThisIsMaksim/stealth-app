import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { Logo } from "../../components/Logo"
import { useStores } from "../../stores"
import { ComponentProps } from "../../types/Component"
import { User } from "./User"
import { Button, Popover, Icon } from "@gravity-ui/uikit"
import { ArrowRightFromLine, Bell } from '@gravity-ui/icons'
import { ThemeSwitcher } from "../../components/ThemeSwitcher"
import { CommentFill } from '@gravity-ui/icons'
import { Notifications } from "./Notifications"

interface HeaderProps extends ComponentProps {}

export const Header = observer(({className}: HeaderProps) => {
  const { UserStore, NotificationStore } = useStores()
  const user = UserStore.user
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const handleLogout = useCallback(async () => {
    UserStore.logout(
      () => {
        window.location.href= '/signin'
      }
    )
  }, [UserStore])

  const handleSupportClick = useCallback(() => {
    window.open('https://t.me/elvyn_ai', '_blank')
  }, [])

  const hasUnreadNotifications = NotificationStore.hasUnread

  return (
    <div className={`fixed top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-black border-b border-metal-100 dark:border-metal-800 ${className}`}>
      <div className="flex items-center space-x-4">
        <Logo />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-4">
          <Button
            className="flex items-center justify-center"
            view="flat"
            size="l"
            onClick={handleSupportClick}
            title="support"
          >
            <CommentFill />
          </Button>
          <Popover
            content={<Notifications />}
            placement="bottom-end"
            open={isNotificationsOpen}
            onOpenChange={setIsNotificationsOpen}
          >
            <Button
              className="relative flex items-center justify-center"
              view="flat"
              size="l"
              title="Уведомления"
            >
              <Icon data={Bell} />
              {hasUnreadNotifications && (
                 <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black"></span>
              )}
            </Button>
          </Popover>
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