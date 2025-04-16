import {useSearchParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {Subscriptions} from "../components/Subscriptions"
import {Card, Text, Button} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import errorLottie from "../assets/lottie/error.json"
import successLottie from "../assets/lottie/success.json"

const getDefaultOptions = (lottie) => ({
  loop: false,
  autoplay: true, 
  animationData: lottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
})

const Success = () => (
  <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Card className="flex flex-col space-y-2 p-16" view="filled" type="container" theme="normal">
        <Lottie options={getDefaultOptions(successLottie)}
          height={200}
          width={200}
        />
        <Text variant="header-1" className="mb-[4px] mt-6">The payment was successful</Text>
        <Text variant="body-2" className="mb-8">
          You can start to use Elvyn.ai
        </Text>
        <Button className="mt-4" view="action" onClick={() => window.location.href = "/posts"}>
          Continue
        </Button>
      </Card>
  </div>
)

const Failed = () => (
  <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Card className="flex flex-col space-y-2 p-16" view="filled" type="container" theme="normal">
        <Lottie options={getDefaultOptions(errorLottie)}
          height={200}
          width={200}
        />
        <Text variant="header-1" className="mb-[4px] mt-6">The payment was not successful</Text>
        <Text variant="body-2" className="mb-8">
          You need to try again
        </Text>
        <Button className="mt-4" view="action" onClick={() => window.location.href = "/payment"}>
          Retry
        </Button>
      </Card>
  </div>
)

export const StripePage = () => {
  const [params] = useSearchParams()
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    const getComponent = () => {
      if (params.get('success') === 'true') {
        return <Success/>
      } else if (params.get('success') === 'false') {
        return <Failed/>
      }

      return <Subscriptions />
    }

    setComponent(getComponent())
  }, [params])

  return (
    <div className="relative flex items-center justify-between m-auto w-full h-full gap-4">
      {Component}
    </div>
  )
}