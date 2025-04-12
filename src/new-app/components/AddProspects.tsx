import { useCallback } from "react"
import { Card, Text, Button } from '@gravity-ui/uikit'
import { useStores } from "../../stores"
import { ModalType } from "../../stores/modal.store"

export const AddProspects = () => {
    const { ModalStore } = useStores()

    const handleAddProspects = useCallback(() => {
        ModalStore.open(ModalType.OpenAddProspect)
    }, [ModalStore])

    return (
        <Card id="add-new-prospects" className="flex flex-col items-center w-[250px] p-4" view="filled" type="container" theme="normal">
            <div className="flex flex-col items-center space-y-4 p-2 text-start">
                <Text variant="header-2" className="text-center">
                    Add Prospects
                </Text>
                <Text variant="body-2" className="text-center opacity-75">
                    Add new prospects to start working with them
                </Text>
                <Button
                    view="action"
                    size="l"
                    onClick={handleAddProspects}
                    className="mt-4"
                >
                    Add Prospects
                </Button>
            </div>
        </Card>
    )
} 