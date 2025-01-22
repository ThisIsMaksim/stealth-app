import {
  Drawer, DrawerAction, DrawerContent, Navbar,
  NavbarContainer,
  NavbarList,
  Select,
  SelectAction,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from 'keep-react'
import {useCallback} from "react"
import {observer} from "mobx-react"
import {ICampaign} from "../types/Campaigns.type.ts"
import {ThemeSwitcher} from "./ThemeSwitcher"
import {PlusCircle} from "phosphor-react"
import {ModalType} from "../stores/modal.store.ts"
import {useStores} from "../stores"
import {Menu} from "./Menu"

interface Props {
  activeCampaign: ICampaign
  campaigns: ICampaign[]
  onChange: (campaign?: ICampaign) => void
}

const MobileMenu = observer(() => {
  const { ModalStore, CampaignsStore } = useStores()
  return (
    <Drawer showCloseIcon={false}>
      <DrawerAction asChild>
        <button className="rounded-lg bg-primary-25 p-2.5 dark:bg-white w-[40px] h-[40px]">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
            <path
              d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </button>
      </DrawerAction>
      <DrawerContent className="w-[250px] p-0" position="left">
        <Menu
          campaigns={CampaignsStore.campaigns}
          activeCampaign={CampaignsStore.activeCampaign}
          onChange={(campaign) => CampaignsStore.setActiveCampaign(campaign)}
          showCreateCampaignModal={() => ModalStore.open(ModalType.CreateCampaign)}
        />
      </DrawerContent>
    </Drawer>
  )
})

export const Header = observer(({campaigns, activeCampaign, onChange}: Props) => {
  const { ModalStore } = useStores()
  const handleChange = useCallback((id: string) => {
    onChange(campaigns.find((c) => c.id === id))
  }, [campaigns, onChange])

  return (
    <Navbar className="lg:hidden">
      <NavbarContainer className="h-[44px] pr-[16px] pl-[16px]">
        <NavbarList className="flex flex-row justify-between w-[100%]">
          <div className="flex flex-row gap-2 max-w-[350px] w-[100%]">
            <MobileMenu />
            {!!activeCampaign && (
              <Select
                value={activeCampaign.id}
                onValueChange={handleChange}
              >
                <SelectAction>
                  <SelectValue
                    id="active-campaign"
                    placeholder={`Campaign: ${activeCampaign.name}`}
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
            )}
          </div>
          <div className="flex flex-row gap-2 lg:hidden">
            <button id="add-campaign" className="rounded-lg bg-primary-25 p-2.5 dark:bg-white"
                    onClick={() => ModalStore.open(ModalType.CreateCampaign)}>
              <PlusCircle size={20} className="text-gray-900"/>
            </button>
            <ThemeSwitcher />
          </div>
        </NavbarList>
        <NavbarList>
          <ThemeSwitcher />
        </NavbarList>
      </NavbarContainer>
    </Navbar>
  )
})

