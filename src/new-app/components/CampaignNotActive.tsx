import { Card, Text, Button, useToaster } from '@gravity-ui/uikit'
import { useStores } from '../../stores'
import { useCallback, useState } from 'react'
import { IChangeCampaignRequest } from '../../types/Campaigns.type'

export const CampaignNotActive = () => {
  const { CampaignsStore } = useStores()
  const [isPending, setPending] = useState(false)
  const {add} = useToaster()

  const handleActivate = useCallback(async () => {
    setPending(true)
    
    try {
      await CampaignsStore.changeCampaign({
        name: CampaignsStore.activeCampaign.name,
        is_active: true
      } as IChangeCampaignRequest, (error) => {
        if (error) {
          add({
            name: 'error',
            title: 'Error',
            content: 'Failed to activate campaign',
            theme: 'danger'
          })
        } else {
          add({
            name: 'success',
            title: 'Success',
            content: 'Campaign activated successfully',
            theme: 'success'
          })
        }
      })
    } finally {
      setPending(false)
    }
  }, [CampaignsStore])

  return (
    <Card view="filled" theme="danger" className="w-full">
      <div className="flex flex-col space-y-2 p-3">
        <Text variant="subheader-2">Campaign is not active</Text>
        <Text variant="body-2">
          Please click Activate to start working
        </Text>
        <Button 
          view="outlined-danger" 
          size="m" 
          className="mt-2"
          onClick={handleActivate}
          loading={isPending}
        >
          Activate
        </Button>
      </div>
    </Card>
  )
} 