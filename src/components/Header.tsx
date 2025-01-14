import {
  Card, Label,
  Navbar, NavbarBrand,
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

interface Props {
  activeCampaign: ICampaign
  campaigns: ICampaign[]
  onChange: (campaign?: ICampaign) => void
}

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
            <NavbarBrand className="flex lg:hidden flex-row gap-1">
              <Card className="w-11 h-11 bg-metal-600 dark:bg-metal-300 shadow-sm">
                <Label className="text-heading-5 text-white dark:text-metal-600">S.</Label>
              </Card>
            </NavbarBrand>
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
            <button id="add-campaign" className="rounded-lg bg-primary-25 p-2.5 dark:bg-white" onClick={() => ModalStore.open(ModalType.CreateCampaign)}>
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

