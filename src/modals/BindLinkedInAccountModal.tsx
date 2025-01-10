import {
  Button,
  Input, InputOTP, InputOTPGroup, InputOTPItem, Label,
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  SelectAction,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  toast,
} from 'keep-react'
import {useCallback, useEffect, useMemo, useState} from "react"
import {useStores} from "../stores"
import {observer} from "mobx-react"
import {LinkedinAccountStatus} from "../types/LinkedinAccount.type.ts"
import {fetchWithDelay} from "../utils/fetchWithDelay.ts"
import {SyncLoader} from "react-spinners"
import {validateEmail} from "../utils/validateEmail.ts"

interface Props {
  isOpen: boolean
  close: () => void
}

export const BindLinkedInAccountModal = observer(({isOpen, close}: Props) => {
  const { UserStore } = useStores()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [otp, setOTP] = useState("")
  const [pending, setPending] = useState(false)
  const isSubmitButtonEnabled = useMemo(() => validateEmail(email) && !!password.length && !!location.length, [email, location.length, password.length])

  const handleBindAccount = useCallback(async () => {
    setPending(true)

    const {error} = await fetchWithDelay(
      UserStore.bindLinkedinAccount.bind(UserStore),
      {
        email,
        password,
        location,
      }
    )

    if (error) {
      toast.error(error)

      setPending(false)
    }

    UserStore.needCheckLinkedinAccountStatus = !error
  }, [UserStore, email, password, location])

  const handleSendOTP = useCallback(async () => {
    setPending(true)

    await UserStore.sendOTP(otp)

    UserStore.needCheckLinkedinAccountStatus = true
  }, [UserStore, otp])

  useEffect(() => {
    UserStore.fetchLocation()
    UserStore.fetchUserLocation(
      (_, country) => {
        setLocation(country)
      }
    )
  }, [UserStore])

  useEffect(() => {
    const status = UserStore.linkedinAccountStatus

    if (status === LinkedinAccountStatus.OTP_REQUESTED) {
      UserStore.needCheckLinkedinAccountStatus = false
    }
    if (status === LinkedinAccountStatus.OTP_PROVIDED) {
      UserStore.needCheckLinkedinAccountStatus = false

      setPending(true)

      return
    }
    if (status === LinkedinAccountStatus.CONNECTED) {
      UserStore.needCheckLinkedinAccountStatus = false

      toast.success('LinkedIn account connected')

      close()
    }
    if (status === LinkedinAccountStatus.NEW) {
      return
    }
    if (status === LinkedinAccountStatus.INVALID_CREDENTIALS) {
      UserStore.needCheckLinkedinAccountStatus = false

      toast.error('Invalid email or password')
    }

    setPending(false)
  }, [UserStore, UserStore.linkedinAccountStatus, close])

  let Component = (
    <ModalContent className="min-w-[500px] min-h-[300px]">
      <ModalHeader className="mb-6 space-y-3">
        <div className="space-y-1">
          <ModalTitle>
            <div className="text-heading-6">Bind a LinkedIn account</div>
          </ModalTitle>
          <ModalDescription>
            <div className="text-body-4">
              Before you need bind your LinkedIn account
            </div>
          </ModalDescription>
        </div>
      </ModalHeader>
      <div className="mt-4 mb-4">
        <div className="space-y-3">
          <fieldset className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset className="space-y-3">
            <Label>Location</Label>
            <Select onValueChange={setLocation} value={location}>
              <SelectAction>
                <SelectValue placeholder="Select current location"/>
              </SelectAction>
              <SelectContent>
                <SelectGroup>
                  {UserStore.locations?.map((location) => (
                    <SelectItem value={location.iso_code}>{location.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </fieldset>
        </div>
      </div>
      <ModalFooter>
        <Button color="success" disabled={!isSubmitButtonEnabled || pending} onClick={handleBindAccount}>
          Bind
        </Button>
        <Button color="error" disabled={pending} onClick={close}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  )

  if (pending) {
    Component = (
      <ModalContent className="min-w-[500px] min-h-[300px]">
        <div className="flex justify-center items-center h-[300px]">
          <div className="flex flex-row gap-4">
            <SyncLoader color="rgb(27, 77, 255)" size={10}/>
            <p className="flex justify-center items-center">Connecting...</p>
          </div>
        </div>
      </ModalContent>
    )
  }

  if (UserStore.linkedinAccountStatus === LinkedinAccountStatus.OTP_REQUESTED) {
    Component = (
      <ModalContent className="min-w-[420px] min-h-[250px]">
        <ModalHeader className="mb-6 space-y-3">
          <div className="space-y-1">
          <ModalTitle>
              <div className="text-heading-6">OTP code required</div>
            </ModalTitle>
            <ModalDescription>
              <div className="text-body-4">
                Linkedin sent you OTP code. You need write down OTP code in this form.
              </div>
            </ModalDescription>
          </div>
        </ModalHeader>
        <div className="mt-4 mb-8">
          <div className="space-y-3">
            <fieldset className="space-y-3">
              <div className="relative">
                <InputOTP
                  autoFocus
                  onChange={(value) => setOTP(value)}
                  onComplete={handleSendOTP}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPItem index={0} />
                    <InputOTPItem index={1} />
                    <InputOTPItem index={2} />
                    <InputOTPItem index={3} />
                    <InputOTPItem index={4} />
                    <InputOTPItem index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </fieldset>
          </div>
        </div>
      </ModalContent>
    )
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      {Component}
    </Modal>
  )
})