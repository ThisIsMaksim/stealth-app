import {
  Button,
  Tabs,
  TabsContent,
  TabsItem,
  TabsList
} from 'keep-react'
import {
  Article,
  Diamond,
  Gear,
  User
} from "phosphor-react"
import './index.css'
import {AuthPageWrapper} from "../AuthPageWrapper"
import {ContextAboutYourCompany} from "./Components/ContextAboutYourCompany"
import {ContextAboutYourYou} from "./Components/ContextAboutYou"
import {Insights} from "./Components/Insights"
import {CampaignSettings} from "./Components/CampaignSettings"
import {Audience} from "./Components/Audience"
import {useStores} from "../../stores"
import {useEffect, useState} from "react"
import {AddProspectModal} from "../../modals/AddProspectModal.tsx"
import {observer} from "mobx-react"

export const Campaign = observer(() => {
  const { CampaignsStore, ProspectsStore } = useStores()
  const [isOpenAddProspectModal, setOpenAddProspectModal] = useState(false)

  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
    }
  }, [CampaignsStore.activeCampaign, ProspectsStore])

  return (
    <AuthPageWrapper>
      <Tabs variant="underline" defaultValue="item-1" className="space-y-4">
        <>
          <TabsList className="flex justify-start bg-gray-50 dark:bg-transparent">
            <TabsItem value="item-1">
              <User size={16} />
              Audience
            </TabsItem>
            <TabsItem value="item-2">
              <Article size={16} />
              General context
            </TabsItem>
            <TabsItem value="item-4">
              <Diamond size={16} />
              Tone of voice
            </TabsItem>
            <TabsItem value="item-5">
              <Gear size={16} />
              Settings
            </TabsItem>
          </TabsList>
        </>
        <TabsContent value="item-1">
          <Audience
            prospects={ProspectsStore.prospects}
            status={ProspectsStore.state}
            openAddProspect={() => setOpenAddProspectModal(true)}
          />
        </TabsContent>
        <TabsContent className="max-w-2xl items-start space-y-4" value="item-2">
          <ContextAboutYourCompany />
          <ContextAboutYourYou />
          <Insights />
          <div className="w-full flex justify-start">
            <Button>Save</Button>
          </div>
        </TabsContent>
        <TabsContent value="item-4">
        </TabsContent>
        <TabsContent value="item-5">
          <CampaignSettings />
        </TabsContent>
      </Tabs>
      <AddProspectModal
        isOpen={isOpenAddProspectModal}
        close={() => setOpenAddProspectModal(false)}
      />
    </AuthPageWrapper>
  )
})
