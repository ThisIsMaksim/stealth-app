import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle, Spinner, Textarea, toast,
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
  const [pending, setPending] = useState(false)

  const handleAddProspect = useCallback(async () => {
    setPending(true)

    await ProspectsStore.addProspect({
      campaign_id: CampaignsStore.activeCampaign.id,
      link_urls: [link],
    }, (error) => {
      if (error) {
        toast.error(error)
      } else {
        close()
      }

      setPending(false)
    })
  }, [CampaignsStore.activeCampaign?.id, ProspectsStore, close, link])

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent className="min-w-[500px]">
        <ModalHeader className="mb-6 space-y-3">
          <div className="space-y-1">
            <ModalTitle>
              <div className="text-heading-6">Add prospect</div>
            </ModalTitle>
          </div>
        </ModalHeader>
        <div className="mt-4 mb-4">
          <Textarea
            placeholder="For example: https://www.linkedin.com/in/fedianin-maksim/"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <ModalFooter>
          <Button color="success" disabled={pending} onClick={handleAddProspect}>
            {pending
              ? <div style={{marginLeft: '-4px', transform: 'scale(0.6)', opacity: !pending ? 0 : 1}}>
                <Spinner color="secondary"/>
              </div>
              : 'Add'
            }
          </Button>
          <Button color="error" disabled={pending} onClick={close}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}