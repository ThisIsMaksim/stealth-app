import { useCallback } from "react"
import { Card, Text, Button, Select } from '@gravity-ui/uikit'
import { useNavigate } from "react-router-dom"
import { useStores } from "../../stores"
import { ModalType } from "../../stores/modal.store"
import { CampaignNotActive } from "./CampaignNotActive"

export const SelectCampaign = () => {
  const { CampaignsStore, ModalStore } = useStores()
  const navigate = useNavigate()

  const handleSelectCampaign = useCallback((campaignId: string) => {
    const selectedCampaign = CampaignsStore.campaigns.find(c => c.id === campaignId)
    if (selectedCampaign) {
      CampaignsStore.setActiveCampaign(selectedCampaign)
    }
  }, [CampaignsStore])

  return (
    <Card id="current-campaign" className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="normal">
      <div className="flex flex-col items-center space-y-4 p-2 text-start">
        <Text variant="header-2" className="text-center">
          Your Campaign
        </Text>
        {!CampaignsStore.activeCampaign?.is_active && <CampaignNotActive />}
        <Select
            className="w-full"
            value={[CampaignsStore.activeCampaign?.id || '']}
            onUpdate={(items: string[]) => handleSelectCampaign(items[0])}
            options={CampaignsStore.campaigns.map(campaign => ({
                value: campaign.id,
                content: campaign.name
            }))}
            placeholder="Select campaign"
            multiple={false}
            size="xl"
        />
        <div className="flex flex-row gap-4 mt-4">
            <Button
                id="add-new-campaign"
                view="action" 
                size="l"
                onClick={() => ModalStore.open(ModalType.CreateCampaign)}
            >
                Add Campaign
            </Button>
            <Button
                id="setting-current-campaign"
                view="normal"
                size="l" 
                onClick={() => navigate('/campaign-settings')}
            >
                Settings
            </Button>
        </div>
      </div>
    </Card>
  )
} 