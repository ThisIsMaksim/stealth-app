import { observer } from "mobx-react"
import { useStores } from "../../stores"
import { IChangeCampaignRequest } from "../../types/Campaigns.type"
import { Text, Button, TextInput, useToaster, Switch } from '@gravity-ui/uikit'
import { useState, useCallback, useEffect } from "react"
import { fetchWithDelay } from "../../utils/fetchWithDelay"

export const CampaignNameAndStatus = observer(() => {
    const { UserStore, CampaignsStore } = useStores()
    const campaign = CampaignsStore.activeCampaign
    const [editingField, setEditingField] = useState<boolean>(false)
    const [editedValue, setEditedValue] = useState<string>(campaign?.name)
    const [active, setActive] = useState<boolean>(campaign.is_active)
    const [pending, setPending] = useState<boolean>(false)
    const {add} = useToaster()

    const handleEdit = useCallback((currentValue: string) => {
        setEditingField(true)
        setEditedValue(currentValue)
    }, [])

    const handleSave = useCallback(async () => {
        setPending(true)
        try {
        const updatedContext: IChangeCampaignRequest = {
            name: editedValue,
            is_active: campaign.is_active
        }
        await fetchWithDelay<IChangeCampaignRequest, void>(
            CampaignsStore.changeCampaign.bind(CampaignsStore),
            updatedContext
        )
        setEditingField(false)
        add({name: 'success', title: 'Changes saved successfully', theme: 'success'})
        } catch (error) {
        add({name: 'error', title: 'Failed to save changes', theme: 'danger'})
        } finally {
        setPending(false)
        }
    }, [UserStore, campaign, editedValue])

    const toggleStatus = useCallback(async () => {
      try {
      const updatedContext: IChangeCampaignRequest = {
          name: campaign.name,
          is_active: !campaign.is_active
      }
      await fetchWithDelay<IChangeCampaignRequest, void>(
          CampaignsStore.changeCampaign.bind(CampaignsStore),
          updatedContext
      )
      } catch (error) {
        add({name: 'error', title: 'Failed to save changes', theme: 'danger'})
      }
  }, [UserStore, campaign])

    const handleCancel = useCallback(() => {
        setEditingField(null)
        setEditedValue('')
    }, [])

    useEffect(() => {
      setActive(campaign?.is_active)
    }, [campaign?.is_active])

    return (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
                <Text variant="body-2" color="secondary">Campaign name</Text>
            </div>
            {editingField ? (
              <div className="flex flex-col gap-2">
                <TextInput
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button view="action" size="m" onClick={() => handleSave()} disabled={pending} loading={pending}>
                    Save
                  </Button>
                  <Button view="outlined" size="m" onClick={handleCancel} disabled={pending}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <Text variant="body-1">{campaign?.name}</Text>
                <Button view="flat" size="m" onClick={() => handleEdit(campaign?.name || '')}>
                  Edit
                </Button>
              </div>
            )}
        </div>
        <div className="flex justify-between items-center">
          <Text variant="body-2" color="secondary">Campaig status</Text>
          <Switch
              title={active ? 'Active' : 'Disactive'}
              checked={active}
              onUpdate={toggleStatus}
          />
        </div>
      </div>
    )
})
