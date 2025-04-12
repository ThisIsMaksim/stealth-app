import {Menu} from "../../components"
import {Card} from "keep-react"
import {useStores} from "../../stores"
import {useEffect, useState} from "react"
import {observer} from "mobx-react"
import {useNavigate} from "react-router-dom"
import { Header } from "../../components/Header"
import {HashLoader} from "react-spinners"
import {UnActiveCampaign} from "../../components/UnActiveCampaign"
import {Support} from "../../components/Support"
import {StripePage} from "../StripePage.tsx"
import {SubscriptionStatus} from "../../types/Subscriptions.type.ts"
import {SubscribeOver} from "../../components/SubscribeOver"
import {EmailUnConfirmed} from "../../components/EmailUnConfirmed"

interface AuthPageWrapperProps {
  children: React.ReactNode
}

export const AuthPageWrapper = observer(({children}: AuthPageWrapperProps) => {
  const {UserStore, CampaignsStore, FirebaseStore} = useStores()
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
    if (!FirebaseStore.initialized && UserStore.user) {
      FirebaseStore.initialize({
        email: UserStore.user.email,
      })
    }
  }, [FirebaseStore.initialized, UserStore.user])

  useEffect(() => {
    const appHeight = () => {
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', appHeight)

    appHeight()
  }, [])

  if (!UserStore.authorized || (UserStore.user.is_confirmed && !CampaignsStore.activeCampaign) || !FirebaseStore.initialized) {
    return <div className="flex flex-row justify-center items-center w-[calc(100vw-32px)]" style={{ height }}>
      <HashLoader color="rgb(27, 77, 255)" />
    </div>
  }

  if (!UserStore.user.is_confirmed) {
    return <EmailUnConfirmed height={`${height}px`} email={UserStore.user.email} />
  }

  if (FirebaseStore.config.stripe) {
    if (!UserStore.user.subscription) {
      return <StripePage />
    }

    if (UserStore.user.subscription?.status !== SubscriptionStatus.ACTIVE) {
      return <SubscribeOver height={`${height}px`} />
    }
  }

  return (
    <div className="flex flex-row w-[calc(100vw-8px)] lg:w-[calc(100vw-32px)] h-max-full" style={{ height }}>
      <Menu className="hidden lg:block" />
      <div className="relative w-[100vw] lg:w-[calc(100vw-260px)] ml-0 lg:ml-[8px] overflow-x-hidden">
        <Header />
        <Card className="w-full max-w-full h-[calc(100%-66px-12px)] lg:h-[calc(100%-66px-36px-4px)] p-4 mt-[4px] lg:mt-[8px] overflow-auto overflow-x-hidden">
          <UnActiveCampaign />
          {children}
        </Card>
        <Support />
      </div>
    </div>
  )
})