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
        description="My name is Nikita Gavrilov, general manager of Yango Autonomy, company providing with autonomous delivery robots. I have built multiple startups within the corporate. I call myself 'zero to one' guy."
        defaultValue={campaign.personal_context.introduce}
        fieldName="introduce"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What personal attributes of exeriences make me approachable?"
        description="I live in Dubai with my wife who travels with me in all new destinations where I make new business starts."
        defaultValue={campaign.personal_context.attributes}
        fieldName="attributes"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What are my interests and hobbies?"
        description="I am a visioner who beleives in developing the product which makes people life safer and better."
        defaultValue={campaign.personal_context.hobbies}
        fieldName="hobbies"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="How do I prefer to communicate?"
        description="I prefer an informal, relaxed tone. I avoid corporate jargon and try to keep things simple and friendly."
        defaultValue={campaign.personal_context.how_to_communicate}
        fieldName="how_to_communicate"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What's my background and experience?"
        description="I've been involved in the fast developing industries, building products in mobility for last 7 years."
        defaultValue={campaign.personal_context.background}
        fieldName="background"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
    </div>
  )
}