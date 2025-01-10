import {
  Alert,
  AlertContainer,
  AlertDescription,
  AlertIcon,
  Button,
  Tabs,
  TabsContent,
  TabsItem,
  TabsList
} from 'keep-react'
import {Article, Diamond, User} from "phosphor-react"
import './index.css'
import {AuthPageWrapper} from "../AuthPageWrapper"
import {Audience} from "./Components/Audience"
import {useStores} from "../../stores"
import {useCallback, useEffect} from "react"
import {observer} from "mobx-react"
import {CampaignSettings} from "./Components/CampaignSettings"
import {ToneOfVoice} from "./Components/ToneOfVoice.tsx"
import {ModalType} from "../../stores/modal.store.ts"
import {AboutCampaign} from "./Components/AboutCampaign.tsx"
import {AboutPersonal} from "./Components/AboutPersonal.tsx"

export const Campaign = observer(() => {
  const { UserStore, CampaignsStore, ProspectsStore, ModalStore } = useStores()

  const handleAddProspect = useCallback(() => {
    if (!UserStore.user.linkedin_account) {
      ModalStore.open(
        ModalType.BindLinkedInAccount,
        {
          locations: UserStore.locations,
        },
        () => UserStore.needCheckLinkedinAccountStatus = false
      )

      return
    }

    ModalStore.open(
      ModalType.OpenAddProspect
    )
  }, [ModalStore, UserStore])

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
          <TabsList className="flex flex-wrap lg:flex-nowrap justify-start">
            <TabsItem value="item-1">
              <User size={16} />
              Audience
            </TabsItem>
            <TabsItem value="item-2">
              <Article size={16} />
              Context about your company
            </TabsItem>
            <TabsItem value="item-3">
              <Article size={16} />
              Context about your company
            </TabsItem>
            <TabsItem value="item-4">
              <Diamond size={16} />
              Tone of voice
            </TabsItem>
            <TabsItem value="item-5">
              <Article size={16} />
              Settings
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
          />
        </TabsContent>
        <TabsContent className="max-w-2xl items-start space-y-3 pr-2 pl-2" value="item-3">
          <AboutPersonal
            campaign={CampaignsStore.activeCampaign}
          />
        </TabsContent>
        <TabsContent className="max-w-2xl items-start space-y-3 pr-2 pl-2" value="item-4">
          <ToneOfVoice
            campaign={CampaignsStore.activeCampaign}
          />
        </TabsContent>
        <TabsContent className="max-w-2xl items-start space-y-3 pr-2 pl-2" value="item-5">
          <CampaignSettings
            campaign={CampaignsStore.activeCampaign}
            onSave={(request, action) => CampaignsStore.changeCampaign(request, action)}
          />
        </TabsContent>
      </Tabs>
    </AuthPageWrapper>
  )
})
