import {
  Chats,
  HouseLine, PlusCircle,
  PresentationChart,
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
  NavbarBrand, Label, Card, Button
} from 'keep-react'
import './index.css'
import {Link} from "react-router-dom"
import {IUser} from "../../types/User.type.ts"
import {ICampaign} from "../../types/Campaigns.type.ts"
import {useStores} from "../../stores"

interface Props {
  user: IUser
  campaigns: ICampaign[]
  showCreateCampaignModal: () => void
}

export const Menu = ({user, showCreateCampaignModal}: Props) => {
  const {UserStore} = useStores()

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
            <SidebarItem>
              <HouseLine size={20}/>
              Dashboard
            </SidebarItem>
          </Link>
          <Link to="/campaign">
            <SidebarItem>
              <PresentationChart size={20}/>
              Workspace
            </SidebarItem>
          </Link>
          <Link to="/comments">
            <SidebarItem>
              <Chats size={20}/>
              Comments
            </SidebarItem>
          </Link>
          {/*<Link to='/settings'>*/}
          {/*  <SidebarItem>*/}
          {/*    <Gear size={20} />*/}
          {/*    Settings*/}
          {/*  </SidebarItem>*/}
          {/*</Link>*/}
        </SidebarList>
        <div className="flex justify-start">
          <Button variant="outline" onClick={showCreateCampaignModal}>
            <PlusCircle size={18} className="mr-1.5"/>
            <span className="lowercase">Add a campaign</span>
          </Button>
        </div>
      </SidebarBody>
      <SidebarFooter>
        <Avatar>
          <AvatarImage src={UserStore.user.linkedin_account?.avatar_url} alt="avatar" />
          <AvatarFallback>{UserStore.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-body-4 font-medium text-metal-400 text-start dark:text-white">{user.name}</p>
          <p className="text-body-4 font-normal text-metal-300 text-start dark:text-metal-400">{user.email}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
