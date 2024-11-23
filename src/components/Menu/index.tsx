import {
  CaretDown,
  Chats,
  CheckSquare,
  Gear,
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
  NavbarBrand, Label, Card, SidebarDropdown, SidebarCollapse, SidebarDropdownList, Button
} from 'keep-react'
import './index.css'
import {Link} from "react-router-dom"
import {IUser} from "../../types/User.type.ts";
import {ICampaign} from "../../types/Campaigns.type.ts"

interface Props {
  user: IUser
  campaigns: ICampaign[]
  showCreateCampaignModal: () => void
}

export const Menu = ({user, campaigns, showCreateCampaignModal}: Props) => {
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
              <HouseLine size={20} />
              Dashboard
            </SidebarItem>
          </Link>
          <Link to="/campaign">
            <SidebarItem>
              <PresentationChart size={20} />
              Campaign
            </SidebarItem>
          </Link>
          {/*<SidebarItem dropdown>*/}
          {/*  <SidebarDropdown>*/}
          {/*    <SidebarCollapse>*/}
          {/*      <div className="flex items-center gap-3">*/}
          {/*        <span>*/}
          {/*          <PresentationChart size={20} />*/}
          {/*        </span>*/}
          {/*        <span>Campaigns</span>*/}
          {/*      </div>*/}
          {/*      <span className="group-open:-rotate-180">*/}
          {/*        <CaretDown size={20} />*/}
          {/*      </span>*/}
          {/*    </SidebarCollapse>*/}

          {/*    <SidebarDropdownList>*/}
          {/*      {campaigns.map((campaign: Campaign) => (*/}
          {/*        <SidebarItem>*/}
          {/*          <Link to={`/campaign/${campaign.id}`}>*/}
          {/*            {campaign.name}*/}
          {/*          </Link>*/}
          {/*        </SidebarItem>*/}
          {/*      ))}*/}
          {/*    </SidebarDropdownList>*/}
          {/*  </SidebarDropdown>*/}
          {/*</SidebarItem>*/}
          <Link to="/comments">
            <SidebarItem>
              <Chats size={20} />
              Comments
            </SidebarItem>
          </Link>
          <Link to='/prospects'>
            <SidebarItem>
              <CheckSquare size={20} />
              Prospects
            </SidebarItem>
          </Link>
          <Link to='/settings'>
            <SidebarItem>
              <Gear size={20} />
              Settings
            </SidebarItem>
          </Link>
        </SidebarList>
        <div className="flex justify-start">
          <Button variant="outline" onClick={showCreateCampaignModal}>
            <PlusCircle size={18} className="mr-1.5" />
            <span className="lowercase">Add a campaign</span>
          </Button>
        </div>
      </SidebarBody>
      <SidebarFooter>
        <Avatar>
          <AvatarImage src="/images/avatar/avatar-1.png" alt="avatar" />
          <AvatarFallback>KR</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-body-4 font-medium text-metal-400 text-start dark:text-white">{user.name}</p>
          <p className="text-body-4 font-normal text-metal-300 text-start dark:text-metal-400">{user.email}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
