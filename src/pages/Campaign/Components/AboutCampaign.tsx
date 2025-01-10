import {useCallback, useState} from "react"
import {toast} from "keep-react"
import {ICampaign, ICompanyContext} from "../../../types/Campaigns.type.ts"
import {Context} from "./Context.tsx"
import {Action, fetchWithDelay} from "../../../utils/fetchWithDelay.ts"
import {useStores} from "../../../stores"

interface Props {
  campaign: ICampaign
}

export const AboutCampaign = ({ campaign }: Props) => {
  const {CampaignsStore} = useStores()
  const [pending, setPending] = useState(false)

  const handleSave = useCallback(async (fieldName: string, value: string) => {
    setPending(true)

    // eslint-disable-next-line no-async-promise-executor
    const promise = () => new Promise<void>(async (resolve, reject) => {
      const {error} = await fetchWithDelay<ICompanyContext, Action<void>>(
        CampaignsStore.changeCampaignContext.bind(CampaignsStore),
        {
          ...campaign.company_context,
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
  }, [])

  return (
    <div className="space-y-4">
      <Context
        title="What does my company do in one sentence?"
        defaultValue={campaign.company_context.about_company}
        fieldName="about_company"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="Who is my target audience?"
        defaultValue={campaign.company_context.audience}
        fieldName="audience"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What makes my product different from others?"
        defaultValue={campaign.company_context.product_diff}
        fieldName="product_diff"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What specific results do our customers achieve?"
        defaultValue={campaign.company_context.specific_results}
        fieldName="specific_results"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What is our company’s mission or vision?"
        defaultValue={campaign.company_context.mission}
        fieldName="mission"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What’s a recent achievement our company is proud of?"
        defaultValue={campaign.company_context.achievement}
        fieldName="achievement"
        maxLength={100}
        disabled={pending}
        onChange={handleSave}
      />
    </div>
  )
}