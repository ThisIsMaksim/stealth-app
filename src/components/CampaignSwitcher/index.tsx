import { useState } from 'react'
import {
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownRadioGroup,
  DropdownRadioItem,
} from 'keep-react'
import './index.css'

export const CampaignSwitcher = () => {
  const [campaign, setCampaign] = useState('Campaign 1')

  return (
    <Dropdown>
      <DropdownAction asChild>
        <Button color="secondary" className="bg-metal-400 dark:bg-metal-100">
          Active campaign: {campaign}
        </Button>
      </DropdownAction>
      <DropdownContent className="border-metal-200 border">
        <DropdownRadioGroup value={campaign} onValueChange={setCampaign}>
          <DropdownRadioItem value="Campaign 1">Campaign 1</DropdownRadioItem>
          <DropdownRadioItem value="Campaign 2">Campaign 2</DropdownRadioItem>
          <DropdownRadioItem value="Campaign 3">Campaign 3</DropdownRadioItem>
          <DropdownRadioItem value="Campaign 4">Campaign 4</DropdownRadioItem>
        </DropdownRadioGroup>
      </DropdownContent>
    </Dropdown>
  )
}

