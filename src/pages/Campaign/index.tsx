import {
  Tabs,
  TabsContent,
  TabsItem,
  TabsList
} from 'keep-react'
import {
  Article,
  Diamond,
  User
} from "phosphor-react"
import './index.css'
import {AuthPageWrapper} from "../AuthPageWrapper"
import {Audience} from "./Components/Audience"
import {useStores} from "../../stores"
import {useEffect, useState} from "react"
import {AddProspectModal} from "../../modals/AddProspectModal.tsx"
import {observer} from "mobx-react"
import {AboutCampaign} from "./Components/AboutCampaign";

export const Campaign = observer(() => {
  const { CampaignsStore, ProspectsStore } = useStores()
  const [isOpenAddProspectModal, setOpenAddProspectModal] = useState(false)

  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
    }
  }, [CampaignsStore.activeCampaign?.id, ProspectsStore])

  return (
    <AuthPageWrapper>
      <Tabs variant="default" defaultValue="item-1" className="space-y-4">
        <>
          <TabsList className="flex justify-start">
            <TabsItem value="item-1">
              <User size={16} />
              Audience
            </TabsItem>
            <TabsItem value="item-2">
              <Article size={16} />
              About campaign
            </TabsItem>
            <TabsItem value="item-4">
              <Diamond size={16} />
              Tone of voice
            </TabsItem>
          </TabsList>
        </>
        <TabsContent value="item-1">
          <Audience
            prospects={ProspectsStore.prospects}
            status={ProspectsStore.state}
            addProspect={() => setOpenAddProspectModal(true)}
            removeProspect={(prospectId) => ProspectsStore.removeProspect({campaign_id: CampaignsStore.activeCampaign.id, prospect_id: prospectId})}
          />
        </TabsContent>
        <TabsContent className="max-w-2xl items-start space-y-3 pr-2 pl-2" value="item-2">
          <AboutCampaign
            campaign={CampaignsStore.activeCampaign}
            onSave={(request, action) => CampaignsStore.changeCampaign(request, action)}
          />
        </TabsContent>
        <TabsContent value="item-4">
        </TabsContent>
      </Tabs>
      <AddProspectModal
        isOpen={isOpenAddProspectModal}
        close={() => setOpenAddProspectModal(false)}
      />
    </AuthPageWrapper>
  )
})
