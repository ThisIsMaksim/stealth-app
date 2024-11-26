import {
  Button, Input, Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'keep-react'
import {useCallback, useState} from "react";
import {useStores} from "../stores";

interface Props {
  isOpen: boolean
  close: () => void
}

export const AddProspectModal = ({isOpen, close}: Props) => {
  const { CampaignsStore, ProspectsStore } = useStores()
  const [link, setLink] = useState("")

  const handleAddProspect = useCallback(async () => {
    await ProspectsStore.addProspect({
      campaign_id: CampaignsStore.activeCampaign.id,
      link_urls: [link],
    })

    close()
  }, [CampaignsStore.activeCampaign, ProspectsStore, close, link])

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent>
        <ModalHeader className="mb-6 space-y-3">
          <div className="space-y-1">
            <ModalTitle>Add prospect</ModalTitle>
          </div>
        </ModalHeader>
        <div className="mt-4 mb-4">
          <Input
            placeholder="For example: https://www.linkedin.com/in/fedianin-maksim/"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <ModalFooter>
          <Button onClick={handleAddProspect}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}