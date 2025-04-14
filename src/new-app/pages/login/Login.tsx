import {useStores} from "../../../stores/index.ts"
import {useCallback, useState} from "react"
import {useNavigate} from "react-router-dom"
import {fetchWithDelay} from "../../../utils/fetchWithDelay.ts"
import {Card, Text, Button, TextInput} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import loginLottie from "../../../assets/lottie/login.json"

const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: loginLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export function Login() {
  const { UserStore } = useStores()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = useCallback(async () => {
    setPending(true)
    setError(null)

    const { error } = await fetchWithDelay(
      UserStore.signIn.bind(UserStore),
      {
        email: email,
        password: password,
      }
    )

    if (!!error) {
      setError(error)
    } else {
      window.location.href = '/posts'
    }

    setPending(false)
  }, [UserStore, email, password])

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-start w-[450px] h-[450px] p-16">
        <Lottie options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
      <Card className="flex flex-col justify-start w-[450px] h-[450px] p-16" view="filled" type="container" theme="normal">
        <div className="flex flex-row gap-2 w-full items-center justify-end mb-4">
          <Text className="opacity-50" variant="caption-2">Join Elvyn.ai today</Text>
          <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
        <div className="flex flex-col item-start justify-start text-start mt-8 space-y-4">
          <Text variant="header-1">Login</Text>
          <TextInput
            className="mt-4"
            label="Email"
            value={email}
            size="l"
            placeholder="Enter your email"
            validationState={!!error ? 'invalid' : undefined}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(null)
            }}
          />
          <TextInput
            label="Password"
            type="password" 
            value={password}
            size="l"
            placeholder="Enter your password"
            validationState={!!error ? 'invalid' : undefined}
            error={error}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
          />
          <Button view="action" loading={pending} size="l" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  )
}
