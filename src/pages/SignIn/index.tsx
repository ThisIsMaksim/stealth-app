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
import {Link} from "react-router-dom"

export function SignIn() {
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
          <form className="space-y-3">
            <fieldset className="space-y-3">
              <div className="relative">
                <Input id="email" type="email" placeholder="Email" className="ps-11"/>
                <InputIcon>
                  <Envelope size={19} color="#AFBACA"/>
                </InputIcon>
              </div>
            </fieldset>
            <fieldset className="space-y-3">
              <div className="relative">
                <Input id="password" placeholder="Password" type="password" className="ps-11"/>
                <InputIcon>
                  <Lock size={19} color="#AFBACA"/>
                </InputIcon>
              </div>
            </fieldset>
            <Button type="submit" className="!mt-3 block w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
