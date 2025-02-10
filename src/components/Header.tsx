import {
  Button,
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
import {ThemeSwitcher} from "./ThemeSwitcher"
import {PlusCircle} from "phosphor-react"
import {ModalType} from "../stores/modal.store"
import {useStores} from "../stores"
import {Menu} from "./Menu"
import {User} from "./User"
import {ComponentProps} from "../types/Component.ts"

const MobileMenu = observer(() => {
  return (
    <Drawer showCloseIcon={false}>
      <DrawerAction asChild>
        <button className="lg:hidden rounded-lg bg-primary-25 p-2.5 dark:bg-white w-[40px] h-[40px]">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
            <path
              d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </button>
      </DrawerAction>
      <DrawerContent className="w-[250px] p-0" position="left">
        <Menu />
      </DrawerContent>
    </Drawer>
  )
})

const AddCampaignButton = observer(({ className }: ComponentProps) => {
  const {ModalStore} = useStores()

  return (
    <div className={className}>
      <button id="add-campaign" className="block lg:hidden rounded-lg bg-primary-25 p-2.5 dark:bg-white"
              onClick={() => ModalStore.open(ModalType.CreateCampaign)}>
        <PlusCircle size={20} className="text-gray-900"/>
      </button>
      <Button id="add-campaign" className="hidden lg:flex" variant="outline" onClick={() => ModalStore.open(ModalType.CreateCampaign)}>
        <PlusCircle size={18} className="mr-1.5"/>
        <span className="lowercase">Add a campaign</span>
      </Button>
    </div>
  )
})

export const Header = observer(() => {
  const { CampaignsStore } = useStores()
  const activeCampaign = CampaignsStore.activeCampaign
  const campaigns = CampaignsStore.campaigns

  const handleChange = useCallback((id: string) => {
    CampaignsStore.setActiveCampaign(campaigns.find((c) => c.id === id))
  }, [campaigns.length])

  return (
    <Navbar>
      <NavbarContainer className="h-[24px] pr-[16px] pl-[16px]">
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
            <AddCampaignButton className="hidden lg:block" />
          </div>
          <div className="flex flex-row gap-2 lg:hidden">
            <AddCampaignButton />
            <ThemeSwitcher />
          </div>
        </NavbarList>
        <NavbarList>
          {/*<UpgradePlan />*/}
          <User className="max-md:hidden" />
          <ThemeSwitcher />
        </NavbarList>
      </NavbarContainer>
    </Navbar>
  )
})

