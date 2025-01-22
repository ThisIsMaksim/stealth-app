import {Button, Empty, EmptyDescription, EmptyImage, EmptyTitle} from "keep-react"
import {CheckCircle} from "phosphor-react"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {HashLoader} from "react-spinners"
import {useStores} from "../../stores"

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
        <HashLoader color="rgb(27, 77, 255)" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-[100vw] h-[100vh]">
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
          <EmptyTitle className="mb-[14px] mt-5">Token invalid</EmptyTitle>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Empty>
        <EmptyImage>
          <CheckCircle size={100}/>
        </EmptyImage>
        <EmptyTitle className="mb-[4px] mt-2">Email confirmed</EmptyTitle>
        <EmptyDescription className="mb-8">
          You can start to use Elvyn.ai
        </EmptyDescription>
        <Button onClick={() => window.location.href = "/"}>
          Get started
        </Button>
      </Empty>
    </div>
  )
}