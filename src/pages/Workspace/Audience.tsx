import {observer} from "mobx-react"
import {Audience} from "./Components/Audience"
import {useStores} from "../../stores"
import {useCallback, useEffect} from "react"
import {ModalType} from "../../stores/modal.store"
import {AuthPageWrapper} from "../AuthPageWrapper"
import {useOnbording} from "../../hooks/useOnbording"
import {SubscriptionStatus} from "../../types/Subscriptions.type.ts";

export const AudiencePage = observer(() => {
  const { UserStore, CampaignsStore, ProspectsStore, ModalStore } = useStores()
  const showOnbording = useOnbording()

  const handleAddProspect = useCallback(() => {
    // if (!UserStore.user.linkedin_account) {
    //   ModalStore.open(
    //     ModalType.BindLinkedInAccount,
    //     {
    //       locations: UserStore.locations,
    //     },
    //     () => UserStore.needCheckLinkedinAccountStatus = false
    //   )

    //   return
    // }

    ModalStore.open(
      ModalType.OpenAddProspect
    )
  }, [ModalStore, UserStore])

  useEffect(() => {
    if (CampaignsStore.activeCampaign) {
      ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
    }
  }, [CampaignsStore.activeCampaign, ProspectsStore])

  useEffect(() => {
    if (!CampaignsStore.activeCampaign || (!UserStore.user?.subscription || UserStore.user?.subscription?.status !== SubscriptionStatus.ACTIVE)) return

    setTimeout(() => {
      showOnbording('audience', [
        {
          selector: '#logo',
          content: () => (
            <div>
              <div className="text-start text-body-3 text-gray-900">
                Welcome 👋
              </div>
              <div className="text-start text-body-3 text-gray-900">
                We are glad to see you among our users! Ahead of you lies an exciting journey into the world of opportunities and amenities that we offer. We created this platform to make your experience as comfortable and productive as possible.
              </div>
            </div>
          ),
        },
        {
          selector: '#active-campaign',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              Choose campaign you want to track
            </div>
          )
        },
        {
          selector: '#add-campaign',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              Press “add campaign” to add new campaing
              Give your Campaign a name. It will be easier to track it.
            </div>
          )
        },
        {
          selector: '#add-prospects',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              Paste URLs of LinkedIn profiles of your leads in the text box below. You can upload multiple leads at once, pasting each URL on a new line.
              It’s better to add people who are actively posting on LinkedIn to make it more effective.
            </div>
          )
        },
        {
          selector: '#posts',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              Go to Comments section to review your first comments.
            </div>
          )
        },
        {
          selector: '#about-company',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              Provide some Context about your company. This helps the AI generate more genuine comments. Include relevant details about your company and make sure to mention your company name. If you don’t have a perfect version ready, don’t worry — you can always update it later. Start with the information you currently have.
            </div>
          )
        },
        {
          selector: '#about-you',
          content: () => (
            <div className="text-start text-body-3 text-gray-900">
              Now provide some Context about you. Include any facts about yourself that are relevant to the comments. You can also add some personal information if you wish. It doesn’t have to be perfect initially; start with what you have. You can always update it later and regenerate the comments.
            </div>
          )
        },
      ])
    }, 1000)
  }, [CampaignsStore.activeCampaign, showOnbording])

  return (
    <AuthPageWrapper>
      <div className="lg:p-4">
        <Audience
          prospects={ProspectsStore.prospects}
          status={ProspectsStore.state}
          addProspect={handleAddProspect}
          removeProspect={(prospectId) => ProspectsStore.removeProspect({campaign_id: CampaignsStore.activeCampaign.id, prospect_id: prospectId})}
        />
      </div>
    </AuthPageWrapper>
  )
})