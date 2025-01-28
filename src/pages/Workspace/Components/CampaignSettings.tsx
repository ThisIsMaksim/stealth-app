import {useCallback, useEffect, useState} from "react"
import {
  Button,
  Input,
  Label, Select,
  SelectAction,
  SelectContent,
  SelectGroup, SelectItem,
  SelectValue, toast
} from "keep-react"
import {ICampaign, IChangeCampaignRequest} from "../../../types/Campaigns.type"
import {observer} from "mobx-react"
import {Action, fetchWithDelay} from "../../../utils/fetchWithDelay"
import {useStores} from "../../../stores"

interface Props {
  campaign: ICampaign
}

export const CampaignSettings = observer(({ campaign }: Props) => {
  const { CampaignsStore } = useStores()
  const [name, setName] = useState(campaign.name)
  const [status, setStatus] = useState(campaign.is_active)
  const [isPending, setPending] = useState(false)

  const handleSave = useCallback(async () => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const result = await fetchWithDelay<IChangeCampaignRequest, Action<string>>(
        CampaignsStore.changeCampaign.bind(CampaignsStore),
        {
          name,
          is_active: status,
        }
      )

      setPending(false)

      if (result.error) {
        reject()
      } else {
        resolve()
      }
    })

    toast.promise(promise, {
      loading: 'Changing...',
      success: 'Done',
      error: 'Something went wrong',
    })
  }, [name, campaign, status])

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
      <Button disabled={isPending} onClick={handleSave}>Save</Button>
    </div>
  </div>
})