import {observer} from "mobx-react"
import {Alert, AlertContainer, AlertDescription, AlertIcon, Button, toast} from "keep-react"
import {useStores} from "../stores"
import {Action, fetchWithDelay} from "../utils/fetchWithDelay.ts"
import { IChangeCampaignRequest } from "../types/Campaigns.type.ts"
import {useCallback, useState} from "react"

export const UnActiveCampaign = observer(() => {
  const { CampaignsStore } = useStores()
  const [isPending, setPending] = useState(false)

  const handleActivateCampaign = useCallback(async () => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const result = await fetchWithDelay<IChangeCampaignRequest, Action<string>>(
        CampaignsStore.changeCampaign.bind(CampaignsStore),
        {
          name: CampaignsStore.activeCampaign.name,
          is_active: true,
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
  }, [CampaignsStore])

  return (
    <>
      {(CampaignsStore.activeCampaign && !CampaignsStore.activeCampaign?.is_active) && (
        <Alert color="error">
          <AlertContainer>
            <AlertIcon/>
            <AlertDescription>Campaign isn't active</AlertDescription>
          </AlertContainer>
          <AlertContainer>
            <Button variant="outline" disabled={isPending} onClick={handleActivateCampaign}>Activate</Button>
          </AlertContainer>
        </Alert>
      )}
    </>
  )
})
