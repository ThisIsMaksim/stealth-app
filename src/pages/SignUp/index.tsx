import {Envelope, Eye, IdentificationCard, Lock} from 'phosphor-react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Input,
  InputIcon, toast,
} from 'keep-react'
import './index.css'
import {Link} from "react-router-dom"
import {useStores} from "../../stores"
import {useCallback, useState} from "react"
import {validatePassword} from "../../utils/validatePassword.ts"
import {fetchWithDelay} from "../../utils/fetchWithDelay.ts"
import {validateEmail} from "../../utils/validateEmail.ts"
import { Colors } from '../../../src/colors';

export function SignUp() {
  const { UserStore } = useStores()
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const handleCreateUser = useCallback(() => {
    const valid = validatePassword(password)

    if (!valid) {
      toast.error('Password is not a valid')

      return
    }

    if (password !== repeatPassword) {
      toast.error("Passwords don't match")

      return
    }

    if (!firstName.trim()) {
      toast.error("First name is required")

      return
    }
    if (!secondName.trim()) {
      toast.error("Second name is required")

      return
    }

    if (!validateEmail(email)) {
      toast.error("Email is not a valid")

      return
    }

    setPending(true)

    const promise = async () => {
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
        toast.error(error)
      } else {
        location.href = '/workspace/audience'
      }

      setPending(false)
    }

    toast.promise(promise, {
      loading: 'Do magic...',
      success: 'Successfully registered',
      error: 'Something went wrong',
    })
  }, [UserStore, email, firstName, password, repeatPassword, secondName])

  return (
    <div className="Page">
      <Card className="min-w-96">
        <CardContent className="space-y-3">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Already have an account?
              <Button variant="link" className="p-1">
                <Link to="/signin">Sign in</Link>
              </Button>
            </CardDescription>
          </CardHeader>
          <div className="space-y-3">
            <fieldset className="flex flex-row items-center space-x-3">
              <div className="relative">
                <Input
                  className="ps-11"
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputIcon>
                  <IdentificationCard size={19} color={Colors.gray[400]}/>
                </InputIcon>
              </div>
              <div className="relative">
                <Input
                  className="ps-11"
                  placeholder="Last name"
                  onChange={(e) => setSecondName(e.target.value)}
                />
                <InputIcon>
                  <IdentificationCard size={19} color={Colors.gray[400]}/>
                </InputIcon>
              </div>
            </fieldset>
            <fieldset className="space-y-3">
              <div className="relative">
                <Input
                  className="ps-11"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputIcon>
                  <Envelope size={19} color={Colors.gray[400]}/>
                </InputIcon>
              </div>
            </fieldset>
            <fieldset className="space-y-3">
              <div className="relative">
                <Input
                  className="ps-11"
                  placeholder="Password"
                  type={!showPassword ? 'password' : 'text'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputIcon>
                  <Lock size={19} color={Colors.gray[400]}/>
                </InputIcon>
                <Eye
                  className="absolute top-[30%] right-4 cursor-pointer"
                  size={19}
                  color={Colors.gray[400]}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="relative">
                <Input
                  className="ps-11"
                  placeholder="Repeat password"
                  type={!showRepeatPassword ? 'password' : 'text'}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <InputIcon>
                  <Lock size={19} color={Colors.gray[400]}/>
                </InputIcon>
                <Eye
                  className="absolute top-[30%] right-4 cursor-pointer"
                  size={19}
                  color={Colors.gray[400]}
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                />
              </div>
            </fieldset>
            <Button className="!mt-3 block w-full" disabled={pending} onClick={handleCreateUser}>
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
