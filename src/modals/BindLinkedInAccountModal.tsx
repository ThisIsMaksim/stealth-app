import {useCallback, useEffect, useMemo, useState} from "react"
import {useStores} from "../stores"
import {observer} from "mobx-react"
import {LinkedinAccountStatus} from "../types/LinkedinAccount.type.ts"
import {fetchWithDelay} from "../utils/fetchWithDelay.ts"
import {validateEmail} from "../utils/validateEmail.ts"
import { Button, Modal, PinInput, Text, TextInput, useToaster } from '@gravity-ui/uikit'

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
  const {add} = useToaster()

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
      add({
        name: 'bind account error',
        theme: 'danger',
        content: error,
      })

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

    switch (status) {
      case LinkedinAccountStatus.OTP_REQUESTED:
        UserStore.needCheckLinkedinAccountStatus = true
        break
        
      case LinkedinAccountStatus.OTP_PROVIDED:
        UserStore.needCheckLinkedinAccountStatus = true
        setPending(true)
        return
      case LinkedinAccountStatus.DEVICE_VERIFY_REQUESTED:
        UserStore.needCheckLinkedinAccountStatus = true
        break
        
      case LinkedinAccountStatus.CONNECTED:
        UserStore.needCheckLinkedinAccountStatus = false

        add({
          name: 'LinkedIn account connected',
          theme: 'success',
          content: 'LinkedIn account connected',
        })

        close()
        break
        
      case LinkedinAccountStatus.NEW:
        return
        
      case LinkedinAccountStatus.INVALID_CREDENTIALS:
        UserStore.needCheckLinkedinAccountStatus = false

        add({
          name: 'Invalid email or password',
          theme: 'danger',
          content: 'Invalid email or password',
        })

        break
    }

    setPending(false)
  }, [UserStore, UserStore.linkedinAccountStatus, close])

  let content = (
    <div className="flex flex-col">
      <Text variant="header-1" className="mb-2">Bind a LinkedIn account</Text>
      <Text variant="body-1" className="mb-6">Before you need bind your LinkedIn account</Text>
      <div className="space-y-3">
        <TextInput
          label="Email"
          value={email}
          size="l"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          type="password" 
          value={password}
          size="l"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* <Select
          label="Location"
          value={location}
          placeholder="Select location"
          options={UserStore.locations?.map(location => ({
            value: location.iso_code,
            content: location.name
          }))}
          onChange={(value) => setLocation(value as string)}
        /> */}
      </div>

      <div className="mt-6 flex gap-2">
        <Button 
          view="action"
          disabled={!isSubmitButtonEnabled || pending}
          onClick={handleBindAccount}
        >
          Bind
        </Button>
        <Button 
          view="flat"
          disabled={pending}
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  )

  if (pending) {
    content = (
      <div className="flex justify-center items-center h-[300px]">
        <Text variant="body-1">Connecting...</Text>
      </div>
    )
  }

  if (UserStore.linkedinAccountStatus === LinkedinAccountStatus.OTP_REQUESTED) {
    content = (
      <div className="flex flex-col">
        <Text variant="header-1" className="mb-2">OTP code required</Text>
        <Text variant="body-1" className="mb-6">
          Linkedin sent you OTP code. You need write down OTP code in this form.
        </Text>
        <PinInput
          type="numeric"
          otp={true}
          size="l"
          length={6}
          onUpdate={(value) => {
            setOTP(value.join(''))
            
            if (value.length === 6) {
              handleSendOTP();
            }
          }}
        />
      </div>
    )
  }

  if (UserStore.linkedinAccountStatus === LinkedinAccountStatus.DEVICE_VERIFY_REQUESTED) {
    content = (
      <div className="flex flex-col">
        <Text variant="header-1" className="mb-2">Need to verify device</Text>
        <Text variant="body-1">
          Linkedin sent a notification to your signed in devices. Open your LinkedIn app and tap Yes to confirm your sign-in attempt.
        </Text>
      </div>
    )
  }

  return (
    <Modal
      open={isOpen}
      onClose={close}
    >
      <div className="w-[550px] p-12">
        {content}
      </div>
    </Modal>
  );
})