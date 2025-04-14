import { Card, Button } from '@gravity-ui/uikit'
import { useStores } from '../../stores'
import { useCallback } from 'react'
import { ModalType } from '../../stores/modal.store'

export const WelcomeEmptyState = () => {
  const { ModalStore } = useStores()

  const handleAddProspects = useCallback(() => {
      ModalStore.open(ModalType.OpenAddProspect)
  }, [ModalStore])

  return (
    <Card id="welcome" className="flex flex-col items-center justify-center w-[100vw] max-w-[650px] h-[500px] p-8">
      <div className="text-9xl pt-4">👋🎉</div>
      <h2 className="mb-[14px] mt-5 text-2xl font-semibold text-center">Welcome!</h2>
      <p className="text-gray-600 text-center mb-8">
        Start adding your first prospects to see them here.
      </p>
      <Button view="action" size="xl" onClick={handleAddProspects}>
        Add first prospect
      </Button>
    </Card>
  ) 
}