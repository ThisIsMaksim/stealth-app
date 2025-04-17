import {Card, Text, Button} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import emailLottie from "../../assets/lottie/email.json"
import { useStores } from "../../stores"
import { useCallback, useState, useEffect } from "react"

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

export const EmailUnConfirmed = ({email}: EmailUnConfirmedProps) => {
  const {UserStore} = useStores()
  const [pending, setPending] = useState(false)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleResendCheckEmail = useCallback(async () => {
    setPending(true)
    
    await UserStore.resendCheckEmail(() => {
      setPending(false)
      setTimer(60)
    })
  }, [])

  return (
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
        <Button 
          className="mt-2" 
          view="action" 
          size="l" 
          loading={pending} 
          onClick={handleResendCheckEmail}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend (${timer}s)` : 'Resend'}
        </Button>
      </Card>
    </div>
  ) 
}