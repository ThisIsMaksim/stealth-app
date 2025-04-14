import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {useStores} from "../../../stores"
import {Button, Card, Loader, Text} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import errorLottie from "../../../assets/lottie/error.json"
import successLottie from "../../../assets/lottie/success.json"

const getDefaultOptions = (lottie) => ({
  loop: false,
  autoplay: true, 
  animationData: lottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
})

export const ConfirmedEmail = () => {
  const {UserStore} = useStores()
  const params = useParams()
  const [pending, setPending] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    UserStore.confirmEmail(
      params.token,
      (error) => {
        if (error) {
          setError(true)
        }

        setPending(false)
      }
    )
  }, [UserStore, params])

  if (pending) {
    return (
      <div className="flex items-center justify-center w-[100vw] h-[100vh]">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-[100vw] h-[100vh]">
        <Card className="flex flex-col space-y-6 p-16" view="filled" type="container" theme="normal">
          <Lottie options={getDefaultOptions(errorLottie)}
            height={200}
            width={200}
          />
          <Text variant="header-2" className="mb-[14px] mt-5">Token invalid</Text>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Card className="flex flex-col space-y-2 p-16" view="filled" type="container" theme="normal">
        <Lottie options={getDefaultOptions(successLottie)}
          height={200}
          width={200}
        />
        <Text variant="header-1" className="mb-[4px] mt-6">Email confirmed</Text>
        <Text variant="body-2" className="mb-8">
          You can start to use Elvyn.ai
        </Text>
        <Button className="mt-4" view="action" onClick={() => window.location.href = "/posts"}>
          Get started
        </Button>
      </Card>
    </div>
  )
}