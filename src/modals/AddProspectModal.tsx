import { Button, Modal, TextArea } from '@gravity-ui/uikit'
import {useCallback, useState} from "react"
import {useStores} from "../stores"
import {fetchWithDelay} from "../utils/fetchWithDelay.ts"
import {IAddProspectRequest} from "../types/Prospects.type.ts"
import {YM} from "../utils/ym.ts"

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
    setError('')

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
      setError(result.error)
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

  return (
    <Modal
      open={isOpen}
      onClose={close}
    >
      <div className="p-6 w-[550px]">
        <div className="mb-6">
          <h3 className="text-heading-6">Add prospect</h3>
        </div>
        <div className="mb-4">
          <TextArea
            size="l"
            rows={8}
            placeholder="For example: https://www.linkedin.com/in/fedianin-maksim/"
            errorMessage={error}
            validationState={!!error ? 'invalid' : undefined}
            onChange={(e) => handleChangeLink(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button 
            view="action"
            loading={pending}
            disabled={pending || !!error} 
            onClick={handleAddProspect}
          >
            Add
          </Button>
          <Button 
            view="flat"
            disabled={pending} 
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}