import { observer } from "mobx-react"
import { useCallback } from "react"
import { useStores } from "../../stores"
import { Card, Loader, Text, Button } from "@gravity-ui/uikit"
import { ModalType } from "../../stores/modal.store"
import { LinkedinAccountStatus } from "../../types/LinkedinAccount.type"
// import { fetchWithDelay, Action } from "../../utils/fetchWithDelay"

export const Profile = observer(() => {
    const { UserStore, ModalStore } = useStores()
    const user = UserStore.user

  const handleBindLinkedInAccount = useCallback(() => {
    ModalStore.open(
      ModalType.BindLinkedInAccount,
      {
        locations: UserStore.locations,
      },
      () => UserStore.needCheckLinkedinAccountStatus = false
    )
  }, [UserStore, ModalStore])
//   const handleUnBindLinkedInAccount = useCallback(async () => {
//     await fetchWithDelay<void, Action<void>>(
//       UserStore.unBindLinkedinAccount.bind(UserStore),
//       undefined,
//     )
//   }, [UserStore])

  switch (user?.linkedin_account?.status) {
    case undefined:
    case LinkedinAccountStatus.NEW:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="warning">
            <div className="flex flex-col items-center space-y-4 p-2 text-start">
                <Text variant="header-2" className="text-center">
                    Connect LinkedIn Account
                </Text>
                <Text variant="body-2" className="text-center opacity-75">
                    To use the full functionality of the application, you need to connect your LinkedIn account
                </Text>
                <Button
                    view="outlined"
                    size="l"
                    onClick={handleBindLinkedInAccount}
                    className="mt-4"
                >
                    Connect Account
                </Button>
            </div>
            </Card>
        )

      break
    case LinkedinAccountStatus.CONNECTED:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="success">
                <div className="flex flex-col items-center space-y-4 p-2 text-start">
                    <Text variant="header-2" className="text-center">
                        LinkedIn Account Connected
                    </Text>
                    <Text variant="body-2" className="text-center opacity-75">
                        Your LinkedIn account is successfully connected. You can now use all features of the application.
                    </Text>
                </div>
            </Card>
        )
    case LinkedinAccountStatus.ERROR:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="danger">
                <div className="flex flex-col items-center space-y-4 p-2 text-start">
                    <Text variant="header-2" className="text-center">
                        Connection Error
                    </Text>
                    <Text variant="body-2" className="text-center opacity-75">
                        An error occurred while connecting your LinkedIn account. Please try again.
                    </Text>
                    <Button
                        view="outlined"
                        size="l"
                        onClick={handleBindLinkedInAccount}
                        className="mt-4"
                    >
                        Try Again
                    </Button>
                </div>
            </Card>
        )
    default:
        return (
            <Card className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="danger">
                <div className="flex flex-col items-center space-y-4 p-2 text-start">
                    <Text variant="header-2" className="text-center">
                        Pending...
                    </Text>
                    <Loader className="mt-4" />
                </div>
            </Card>
        )
    }
}) 