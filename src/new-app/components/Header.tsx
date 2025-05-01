import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { Logo } from "../../components/Logo"
import { useStores } from "../../stores"
import { ComponentProps } from "../../types/Component"
import { User } from "./User"
import { Button, Popover, Icon } from "@gravity-ui/uikit"
import { ArrowRightFromLine, Bell, Clock } from '@gravity-ui/icons'
import { ThemeSwitcher } from "../../components/ThemeSwitcher"
import { CommentFill } from '@gravity-ui/icons'
import { Notifications } from "./Notifications"
import { Operations } from "./Operations"

interface HeaderProps extends ComponentProps {}

export const Header = observer(({className}: HeaderProps) => {
  const { UserStore, NotificationStore, OperationsStore, CampaignsStore } = useStores()
  const user = UserStore.user
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isOperationsOpen, setIsOperationsOpen] = useState(false)

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

  const operations = OperationsStore.operations

  useEffect(() => {
    if (!CampaignsStore.activeCampaign) return

    OperationsStore.fetchOperations(CampaignsStore.activeCampaign?.id)

    const interval = setInterval(() => {
      if (!CampaignsStore.activeCampaign) return

      OperationsStore.fetchOperations(CampaignsStore.activeCampaign?.id)
    }, 30000)

    return () => clearInterval(interval)
  }, [CampaignsStore.activeCampaign])

  const hasUnreadNotifications = NotificationStore.hasUnread
  const hasPendingOperations = operations.length > 0

  return (
    <div className={`fixed top-0 z-10 flex items-center justify-between p-4 pt-2 pb-2 bg-white dark:bg-black border-b border-metal-100 dark:border-metal-800 ${className}`}>
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
            content={<Operations />}
            placement="bottom-end"
            open={isOperationsOpen}
            onOpenChange={setIsOperationsOpen}
          >
            <Button
              id="operations"
              className="relative flex items-center justify-center"
              view="flat"
              size="l"
              title="Operations"
            >
              <Icon data={Clock} />
              {hasPendingOperations && (
                 <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-black"></span>
              )}
            </Button>
          </Popover>
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