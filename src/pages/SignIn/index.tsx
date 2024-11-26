import {Envelope, Lock} from 'phosphor-react'
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
import {Link} from "react-router-dom"
import {useStores} from "../../stores";
import {useCallback, useState} from "react";

export function SignIn() {
  const { UserStore } = useStores()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = useCallback(() => {
    UserStore.signIn({
      email: email,
      password: password,
    })
  }, [UserStore, email, password])

  return (
    <div className="Page">
      <Card className="min-w-96">
        <CardContent className="space-y-3">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Don't have an account?
              <Button variant="link" className="p-1">
                <Link to="/signup">Sign un</Link>
              </Button>
            </CardDescription>
          </CardHeader>
          <div className="space-y-3">
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
            </fieldset>
            <Button className="!mt-3 block w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
