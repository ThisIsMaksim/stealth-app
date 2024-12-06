import {
  Alert, AlertContainer, AlertDescription, AlertDismiss, AlertIcon, AlertLink, AlertTitle, Button,
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
import {useCallback, useEffect, useState} from "react"
import {AddProspectModal} from "../../modals/AddProspectModal.tsx"
import {observer} from "mobx-react"
import {AboutCampaign} from "./Components/AboutCampaign";
import {BindLinkedInAccountModal} from "../../modals/BindLinkedInAccountModal.tsx";

export const Campaign = observer(() => {
  const { UserStore, CampaignsStore, ProspectsStore } = useStores()
  const [isOpenAddProspectModal, setOpenAddProspectModal] = useState(false)
  const [isOpenConnectAccount, setOpenConnectAccount] = useState<boolean>(false)

  const handleAddProspect = useCallback(() => {
    if (!UserStore.user.linkedin_account) {
      setOpenConnectAccount(true)

      return
    }

    setOpenAddProspectModal(true)
  }, [UserStore.user])

  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
    }
  }, [CampaignsStore.activeCampaign?.id, ProspectsStore])

  return (
    <AuthPageWrapper>
      {(CampaignsStore.activeCampaign && !CampaignsStore.activeCampaign?.is_active) && (
        <Alert color="error">
          <AlertContainer>
            <AlertIcon/>
            <AlertDescription>Campaign isn't active</AlertDescription>
          </AlertContainer>
          <AlertContainer>
            <Button variant="outline">Activate</Button>
          </AlertContainer>
        </Alert>
      )}
      <Tabs variant="default" defaultValue="item-1" className="space-y-4 mt-4">
        <>
          <TabsList className="flex justify-start">
            <TabsItem value="item-1">
              <User size={16} />
              Audience
            </TabsItem>
            <TabsItem value="item-2">
              <Article size={16} />
              Settings
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
            addProspect={handleAddProspect}
            removeProspect={(prospectId) => ProspectsStore.removeProspect({campaign_id: CampaignsStore.activeCampaign.id, prospect_id: prospectId})}
          />
        </TabsContent>
        <TabsContent className="max-w-2xl items-start space-y-3 pr-2 pl-2" value="item-2">
          <AboutCampaign
            campaign={CampaignsStore.activeCampaign}
            onSave={(request, action) => CampaignsStore.changeCampaign(request, action)}
          />
        </TabsContent>
      </Tabs>
      <AddProspectModal
        isOpen={isOpenAddProspectModal}
        close={() => setOpenAddProspectModal(false)}
      />
      <BindLinkedInAccountModal
        isOpen={isOpenConnectAccount}
        locations={UserStore.locations}
        close={() => setOpenConnectAccount(false)}
      />
    </AuthPageWrapper>
  )
})
