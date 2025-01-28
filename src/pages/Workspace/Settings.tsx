import {observer} from "mobx-react"
import {useStores} from "../../stores"
import {CampaignSettings} from "./Components/CampaignSettings"
import {AuthPageWrapper} from "../AuthPageWrapper"

export const SettingsPage = observer(() => {
  const {  CampaignsStore } = useStores()

  return (
    <AuthPageWrapper>
      <div className="text-heading-5 text-start">Settings</div>
      <div className="max-w-[550px] lg:p-4 rounded-xl lg:border-[1px] dark:border-gray-700 mt-4">
        <CampaignSettings
          campaign={CampaignsStore.activeCampaign}
        />
      </div>
    </AuthPageWrapper>
  )
})