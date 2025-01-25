import {observer} from "mobx-react"
import {useStores} from "../stores"
import {ToneOfVoice} from "./Campaign/Components/ToneOfVoice.tsx"
import {AuthPageWrapper} from "./AuthPageWrapper";

export const ToneOfVoicePage = observer(() => {
  const {  CampaignsStore } = useStores()

  return (
    <AuthPageWrapper>
      <div className="text-heading-5 text-start">Tone of voice</div>
      <div className="max-w-[600px] lg:p-4 rounded-xl lg:border-[1px] dark:border-gray-700 mt-4">
        <ToneOfVoice
          campaign={CampaignsStore.activeCampaign}
        />
      </div>
    </AuthPageWrapper>
  )
})