import {observer} from "mobx-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownGroup, DropdownItem
} from "keep-react"
import {SignOut} from "phosphor-react"
import {useCallback} from "react";
import {useStores} from "../stores"
import {ComponentProps} from "../types/Component.ts"

export const User = observer(({ className }: ComponentProps) => {
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
    <Dropdown>
      <DropdownAction asChild>
        <div id="user" className={`${className} flex flex-row gap-2 p-0 cursor-pointer`}>
          <Avatar>
            <AvatarImage src={user.linkedin_account?.avatar_url} alt="avatar" />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-body-4 font-medium text-metal-400 text-start dark:text-white">{user.name}</p>
            <p
              className="w-[140px] text-body-4 font-normal text-metal-300 text-start dark:text-metal-400 lowercase overflow-hidden whitespace-nowrap"
              style={{textOverflow: 'ellipsis'}}
            >
              {user.email}
            </p>
          </div>
        </div>
      </DropdownAction>
      <DropdownContent align="start" className="p-2 border border-metal-100 dark:border-metal-800 dark:bg-metal-900">
        <DropdownGroup>
          <DropdownItem onClick={handleLogout}>
            <SignOut size={20} />
            Logout
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  )
})