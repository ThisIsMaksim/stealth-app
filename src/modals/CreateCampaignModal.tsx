import {
  Button, Input, Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'keep-react'
import {useCallback, useState} from "react";
import {useStores} from "../stores";
import {YM} from "../utils/ym.ts";

interface Props {
  isOpen: boolean
  close: () => void
}

export const CreateCampaignModal = ({isOpen, close}: Props) => {
  const { CampaignsStore } = useStores()
  const [name, setName] = useState("")

  const handleCreateCampaign = useCallback(async () => {
    YM.richGoal('create-campaign')

    await CampaignsStore.createCampaign({name, company_context: '', owner_context: ''})

    close()
  }, [CampaignsStore, close, name])

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent className="max-md:min-w-[calc(100%-16px)] min-w-[500px]">
        <ModalHeader className="mb-6 space-y-3">
          <div className="space-y-1">
            <ModalTitle>
              <div className="text-heading-6">
                Create campaign
              </div>
            </ModalTitle>
          </div>
        </ModalHeader>
        <div className="mt-4 mb-6">
          <Input
            placeholder="Campaign name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ModalFooter>
          <Button color="success" onClick={handleCreateCampaign}>Create</Button>
          <Button color="error" onClick={close}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}