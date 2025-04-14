import App from './App.tsx'
import {BrowserRouter, useNavigate} from "react-router-dom"
import {ToastWrapper} from "keep-react"
import {Modal} from "./components/Modal"
import {Onboarding} from "./components/Onboarding"
import {ThemeProvider as GravityUIThemeProvider, Loader} from '@gravity-ui/uikit'
import {Toaster, ToasterComponent, ToasterProvider, Text, Link} from '@gravity-ui/uikit'
import { useTheme } from './ThemeProvider.tsx'
import { useEffect } from 'react'
import { useStores } from './stores/index.ts'
import { EmailUnConfirmed } from './components/EmailUnConfirmed/index.tsx'
import { SubscribeOver } from './components/SubscribeOver/index.tsx'
import { StripePage } from './pages/StripePage.tsx'
import { SubscriptionStatus } from './types/Subscriptions.type.ts'
import { observer } from 'mobx-react'

const toaster = new Toaster()

export const NewApp = () => {
    const { theme } = useTheme()

    return (
        <GravityUIThemeProvider theme={theme}>
            <ToasterProvider toaster={toaster}>
                <BrowserRouter>
                    <AppWrapper />
                </BrowserRouter>
            </ToasterProvider>
        </GravityUIThemeProvider>
    )
}

const AppWrapper = observer(() => {
    const { CampaignsStore, UserStore, FirebaseStore, ProspectsStore, NotificationStore } = useStores()
    const navigate = useNavigate()
    const prospects = ProspectsStore.prospects

    useEffect(() => {
        if (UserStore.authorized) return
    
        UserStore.fetchUser()
    }, [UserStore])

    useEffect(() => {
        if (['/signin', '/signup', '/'].includes(window.location.pathname)) return

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
        if (CampaignsStore.activeCampaign) {
          ProspectsStore.fetchProspects(CampaignsStore.activeCampaign.id)
        }
    }, [CampaignsStore.activeCampaign, ProspectsStore])

    useEffect(() => {
        const privateProspects = prospects.filter((prospect) => prospect.is_private)

        if (privateProspects.length > 0) {
            for (const prospect of privateProspects) {
                NotificationStore.addNotification({
                    id: prospect.id,
                    text: (
                        <Text>
                            You tried to add a prospect: <Link href={prospect.link_url}>{prospect.link_url}</Link>. This is a private account, we cannot add it.
                        </Text>
                    ),
                    read: false,
                })
            }
        }
    }, [prospects])

    if (!['/signin', '/signup', '/'].includes(window.location.pathname)) {
        if (!UserStore.authorized || (UserStore.user.is_confirmed && !CampaignsStore.activeCampaign) || !FirebaseStore.initialized) {
            return <div className="flex flex-row justify-center items-center w-[100vw] h-[100vh]">
              <Loader />
            </div>
        }
    
        if (!UserStore.user.is_confirmed) {
            return <EmailUnConfirmed height={'100vh'} email={UserStore.user.email} />
        }
    
        if (FirebaseStore.config.stripe) {
            if (!UserStore.user.subscription) {
                return <StripePage />
            }
    
            if (UserStore.user.subscription?.status !== SubscriptionStatus.ACTIVE) {
                return <SubscribeOver height={'100vh'} />
            }
        }
    }

    return (
        <>
            <Onboarding>
                <App />
            </Onboarding>
            <ToastWrapper
                richColors={true}
                toastOptions={{
                    classNames: {
                    title: 'text-body-3 font-medium',
                    toast: 'text-start rounded-xl shadow-large',
                    description: 'w-full text-body-4 font-normal',
                    },
                }}
            />
            <ToasterComponent />
            <Modal />
        </>
    )
})