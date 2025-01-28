import {observer} from "mobx-react"
import {useStores} from "../../stores"
import {AboutPersonal} from "./Components/AboutPersonal"
import {AuthPageWrapper} from "../AuthPageWrapper"

export const AboutYouPage = observer(() => {
  const {  CampaignsStore } = useStores()

  return (
    <AuthPageWrapper>
      <div className="text-heading-5 text-start">Context about you</div>
      <div className="max-w-[550px] lg:p-4 rounded-xl lg:border-[1px] dark:border-gray-700 mt-4">
        <AboutPersonal
          campaign={CampaignsStore.activeCampaign}
        />
      </div>
    </AuthPageWrapper>
  )
})