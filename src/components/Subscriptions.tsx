import {CheckCircle} from "phosphor-react"
import {observer} from "mobx-react"
import {useStores} from "../stores"
import {useEffect} from "react"
import {Button, Card, Loader, Text} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import subscriptionsLottie from "../assets/lottie/subscriptions.json"

const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: subscriptionsLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const Subscriptions = observer(() => {
  const { UserStore } = useStores()
  const subscription = UserStore.subscriptions[0]

  useEffect(() => {
    UserStore.fetchSubscriptions()
  }, [UserStore])

  if (!subscription) {
    return (
      <div className="flex flex-row justify-center items-center w-[100vw] h-[100vh]">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-start w-[450px] h-[450px] p-16">
        <Lottie options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
      <Card className="flex flex-col justify-start w-[450px] h-[450px] p-16" view="filled" type="container" theme="normal">
        <div>
          {/* <div className="text-heading-6 font-bold text-white">{subscription.title}</div> */}
          <div className="text-heading-4 font-bold text-white">
            {!!subscription.price_with_discount && subscription.price_with_discount !== subscription.price
              ? (
                <>
                  <span className="text-gray-900 dark:text-white">{subscription.price_with_discount}</span>
                  <span className="ml-1 text-red-400 line-through">{subscription.price}</span>
                </>
              )
            : (
                <span className="text-gray-900 dark:text-white">{subscription.price}</span>
              )}
          </div>
          <div className="text-sm font-bold text-white">monthly subscription</div>
        </div>
        <form action="/api/v1/purchases/session" method="POST" className="w-full max-w-[400px] pr-4 pl-4 mt-4">
          <input type="hidden" name="subscription_id" value={subscription.id} />
          <Button view="action" size="xl" type="submit" className="w-full">
            Try 14 days trials now for FREE
          </Button>
        </form>
        <div className="space-y-3 text-start mt-4 ml-4">
          <Text className="font-bold" variant="header-1">What's include</Text>
          {subscription.description.split('\\n').map(key => (
            <div className="flex flex-row items-center gap-1">
              <CheckCircle size={24} className="text-green-400"/>
              {key}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
})