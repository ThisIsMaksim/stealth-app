import {Envelope, Eye, Lock} from 'phosphor-react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  InputIcon,
  toast,
} from 'keep-react'
import './index.css'
import {useStores} from "../../stores"
import {useCallback, useState} from "react"
import {Link} from "react-router-dom"
import {fetchWithDelay} from "../../utils/fetchWithDelay.ts";
import { Colors } from '../../../src/colors';

export function SignIn() {
  const { UserStore } = useStores()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = useCallback(() => {
    setPending(true)

    const promise = async () => {
      const { error } = await fetchWithDelay(
        UserStore.signIn.bind(UserStore),
        {
          email: email,
          password: password,
        }
      )

      if (error) {
        toast.error(error)
      } else {
        toast.success('Successfully')

        location.href = '/workspace/audience'
      }

      setPending(false)
    }

    toast.promise(promise, {
      loading: 'Do magic...',
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
                <Link to="/signup">Sign up</Link>
              </Button>
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
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
                  <Envelope size={19} color={Colors.gray[400]}/>
                </InputIcon>
              </div>
            </fieldset>
            <fieldset>
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
            </fieldset>
            <Button className="!mt-3 block w-full" disabled={pending} onClick={handleLogin}>
              Login
            </Button>
          </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
