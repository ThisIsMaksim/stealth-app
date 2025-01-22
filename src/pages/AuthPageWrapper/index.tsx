import {Menu} from "../../components"
import {Button, Card, Empty, EmptyDescription, EmptyImage, EmptyTitle} from "keep-react"
import {useStores} from "../../stores"
import {useEffect, useState} from "react"
import {observer} from "mobx-react"
import {useNavigate} from "react-router-dom"
import {ModalType} from "../../stores/modal.store.ts"
import { Header } from "../../components/Header.tsx"
import {HashLoader} from "react-spinners"

interface AuthPageWrapperProps {
  children: React.ReactNode
}

export const AuthPageWrapper = observer(({children}: AuthPageWrapperProps) => {
  const { UserStore, CampaignsStore, ModalStore } = useStores()
  const navigate = useNavigate()
  const [height, setHeight] = useState(0)

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
    if (!UserStore.authorized || !UserStore.user.is_confirmed) return

    CampaignsStore.fetchCampaigns()
  }, [UserStore.authorized, CampaignsStore])

  useEffect(() => {
    if (CampaignsStore.state === 'done' && CampaignsStore.campaigns.length === 0) {
      CampaignsStore.createCampaign({name: 'First campaign', owner_context: '', company_context: ''})
    }
  }, [CampaignsStore, CampaignsStore.campaigns, CampaignsStore.state])

  useEffect(() => {
    const appHeight = () => {
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', appHeight)

    appHeight()
  }, [])

  if (!UserStore.authorized || (UserStore.user.is_confirmed && !CampaignsStore.activeCampaign)) {
    return <div className="flex flex-row justify-center items-center w-[calc(100vw-32px)]" style={{ height }}>
      <HashLoader color="rgb(27, 77, 255)" />
    </div>
  }

  if (!UserStore.user.is_confirmed) {
    return (
      <div className="flex items-center justify-center w-[100vw]" style={{ height }}>
        <Empty>
          <EmptyImage>
            <img
              src="https://staticmania.cdn.prismic.io/staticmania/7c82d76e-be06-41ca-a6ef-3db9009e6231_Property+1%3DFolder_+Property+2%3DSm.svg"
              className="pt-4"
              height={234}
              width={350}
              alt="404"
            />
          </EmptyImage>
          <EmptyTitle className="mb-[14px] mt-5">You need to confirm your email address</EmptyTitle>
          <EmptyDescription className="mb-8">
            {`We have sent you a confirmation email link to ${UserStore.user.email}`}
          </EmptyDescription>
          <Button variant="outline" className="flex gap-1.5">
            Resend
          </Button>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex flex-row w-[calc(100vw-8px)] lg:w-[calc(100vw-32px)] h-max-full" style={{ height }}>
      <div className="hidden lg:block">
        <Menu
          campaigns={CampaignsStore.campaigns}
          activeCampaign={CampaignsStore.activeCampaign}
          onChange={(campaign) => CampaignsStore.setActiveCampaign(campaign)}
          showCreateCampaignModal={() => ModalStore.open(ModalType.CreateCampaign)}
        />
      </div>
      <div className="relative w-[100vw] lg:w-[calc(100vw-260px)] ml-0 lg:ml-[16px] overflow-x-hidden">
        <Header
          campaigns={CampaignsStore.campaigns}
          activeCampaign={CampaignsStore.activeCampaign}
          onChange={(campaign) => CampaignsStore.setActiveCampaign(campaign)}
        />
        <Card className={`w-full max-w-full h-[calc(100%-86px-12px)] lg:h-[calc(100%-36px)] p-4 mt-[4px] overflow-auto overflow-x-hidden`}>
          {children}
        </Card>
      </div>
    </div>
  )
})