import {
  Button,
  Modal,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalTitle, Textarea, toast,
} from 'keep-react'
import {useCallback, useState} from "react";
import {useStores} from "../stores";
import {fetchWithDelay} from "../utils/fetchWithDelay.ts";
import {IAddProspectRequest} from "../types/Prospects.type.ts";
import {SyncLoader} from "react-spinners";
import {YM} from "../utils/ym.ts";

interface Props {
  isOpen: boolean
  close: () => void
}

export const AddProspectModal = ({isOpen, close}: Props) => {
  const { CampaignsStore, ProspectsStore } = useStores()
  const [link, setLink] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const handleAddProspect = useCallback(async () => {
    YM.richGoal('add-prospects')

    setPending(true)

    const items = link
      .replaceAll('https://', '')
      .replaceAll('http://', '')
      .replaceAll('www.', '')
      .replaceAll('\n', '')
      .split('linkedin')

    const result = await fetchWithDelay<IAddProspectRequest, void>(
      ProspectsStore.addProspect.bind(ProspectsStore),
      {
        campaign_id: CampaignsStore.activeCampaign.id,
        link_urls: items.filter((prospect) => !!prospect).map((prospect) => `https://www.linkedin${prospect}`),
      }
    )

    if (result.error) {
      toast.error(result.error)

      setPending(false)
    } else {
      close()
    }
  }, [CampaignsStore.activeCampaign?.id, ProspectsStore, close, link])

  const handleChangeLink = useCallback((value: string) => {
    if (value.includes('company')) {
      setError('You can\'t add a company account.')
    } else {
      setError('')
    }

    setLink(value)
  }, [])

  let Component = (
    <>
      <ModalHeader className="mb-6 space-y-3">
        <div className="space-y-1">
          <ModalTitle>
            <div className="text-heading-6">Add prospect</div>
          </ModalTitle>
        </div>
      </ModalHeader>
      <div className="mb-4">
        <Textarea
          className="h-[220px]"
          placeholder="For example: https://www.linkedin.com/in/fedianin-maksim/"
          onChange={(e) => handleChangeLink(e.target.value)}
        />
      </div>
      <div className={`mt-2 mb-4 text-body-4 text-error-600 ${error ? '' : 'opacity-0'}`}>{error || 'without error'}</div>
      <ModalFooter>
        <Button color="success" disabled={pending || !!error} onClick={handleAddProspect}>
          Add
        </Button>
        <Button color="error" disabled={pending} onClick={close}>Cancel</Button>
      </ModalFooter>
    </>
  )

  if (pending) {
    Component = (
      <div className="flex justify-center items-center h-[420px]">
        <div className="flex flex-row gap-4">
          <SyncLoader color="rgb(27, 77, 255)" size={10} />
          <p className="flex justify-center items-center">Adding...</p>
        </div>
      </div>
    )
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent className="max-md:min-w-[calc(100%-16px)] min-w-[500px] h-[420px]">
        {Component}
      </ModalContent>
    </Modal>
  )
}