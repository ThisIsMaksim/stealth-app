import {useCallback} from "react"
import {
  Chats, HouseLine, LinkedinLogo, PlusCircle,
  PresentationChart, SignOut,
} from 'phosphor-react'
import {
  Avatar,
  AvatarImage,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarList,
  AvatarFallback,
  NavbarBrand, Label, Card, Button,
  Dropdown, DropdownAction, DropdownContent,
  DropdownGroup, DropdownItem, Divider
} from 'keep-react'
import './index.css'
import {Link, useLocation} from "react-router-dom"
import {IUser} from "../../types/User.type.ts"
import {ICampaign} from "../../types/Campaigns.type.ts"
import {useStores} from "../../stores"
import {ModalType} from "../../stores/modal.store.ts"
import {observer} from "mobx-react";
import {PulseLoader} from "react-spinners"

interface Props {
  campaigns: ICampaign[]
  showCreateCampaignModal: () => void
}

export const Menu = ({showCreateCampaignModal}: Props) => {
  const { UserStore, ModalStore } = useStores()
  const location = useLocation()

  const handleBindLinkedInAccount = useCallback(() => {
    ModalStore.open(
      ModalType.BindLinkedInAccount,
      {
        locations: UserStore.locations,
      },
      () => UserStore.needCheckLinkedinAccountStatus = false
    )
  }, [UserStore, ModalStore])

  const handleLogout = useCallback(async () => {
    UserStore.logout(
      () => {
        window.location.href= '/signin'
      }
    )
  }, [UserStore])

  return (
    <Sidebar className="Menu">
      <SidebarBody>
        <NavbarBrand className="flex flex-row gap-1">
          <Card className="w-11 h-11 bg-metal-600 dark:bg-metal-300 shadow-sm">
            <Label className="text-heading-5 text-white dark:text-metal-600">S.</Label>
          </Card>
          <Label className="text-heading-5">stealth</Label>
        </NavbarBrand>
        <SidebarList>
          <Link to="/">
            <SidebarItem className={location.pathname === '/' ? 'bg-blue-700 text-gray-50' : ''}>
              <HouseLine size={20}/>
              Dashboard
            </SidebarItem>
          </Link>
          <Link to="/campaign">
            <SidebarItem className={location.pathname === '/campaign' ? 'bg-blue-700 text-gray-50' : ''}>
              <PresentationChart size={20}/>
              Workspace
            </SidebarItem>
          </Link>
          <Link to="/comments">
            <SidebarItem className={location.pathname === '/comments' ? 'bg-blue-700 text-gray-50' : ''}>
              <Chats size={20}/>
              Comments
            </SidebarItem>
          </Link>
        </SidebarList>
        <div className="flex justify-start">
          <Button id="add-campaign" variant="outline" onClick={showCreateCampaignModal}>
            <PlusCircle size={18} className="mr-1.5"/>
            <span className="lowercase">Add a campaign</span>
          </Button>
        </div>
      </SidebarBody>
      <SidebarFooter className="flex flex-col gap-4 items-start">
        <LinkedIn
          user={UserStore.user}
          handleBindLinkedInAccount={handleBindLinkedInAccount}
        />
        <Divider className="w-[100%]" />
        <User
          user={UserStore.user}
          handleLogout={handleLogout}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

interface LinkedInProps {
  user: IUser
  handleBindLinkedInAccount: () => void
}

const LinkedIn = observer((props: LinkedInProps) => {
  const { user, handleBindLinkedInAccount } = props

  if (!user?.linkedin_account) {
    return (
      <Button variant="outline" className="flex flex-row gap-1 p-4" onClick={handleBindLinkedInAccount}>
        <LinkedinLogo size={28} />
        LinkedIn connect
      </Button>
    )
  }

  if (user?.linkedin_account?.status === 'new') {
    return (
      <div className="flex flex-row gap-2 p-0 cursor-pointer">
        <LinkedinLogo size={28}/>
        <div>
          <p className="text-body-4 font-medium text-metal-400 text-start dark:text-white">
            Try to connect
          </p>
          <p
            className="w-[150px] text-body-4 font-normal text-metal-300 text-start dark:text-metal-400 lowercase overflow-hidden whitespace-nowrap"
            style={{textOverflow: 'ellipsis'}}
          >
            <PulseLoader size={8} color="rgb(27, 77, 255)" />
          </p>
        </div>
      </div>
    )
  }

  return (
    <Dropdown>
      <DropdownAction asChild>
        <div className="flex flex-row gap-2 p-0 cursor-pointer">
          <LinkedinLogo size={28}/>
          <div>
            <p className="text-body-4 font-medium text-metal-400 text-start dark:text-white">
              {user.linkedin_account?.name}
            </p>
            <p
              className="w-[150px] text-body-4 font-normal text-metal-300 text-start dark:text-metal-400 lowercase overflow-hidden whitespace-nowrap"
              style={{textOverflow: 'ellipsis'}}
            >
            Status: {user.linkedin_account?.status}
            </p>
          </div>
        </div>
      </DropdownAction>
      <DropdownContent align="start" className="p-2 border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
        <DropdownGroup>
          <DropdownItem onClick={handleBindLinkedInAccount}>
            Reconnect
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  )
})

interface UserProps {
  user: IUser
  handleLogout: () => void
}

const User = observer(({ user, handleLogout }: UserProps) => {
  return (
    <Dropdown>
      <DropdownAction asChild>
        <div id="user" className="flex flex-row gap-2 p-0 cursor-pointer">
          <Avatar>
            <AvatarImage src={user.linkedin_account?.avatar_url} alt="avatar" />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-body-4 font-medium text-metal-400 text-start dark:text-white">{user.name}</p>
            <p className="text-body-4 font-normal text-metal-300 text-start dark:text-metal-400 lowercase">{user.email}</p>
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
