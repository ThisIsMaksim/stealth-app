import {Button, Card, Text} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import subscriptionsLottie from "../../assets/lottie/subscriptions.json"

const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: subscriptionsLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const SubscribeOver = () => (
  <div className="flex items-center justify-center w-[100vw] h-[100vh]">
    <Card className="flex flex-col p-16" view="filled" type="container" theme="normal">
      <Lottie options={defaultOptions}
        height={200}
        width={200}
      />
      <Text variant="header-1" className="mb-[4px] mt-6">Your subscription is over</Text>
      <Text variant="body-2" className="mb-4">
        To continue using the service, extend it
      </Text>
      <Button view="action" size="l" className="flex gap-1.5" onClick={() => window.location.href = '/payment'}>
        Resubscribe
      </Button>
    </Card>
  </div>
) 