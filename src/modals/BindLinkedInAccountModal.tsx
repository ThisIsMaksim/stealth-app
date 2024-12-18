import {
  Button,
  Input,
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
  Spinner, toast,
} from 'keep-react'
import {useCallback, useEffect, useState} from "react";
import {useStores} from "../stores";
import {ILocation} from "../types/User.type.ts";
import {observer} from "mobx-react";
import {LinkedinAccountStatus} from "../types/LinkedinAccount.type.ts";

interface Props {
  isOpen: boolean
  locations: ILocation[]
  close: () => void
}

export const BindLinkedInAccountModal = observer(({isOpen, locations, close}: Props) => {
  const { UserStore } = useStores()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [otp, setOTP] = useState("")
  const [pending, setPending] = useState(false)

  const handleBindAccount = useCallback(async () => {
    setPending(true)

    await UserStore.bindLinkedinAccount({
      email,
      password,
      location,
    })

    UserStore.needCheckLinkedinAccountStatus = true
  }, [UserStore, email, password, location, close])

  const handleSendOTP = useCallback(async () => {
    setPending(true)

    await UserStore.sendOTP(otp)

    UserStore.needCheckLinkedinAccountStatus = true
  }, [otp])

  useEffect(() => {
    UserStore.fetchLocation()
  }, [])

  useEffect(() => {
    UserStore.needCheckLinkedinAccountStatus = false

    const status = UserStore.linkedinAccountStatus

    if (status === LinkedinAccountStatus.OTP_REQUESTED) {
    }
    if (status === LinkedinAccountStatus.OTP_PROVIDED) {
      setPending(true)

      return
    }
    if (status === LinkedinAccountStatus.CONNECTED) {
      toast.success('LinkedIn account connected')

      close()
    }
    if (status === LinkedinAccountStatus.NEW) {
    }
    if (status === LinkedinAccountStatus.INVALID_CREDENTIALS) {
      toast.error('Invalid email or password')
    }

    setPending(false)
  }, [UserStore.linkedinAccountStatus])

  let Component = (
    <>
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
            <div className="relative">
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </fieldset>
          <fieldset className="space-y-3">
            <div className="relative">
              <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <Select onValueChange={setLocation}>
            <SelectAction>
              <SelectValue placeholder="Select current location"/>
            </SelectAction>
            <SelectContent>
              <SelectGroup>
                {locations.map((location) => (
                  <SelectItem value={location.iso_code}>{location.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ModalFooter>
        <Button color="success" disabled={pending} onClick={handleBindAccount}>
          Bind
        </Button>
        <Button color="error" disabled={pending} onClick={close}>Cancel</Button>
      </ModalFooter>
    </>
  )

  if (pending) {
    Component = (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner />
      </div>
    )
  }

  if (UserStore.linkedinAccountStatus === LinkedinAccountStatus.OTP_REQUESTED) {
    Component = (
      <>
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
        <div className="mt-4 mb-4">
          <div className="space-y-3">
            <fieldset className="space-y-3">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="OTP"
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
            </fieldset>
          </div>
        </div>
        <ModalFooter>
          <Button color="success" onClick={handleSendOTP}>
            Send
          </Button>
        </ModalFooter>
      </>
    )
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent className="min-w-[500px] min-h-[300px]">
        {Component}
      </ModalContent>
    </Modal>
  )
})