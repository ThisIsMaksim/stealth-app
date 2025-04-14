import {useStores} from "../../../stores/index.ts"
import {useCallback, useState} from "react"
import {validatePassword} from "../../../utils/validatePassword.ts"
import {fetchWithDelay} from "../../../utils/fetchWithDelay.ts"
import {validateEmail} from "../../../utils/validateEmail.ts"
import {Card, Text, Button, TextInput} from "@gravity-ui/uikit"
import Lottie from 'react-lottie'
import loginLottie from "../../../assets/lottie/login.json"
import { useNavigate } from "react-router-dom"

const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: loginLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export function Registaration() {
  const { UserStore } = useStores()
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleCreateUser = useCallback(async() => {
    const valid = validatePassword(password)

    if (!valid) {
      setError('Password is not a valid')

      return
    }

    if (password !== repeatPassword) {
      setError("Passwords don't match")

      return
    }

    if (!firstName.trim()) {
      setError("First name is required")

      return
    }
    if (!secondName.trim()) {
      setError("Second name is required")

      return
    }

    if (!validateEmail(email)) {
      setError("Email is not a valid")

      return
    }

    setPending(true)

    const { error } = await fetchWithDelay(
      UserStore.signUp.bind(UserStore),
      {
        first_name: firstName,
        second_name: secondName,
        email: email,
        password: password,
      }
    )

    if (error) {
      setError(error)
    } else {
      location.href = '/posts'
    }

    setPending(false)
  }, [UserStore, email, firstName, password, repeatPassword, secondName])

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-start w-[450px] h-[550px] p-16">
        <Lottie options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
      <Card className="flex flex-col justify-start w-[450px] h-[550px] p-16" view="filled" type="container" theme="normal">
        <div className="flex flex-row gap-2 w-full items-center justify-end mb-4">
          <Text className="opacity-50" variant="caption-2">Already have an account?</Text>
          <Button onClick={() => navigate('/signin')}>Login</Button>
        </div>
        <div className="flex flex-col item-start justify-start text-start mt-8 space-y-4">
          <Text variant="header-1">Registartion</Text>
          <TextInput
            className="mt-4"
            label="First name"
            value={firstName}
            size="l"
            placeholder="Enter your first name"
            validationState={!!error ? 'invalid' : undefined}
            onChange={(e) => {
              setFirstName(e.target.value)
              setError(null)
            }}
          />
          <TextInput
            className="mt-4"
            label="Last name"
            value={secondName}
            size="l"
            placeholder="Enter your last name"
            validationState={!!error ? 'invalid' : undefined}
            onChange={(e) => {
              setSecondName(e.target.value)
              setError(null)
            }}
          />
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
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
          />
          <TextInput
            label="Repeat password"
            type="password" 
            value={repeatPassword}
            size="l"
            placeholder="Enter your password"
            validationState={!!error ? 'invalid' : undefined}
            error={error}
            onChange={(e) => {
              setRepeatPassword(e.target.value)
              setError(null)
            }}
          />
          <Button view="action" loading={pending} size="l" onClick={handleCreateUser}>
            Create account
          </Button>
        </div>
      </Card>
    </div>
  )
}
