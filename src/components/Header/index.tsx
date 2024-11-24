import {
  Navbar,
  NavbarContainer,
  NavbarList, Select, SelectAction, SelectContent, SelectGroup, SelectItem, SelectValue,
} from 'keep-react'
import {ThemeSwitcher} from "../ThemeSwitcher"
import './index.css'
import {ICampaign} from "../../types/Campaigns.type.ts"
import {useCallback} from "react";

interface Props {
  activeCampaign: ICampaign
  campaigns: ICampaign[]
  onChange: (campaign?: ICampaign) => void
}

export const Header = ({campaigns, activeCampaign, onChange}: Props) => {
  const handleChange = useCallback((id: string) => {
    onChange(campaigns.find((c) => c.id === id))
  }, [campaigns])

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
        </NavbarList>
        <NavbarList>
          <ThemeSwitcher />
        </NavbarList>
      </NavbarContainer>
    </Navbar>
  )
}

