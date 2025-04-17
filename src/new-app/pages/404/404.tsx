import {Button, Card} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import page404Lottie from "../../../assets/lottie/404.json"

const getDefaultOptions = (lottie) => ({
  loop: true,
  autoplay: true, 
  animationData: lottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
})

export const Page404 = () => {
  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Card className="flex flex-col space-y-2 p-16" view="filled" type="container" theme="normal">
        <Lottie options={getDefaultOptions(page404Lottie)}
          height={400}
          width={400}
        />
        <Button className="mt-4" view="action" size="xl" onClick={() => window.location.href = "/posts"}>
          Go to main page
        </Button>
      </Card>
    </div>
  )
}