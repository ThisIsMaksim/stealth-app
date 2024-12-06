import {
  Button, Input, Modal,
  ModalContent, ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle, Select, SelectAction, SelectContent, SelectGroup, SelectItem, SelectValue, Spinner, toast,
} from 'keep-react'
import {useCallback, useEffect, useState} from "react";
import {useStores} from "../stores";
import {ILocation} from "../types/User.type.ts";
import {observer} from "mobx-react";

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
  const [pending, setPending] = useState(false)

  const handleBindAccount = useCallback(async () => {
    setPending(true)

    await UserStore.bindLinkedinAccount({
      email,
      password,
      location,
    }, (error) => {
      if (error) {
        toast.error('Something went wrong')
      } else {
        close()
      }
    })

    setPending(false)
  }, [UserStore, email, password, location, close])

  useEffect(() => {
    UserStore.fetchLocation()
  }, [UserStore])

  return (
    <Modal
      open={isOpen}
      onOpenChange={(value) => !value ? close() : null}
    >
      <ModalContent className="min-w-[500px]">
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
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset className="space-y-3">
              <div className="relative">
                <Input
                  placeholder="Password"
                  type="password"
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
            {pending
              ? <div style={{marginLeft: '-4px', transform: 'scale(0.6)', opacity: !pending ? 0 : 1}}>
                <Spinner color="secondary"/>
              </div>
              : 'Bind'
            }
          </Button>
          <Button color="error" disabled={pending} onClick={close}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})