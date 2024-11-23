import {Header, Menu} from "../../components"
import './index.css'
import {Card, Spinner} from "keep-react";
import {useStores} from "../../stores";
import {Children, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
import {CreateCampaignModal} from "../../modals/CreateCampaignModal.tsx";

interface AuthPageWrapperProps {
  children: Children
}

export const AuthPageWrapper = observer(({children}: AuthPageWrapperProps) => {
  const { UserStore, CampaignsStore } = useStores()
  const navigate = useNavigate()
  const [needShowCreateCampaignModal, setNeedShowCreateCampaignModal] = useState(false)

  useEffect(() => {
    if (UserStore.authorized) return
    
    UserStore.fetchUser()
  }, [UserStore])

  useEffect(() => {
    if (UserStore.state === 'error') {
      navigate('/signup')
    }
  }, [UserStore.state, navigate])

  useEffect(() => {
    if (!UserStore.authorized) return

    CampaignsStore.fetchCampaigns()
  }, [UserStore.authorized, CampaignsStore])

  useEffect(() => {
    if (CampaignsStore.state === 'done' && CampaignsStore.campaigns.length === 0) {
      setNeedShowCreateCampaignModal(true)
    }
  }, [CampaignsStore.campaigns, CampaignsStore.state])

  if (!UserStore.authorized) {
    return <div className="AuthPageApp flex justify-center items-center">
      <Spinner />
    </div>
  }

  return (
    <div className="AuthPageApp h-full h-max-full">
      <Menu user={UserStore.user} campaigns={CampaignsStore.campaigns} />
      <div className="AuthPageWrapper h-full h-max-full">
        <Header />
          <Card className="Route w-full max-w-full p-4 mt-4 overflow-auto">
            <CreateCampaignModal
              isOpen={needShowCreateCampaignModal}
              closeModal={() => setNeedShowCreateCampaignModal(false)}
            />
            {children}
          </Card>
      </div>
    </div>
  )
})