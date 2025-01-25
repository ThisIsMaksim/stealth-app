import {observer} from "mobx-react"
import {useStores} from "../stores"
import {AboutCampaign} from "./Campaign/Components/AboutCampaign.tsx"
import {AuthPageWrapper} from "./AuthPageWrapper";

export const AboutCompanyPage = observer(() => {
  const {  CampaignsStore } = useStores()

  return (
    <AuthPageWrapper>
      <div className="text-heading-5 text-start">Context about your company</div>
      <div className="max-w-[550px] lg:p-4 rounded-xl lg:border-[1px] dark:border-gray-700 mt-4">
        <AboutCampaign
          campaign={CampaignsStore.activeCampaign}
        />
      </div>
    </AuthPageWrapper>
  )
})