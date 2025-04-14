import {Card, Text, Button} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import emailLottie from "../../assets/lottie/email.json"

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: emailLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

interface EmailUnConfirmedProps {
  email: string
}

export const EmailUnConfirmed = ({email}: EmailUnConfirmedProps) => (
  <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Card className="flex flex-col p-16" view="filled" type="container" theme="normal">
        <Lottie options={defaultOptions}
          height={200}
          width={200}
        />
        <Text variant="header-1" className="mb-[4px] mt-6">You need to confirm your email address</Text>
        <Text variant="body-2" className="mb-4">
          {`We have sent you a confirmation email link to ${email}`}
        </Text>
        <Button className="mt-2" view="action" size="l" onClick={() => window.location.href = "/posts"}>
          Resend
        </Button>
      </Card>
    </div>
) 