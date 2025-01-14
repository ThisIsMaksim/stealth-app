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
  }, [CampaignsStore, campaign])

  return (
    <div className="space-y-4">
      <Context
        title="What does my company do in one sentence?"
        description="Yango Autonomy is a tech company, provides with autonomous delivery robots, making the last-mile delivery safer, greener and more effecient for the businesses."
        defaultValue={campaign.company_context.about_company}
        fieldName="about_company"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="Who is my target audience?"
        description="We build the autonomous delivery, helping operational and marketing teams to have a reliable delivery solution with predictable cost and unique marketing opportunities utilising branded robots."
        defaultValue={campaign.company_context.audience}
        fieldName="audience"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What makes my product different from others?"
        description="Yango Autonomy has proven the autonomous technology on the real ground, our robots have been delivered more than 350000 orders so far in a different climate and weather conditions."
        defaultValue={campaign.company_context.product_diff}
        fieldName="product_diff"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What problems does my product solve?"
        description="We help businesses continue deliver their products with predicatble price, especially in markets facing labour shortage."
        defaultValue={campaign.company_context.mission}
        fieldName="mission"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
      <Context
        title="What specific results do our customers achieve?"
        description="We see 15-20% of cost-saving on order using robot delivery, especially in villa compounds where we deliver to the doorstep and there is no difference between standard and robot delivery."
        defaultValue={campaign.company_context.achievement}
        fieldName="achievement"
        maxLength={500}
        disabled={pending}
        onChange={handleSave}
      />
    </div>
  )
}