import {
  Button, Input, Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'keep-react'
import {useCallback, useState} from "react";
import {useStores} from "../stores";

interface Props {
  isOpen: boolean
  closeModal: () => void
}

export const CreateCampaignModal = ({isOpen, closeModal}: Props) => {
  const { CampaignsStore } = useStores()
  const [name, setName] = useState("")

  const handleCreateCampaign = useCallback(async () => {
    await CampaignsStore.createCampaign({name, company_context: '', owner_context: ''})

    closeModal()
  }, [CampaignsStore, closeModal, name])

  return (
    <Modal
      open={isOpen}
      showCloseIcon={false}
    >
      <ModalContent>
        <ModalHeader className="mb-6 space-y-3">
          <div className="space-y-1">
            <ModalTitle>Create campaign</ModalTitle>
            <ModalDescription>
              You need create your first campaign before start
            </ModalDescription>
          </div>
        </ModalHeader>
        <div className="mt-4 mb-4">
          <Input
            placeholder="First name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ModalFooter>
          <Button onClick={handleCreateCampaign}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}