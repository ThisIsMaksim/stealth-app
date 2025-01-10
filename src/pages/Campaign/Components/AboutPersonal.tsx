import {useCallback, useState} from "react"
import {toast} from "keep-react"
import {ICampaign, IPersonalContext} from "../../../types/Campaigns.type.ts"
import {Context} from "./Context.tsx"
import {Action, fetchWithDelay} from "../../../utils/fetchWithDelay.ts"
import {useStores} from "../../../stores"

interface Props {
  campaign: ICampaign
}

export const AboutPersonal = ({ campaign }: Props) => {
  const {CampaignsStore} = useStores()
  const [pending, setPending] = useState(false)

  const handleSave = useCallback(async (fieldName: string, value: string) => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const {error} = await fetchWithDelay<IPersonalContext, Action<void>>(
        CampaignsStore.changePersonalContext.bind(CampaignsStore),
        {
          ...campaign.personal_context,
          [fieldName]: value,
        }
      )

      setPending(false)

      if (error) {
        reject()
      } else {
        resolve()
      }
    })

    toast.promise(promise, {
      loading: 'Changing...',
      success: 'Done',
      error: 'Something went wrong',
    })
  }, [CampaignsStore, campaign])

  return (
    <div className="space-y-4">
      <Context
        title="How do I introduce myself? Who I am?"
        defaultValue={campaign.personal_context.introduce}
        fieldName="introduce"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What personal attributes of exeriences make me approachable?"
        defaultValue={campaign.personal_context.attributes}
        fieldName="attributes"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What are my interests and hobbies?"
        defaultValue={campaign.personal_context.hobbies}
        fieldName="hobbies"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="How do I prefer to communicate?"
        defaultValue={campaign.personal_context.how_to_communicate}
        fieldName="how_to_communicate"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What's my background and experience?"
        defaultValue={campaign.personal_context.background}
        fieldName="background"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="How do I engage with people online?"
        defaultValue={campaign.personal_context.how_to_engage}
        fieldName="how_to_engage"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
    </div>
  )
}