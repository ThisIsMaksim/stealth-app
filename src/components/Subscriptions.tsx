import {Button, Card, CardContent, CardTitle, Input} from "keep-react"
import {CheckCircle} from "phosphor-react"
import {observer} from "mobx-react"
import {useStores} from "../stores"
import {useEffect, useState} from "react"
import {HashLoader} from "react-spinners"

export const Subscriptions = observer(() => {
  const { UserStore } = useStores()
  const subscription = UserStore.subscriptions[0]
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const appHeight = () => {
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', appHeight)

    appHeight()
  }, [])

  useEffect(() => {
    UserStore.fetchSubscriptions()
  }, [UserStore])

  if (!subscription) {
    return (
      <div className="flex flex-row justify-center items-center w-[calc(100vw-32px)]" style={{height}}>
        <HashLoader color="rgb(27, 77, 255)"/>
      </div>
    )
  }

  return (
    <div className="relative flex max-md:flex-col items-center justify-end m-auto w-full h-full gap-4">
      <div className="w-full max-w-[768px] h-full max-md:text-center text-right">
        <CardContent className="flex flex-col items-center justify-center w-full h-full">
          <div className="w-full text-heading-2 font-semibold max-md:text-center text-right">ELVYN.ai</div>
          <div className="text-heading-4">
            Win deals before they start by joining every conversation your customers have on LinkedIn
          </div>
        </CardContent>
      </div>
      <Card className="flex flex-col items-center justify-center w-full max-w-[450px] h-full">
        <CardTitle>
          <div className="text-heading-6 font-bold text-white">{subscription.title}</div>
          <div className="text-heading-4 font-bold text-white">
            <span className="text-gray-900 dark:text-white">{subscription.price}</span>
            <span className="ml-1 text-red-400 line-through">80$</span>
          </div>
        </CardTitle>
        <form action="/api/v1/purchases/session" method="POST" className="w-full max-w-[400px] pr-4 pl-4 mt-4">
          <Input type="hidden" name="subscription_id" value={subscription.id} />
          <Button color="secondary" size="xl" type="submit" className="w-full">
            Get started
          </Button>
        </form>
        <CardContent className="space-y-3 text-start">
          <div className="font-bold">What's include</div>
          {subscription.description.split('\n').map(key => (
            <div className="flex flex-row gap-1">
              {/*{subscription.description.split('\n')*/}
              {/*  ? <CheckCircle size={24} className="text-green-400"/>*/}
              {/*  : <XCircle size={24} className="text-red-400"/>}*/}
              <CheckCircle size={24} className="text-green-400"/>
              {key}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
})