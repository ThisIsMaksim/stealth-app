import {Menu} from "../../components"
import {Card} from "keep-react"
import {useStores} from "../../stores"
import {useEffect} from "react"
import {observer} from "mobx-react"
import {useNavigate} from "react-router-dom"
import {HashLoader} from "react-spinners"
import {ModalType} from "../../stores/modal.store.ts"
import { Header } from "../../components/Header.tsx"
import {NavBar} from "../../components/NavBar.tsx";

interface AuthPageWrapperProps {
  children: React.ReactNode
}

export const AuthPageWrapper = observer(({children}: AuthPageWrapperProps) => {
  const { UserStore, CampaignsStore, ModalStore } = useStores()
  const navigate = useNavigate()

  useEffect(() => {
    if (UserStore.authorized) return
    
    UserStore.fetchUser()
  }, [UserStore])

  useEffect(() => {
    if (UserStore.errorStatus >= 400 && UserStore.errorStatus < 500) {
      navigate('/signin')
    }
  }, [UserStore.state, navigate])

  useEffect(() => {
    if (!UserStore.authorized) return

    CampaignsStore.fetchCampaigns()
  }, [UserStore.authorized, CampaignsStore])

  useEffect(() => {
    if (CampaignsStore.state === 'done' && CampaignsStore.campaigns.length === 0) {
      CampaignsStore.createCampaign({name: 'First campaign', owner_context: '', company_context: ''})
    }
  }, [CampaignsStore, CampaignsStore.campaigns, CampaignsStore.state])

  if (!UserStore.authorized) {
    return <div className="flex flex-row justify-center items-center w-[calc(100vw-32px)]">
      <HashLoader color="rgb(27, 77, 255)" />
    </div>
  }

  return (
    <div className="flex flex-row w-[calc(100vw-8px)] lg:w-[calc(100vw-32px)] h-[100vh] h-max-full">
      <div className="hidden lg:block">
        <Menu
          campaigns={CampaignsStore.campaigns}
          showCreateCampaignModal={() => ModalStore.open(ModalType.CreateCampaign)}
        />
      </div>
      <div className="relative w-[100vw] lg:w-[calc(100vw-260px)] ml-0 lg:ml-[16px] overflow-x-hidden">
        <Header
          campaigns={CampaignsStore.campaigns}
          activeCampaign={CampaignsStore.activeCampaign}
          onChange={(campaign) => CampaignsStore.setActiveCampaign(campaign)}
        />
        <Card className="w-full max-w-full h-[calc(100vh-86px-86px-24px)] lg:h-[calc(100vh-82px-32px-24px)] p-4 mt-[4px] lg:mt-4 overflow-auto overflow-x-hidden">
          {children}
        </Card>
        <NavBar />
      </div>
    </div>
  )
})