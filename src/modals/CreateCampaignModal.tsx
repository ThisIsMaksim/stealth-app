import {useCallback, useState} from "react";
import {useStores} from "../stores";
import {YM} from "../utils/ym.ts";
import { Modal, TextInput, Button, Text } from "@gravity-ui/uikit";

interface Props {
  isOpen: boolean
  close: () => void
}

export const CreateCampaignModal = ({isOpen, close}: Props) => {
  const { CampaignsStore } = useStores()
  const [name, setName] = useState("")
  const [pending, setPending] = useState(false)

  const handleCreateCampaign = useCallback(async () => {
    YM.richGoal('create-campaign')

    setPending(true)

    await CampaignsStore.createCampaign({name, company_context: '', owner_context: ''})

    setPending(false)

    close()
  }, [CampaignsStore, close, name])

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <div className="space-y-4 p-6">
        <Text variant="header-2">Create campaign</Text>
        <TextInput
          placeholder="Campaign name"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex gap-2">
          <Button view="action" onClick={handleCreateCampaign} loading={pending}>Create</Button>
          <Button view="flat" onClick={close} disabled={pending}>Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}