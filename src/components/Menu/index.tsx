import {useCallback} from "react"
import {
  Chats, LinkedinLogo, PlusCircle,
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
  NavbarBrand,
  Label,
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  Divider,
  Select,
  SelectAction,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Switch, Card
} from 'keep-react'
import {Link, useLocation} from "react-router-dom"
import {IUser} from "../../types/User.type.ts"
import {ICampaign} from "../../types/Campaigns.type.ts"
import {useStores} from "../../stores"
import {ModalType} from "../../stores/modal.store.ts"
import {observer} from "mobx-react";
import {PulseLoader} from "react-spinners"
import {useTheme} from "../../ThemeProvider.tsx"
import logo from '../../assets/logo.png'

interface Props {
  activeCampaign: ICampaign
  campaigns: ICampaign[]
  onChange: (campaign?: ICampaign) => void
  showCreateCampaignModal: () => void
}

export const Menu = ({showCreateCampaignModal, activeCampaign, campaigns, onChange}: Props) => {
  const { UserStore, ModalStore } = useStores()
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme])

  const handleChange = useCallback((id: string) => {
    onChange(campaigns.find((c) => c.id === id))
  }, [campaigns, onChange])

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
    <Sidebar className="min-w[220px] max-w-[250px] lg:max-w-[220px] h-[calc(100%)] lg:h-[calc(100%-32px)]">
      <SidebarBody>
        <NavbarBrand className="flex flex-row items-center gap-1">
          <Card>
            <img
              className="flex-shrink-0 w-[32px] h-[32px]"
              src={logo}
              alt="logo"
            />
          </Card>
          <Label className="text-heading-5">ELVYN.ai</Label>
        </NavbarBrand>
        <div className="flex flex-col justify-start gap-2">
          <Select
            value={activeCampaign?.id}
            onValueChange={handleChange}
          >
            <SelectAction>
              <SelectValue
                id="active-campaign"
                placeholder={`Campaign: ${activeCampaign?.name}`}
              />
            </SelectAction>
            <SelectContent className="border border-metal-100 dark:border-metal-800 dark:bg-gray-900">
              <SelectGroup>
                {campaigns.map((campaign) => (
                  <SelectItem
                    key={campaign.id}
                    value={campaign.id}
                  >
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button id="add-campaign" variant="outline" onClick={showCreateCampaignModal}>
            <PlusCircle size={18} className="mr-1.5"/>
            <span className="lowercase">Add a campaign</span>
          </Button>
        </div>
        <Divider className="w-[100%]"/>
        <SidebarList>
          {/*<Link to="/">*/}
          {/*  <SidebarItem className={location.pathname === '/' ? 'bg-blue-700 text-gray-50' : ''}>*/}
          {/*    <HouseLine size={20}/>*/}
          {/*    Dashboard*/}
          {/*  </SidebarItem>*/}
          {/*</Link>*/}
          <Link to="/">
            <SidebarItem className={location.pathname === '/' ? 'bg-blue-700 text-gray-50' : ''}>
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
        <Divider className="w-[100%]"/>
        <div className="flex flex-row gap-2">
          Dark mode
          <Switch variant='icon' checked={theme === 'dark'} onCheckedChange={handleChangeTheme} />
        </div>
      </SidebarBody>
      <SidebarFooter className="flex flex-col gap-4 items-start">
        <LinkedIn
          user={UserStore.user}
          handleBindLinkedInAccount={handleBindLinkedInAccount}
        />
        <Divider className="w-[100%]"/>
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
  const {user, handleBindLinkedInAccount} = props

  if (!user?.linkedin_account) {
    return (
      <Button variant="outline" className="flex flex-row gap-1 p-4" onClick={handleBindLinkedInAccount}>
        <LinkedinLogo size={28}/>
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
