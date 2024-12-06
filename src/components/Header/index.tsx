import {
  Navbar,
  NavbarContainer,
  NavbarList,
  Select,
  SelectAction,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  Switch,
  toast,
  Tooltip, TooltipAction, TooltipContent,
  TooltipProvider,
} from 'keep-react'
import {ThemeSwitcher} from "../ThemeSwitcher"
import './index.css'
import {ICampaign} from "../../types/Campaigns.type.ts"
import {useCallback, useEffect, useState} from "react";
import {useStores} from "../../stores";
import {observer} from "mobx-react";

interface Props {
  activeCampaign: ICampaign
  campaigns: ICampaign[]
  onChange: (campaign?: ICampaign) => void
}

export const Header = observer(({campaigns, activeCampaign, onChange}: Props) => {
  const {CampaignsStore} = useStores()
  const [isActive, setActive] = useState<boolean>(CampaignsStore.activeCampaign?.is_active)

  const handleChange = useCallback((id: string) => {
    onChange(campaigns.find((c) => c.id === id))
  }, [campaigns, onChange])

  const handleChangeStatus = useCallback(async (value: boolean) => {
    setActive(value)

    const campaign = CampaignsStore.activeCampaign

    CampaignsStore.changeCampaign({
      name: campaign.name,
      company_context: campaign.company_context,
      owner_context: campaign.owner_context,
      is_active: value,
    }, (error) => {
      if (error) {
        toast.error(error)

        setActive(!value)
      }
    })
  }, [CampaignsStore])

  useEffect(() => {
    setActive(CampaignsStore.activeCampaign?.is_active)
  }, [CampaignsStore.activeCampaign])

  return (
    <Navbar>
      <NavbarContainer className="Header">
        <NavbarList>
          {!!activeCampaign && (
            <Select
              value={activeCampaign.id}
              onValueChange={handleChange}
            >
              <SelectAction className="w-[20rem]">
                <SelectValue
                  placeholder={`Campaign: ${activeCampaign.name}`}
                />
              </SelectAction>
              <SelectContent>
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
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipAction>
                <Switch checked={isActive} onCheckedChange={handleChangeStatus}/>
              </TooltipAction>
              <TooltipContent>
                <p className="text-body-5 font-medium text-white">
                  {isActive ? 'Deactivate campaign' : 'Activate campaign'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavbarList>
        <NavbarList>
          <ThemeSwitcher />
        </NavbarList>
      </NavbarContainer>
    </Navbar>
  )
})

