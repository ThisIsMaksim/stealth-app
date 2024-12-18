import {useCallback, useEffect, useState} from "react";
import {
  Button,
  Input,
  Label, Select,
  SelectAction,
  SelectContent,
  SelectGroup, SelectItem,
  SelectValue
} from "keep-react";
import {ICampaign, IChangeCampaignRequest} from "../../../../types/Campaigns.type.ts";
import {observer} from "mobx-react";

interface Props {
  campaign: ICampaign;
  onSave: (request: IChangeCampaignRequest, action: (error?: string) => void) => void
}

export const CampaignSettings = observer(({ campaign, onSave }: Props) => {
  const [name, setName] = useState(campaign.name)
  const [status, setStatus] = useState(campaign.is_active)

  const handleSave = useCallback(async () => {
    onSave({
      name,
      company_context: campaign.company_context,
      owner_context: campaign.owner_context,
      is_active: campaign.is_active,
      tone_of_voice: campaign.tone_of_voice,
    }, () => {})
  }, [onSave, name, campaign])

  useEffect(() => {
    setName(campaign.name)
    setStatus(campaign.is_active)
  }, [campaign])

  return <div className=" space-y-4">
    <fieldset className="max-w-md space-y-4">
      <div className="flex justify-start">
        <Label className="text-heading-6">Campaign name</Label>
      </div>
      <div className="relative">
        <Input value={name} placeholder="Campaign name" onChange={(e) => setName(e.target.value)}/>
      </div>
    </fieldset>
    <fieldset className="max-w-md space-y-4">
      <div className="flex justify-start">
        <Label className="text-heading-6">Campaign status</Label>
      </div>
      <div className="relative">
        <Select value={`${status}`} onValueChange={(value) => setStatus(value === 'true')}>
          <SelectAction>
            <SelectValue placeholder="Select current location"/>
          </SelectAction>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Activate</SelectItem>
              <SelectItem value="false">Deactivate</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </fieldset>
    <div className="w-full flex justify-start">
      <Button onClick={handleSave}>Save</Button>
    </div>
  </div>
})