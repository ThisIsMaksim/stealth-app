import { observer } from "mobx-react"
import { useStores } from "../../stores"
import { IPersonalContext } from "../../types/Campaigns.type"
import { Text, Button, TextArea, useToaster, Tooltip } from '@gravity-ui/uikit'
import {CircleQuestionFill} from '@gravity-ui/icons'
import { useState, useCallback, useEffect } from "react"
import { fetchWithDelay } from "../../utils/fetchWithDelay"

interface Props {
  title: string
  fieldName: string
  description?: string
}

export const ProfileAttributes = observer((props: Props) => {
    const {title, fieldName, description} = props
    const { UserStore, CampaignsStore } = useStores()
    const campaign = CampaignsStore.activeCampaign
    const [editingField, setEditingField] = useState<boolean>(false)
    const [editedValue, setEditedValue] = useState<string>(campaign?.personal_context?.[fieldName])
    const [pending, setPending] = useState<boolean>(false)
    const {add} = useToaster()

    const handleEdit = useCallback((currentValue: string) => {
        setEditingField(true)
        setEditedValue(currentValue)
    }, [])

    const handleSave = useCallback(async () => {
        setPending(true)
        try {
        const updatedContext = {
            ...campaign?.personal_context,
            [fieldName]: editedValue,
        }
        await fetchWithDelay<IPersonalContext, void>(
            CampaignsStore.changePersonalContext.bind(CampaignsStore),
            updatedContext
        )
        setEditingField(false)
        add({name: 'success', title: 'Changes saved successfully', theme: 'success'})
        } catch (error) {
        add({name: 'error', title: 'Failed to save changes', theme: 'danger'})
        } finally {
        setPending(false)
        }
    }, [UserStore, campaign?.personal_context, editedValue])

    const handleCancel = useCallback(() => {
        setEditingField(null)
        setEditedValue('')
    }, [])

    useEffect(() => {
      setEditedValue(campaign?.personal_context?.[fieldName])
    }, [fieldName])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
                <Text variant="body-2" color="secondary">{title}</Text>
                {description && (
                    <Tooltip
                      className="p-2 border-[1px] border-gray-500"
                      openDelay={100}
                      content={description}
                    >
                        <div tabIndex={0}>
                            <CircleQuestionFill className="text-secondary" />
                        </div>
                    </Tooltip>
                )}
            </div>
            {editingField ? (
              <div className="flex flex-col gap-2">
                <TextArea
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  minRows={3}
                  maxRows={6}
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
                <Text variant="body-1">{campaign?.personal_context?.[fieldName] || 'Not specified'}</Text>
                <Button view="flat" size="m" onClick={() => handleEdit(campaign?.personal_context?.[fieldName] || '')}>
                  Edit
                </Button>
              </div>
            )}
        </div>
    )
})
