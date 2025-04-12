import { useEffect } from "react"
import { useOnbording } from "../../hooks/useOnbording"
import { useStores } from "../../stores"
import { SubscriptionStatus } from "../../types/Subscriptions.type"
import { observer } from "mobx-react"
import { Text } from "@gravity-ui/uikit"

interface ContentProps {
    title?: string
    text?: string
}

const Content = ({title, text}: ContentProps) => {
    return (
        <div className="flex flex-col space-y-2 text-black text-start">
            {!!title && (
                <Text variant="header-2">
                    {title}
                </Text>
            )}
            {!!text && (
                <Text variant="body-1">
                    {text}
                </Text>
            )}
        </div>
    )
}

export const PostsOnboarding = observer(() => {
    const { CampaignsStore, UserStore } = useStores()
    const showOnbording = useOnbording()

    useEffect(() => {
        const hasActiveSubscribtion = UserStore.user?.subscription?.status === SubscriptionStatus.ACTIVE || true
        
        if (!CampaignsStore.activeCampaign || !hasActiveSubscribtion) return

        setTimeout(() => {
          showOnbording('posts', [
            {
              selector: '#profile',
              content: () => <Content title="Welcome 👋" text="We are glad to see you among our users!
                    Ahead of you lies an exciting journey into the world of opportunities and amenities that we offer.
                    We created this platform to make your experience as comfortable and productive as possible." />,
            },
            {
              selector: '#current-campaign',
              content: () => <Content text="Choose campaign you want to track" />
            },
            {
              selector: '#add-new-campaign',
              content: () => <Content text="Press 'Add campaign' to add new campaing.
                  Give your Campaign a name. It will be easier to track it." />
            },
            {
                selector: '#setting-current-campaign',
                content: () => <Content text="Press 'Settings' to configure the current campaign. Here you can change the name, parameters and other details of your campaign." />
            },
            {
              selector: '#add-new-prospects',
              content: () => <Content text="Paste URLs of LinkedIn profiles of your leads in the text box below. You can upload multiple leads at once, pasting each URL on a new line.
                  It's better to add people who are actively posting on LinkedIn to make it more effective." />
            },
          ])
        }, 3000)
    }, [CampaignsStore.activeCampaign, showOnbording])

    return null
})
