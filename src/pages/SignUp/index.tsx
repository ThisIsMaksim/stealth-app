import {Envelope, IdentificationCard, Lock} from 'phosphor-react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  InputIcon,
} from 'keep-react'
import './index.css'
import {Link, useNavigate} from "react-router-dom"
import {useStores} from "../../stores"
import {useCallback, useEffect, useState} from "react"

export function SignUp() {
  const { UserStore } = useStores()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleCreateUser = useCallback(() => {
    UserStore.signUp({
      first_name: firstName,
      second_name: secondName,
      email: email,
      password: password,
    })
  }, [UserStore, email, firstName, password, repeatPassword, secondName])

  useEffect(() => {
    if (UserStore.state === 'done') {
      navigate('/')
    }
  }, [UserStore.state, navigate])

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
                  <IdentificationCard size={19} color="#AFBACA"/>
                </InputIcon>
              </div>
              <div className="relative">
                <Input
                  className="ps-11"
                  placeholder="Last name"
                  onChange={(e) => setSecondName(e.target.value)}
                />
                <InputIcon>
                  <IdentificationCard size={19} color="#AFBACA"/>
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
                  <Envelope size={19} color="#AFBACA"/>
                </InputIcon>
              </div>
            </fieldset>
            <fieldset className="space-y-3">
              <div className="relative">
                <Input
                  className="ps-11"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputIcon>
                  <Lock size={19} color="#AFBACA"/>
                </InputIcon>
              </div>
              <div className="relative">
                <Input
                  className="ps-11"
                  placeholder="Repeat password"
                  type="password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <InputIcon>
                  <Lock size={19} color="#AFBACA"/>
                </InputIcon>
              </div>
            </fieldset>
            <Button className="!mt-3 block w-full" onClick={handleCreateUser}>
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
