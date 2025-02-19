import {BindLinkedInAccountModal} from "../../modals/BindLinkedInAccountModal.tsx"
import {useStores} from "../../stores"
import {ModalType} from "../../stores/modal.store.ts"
import {AddProspectModal} from "../../modals/AddProspectModal.tsx"
import {observer} from "mobx-react"
import {CreateCampaignModal} from "../../modals/CreateCampaignModal.tsx"
import {RemakeCommentModal} from "../../modals/RemakeCommentModal.tsx"

const Modals = {
    [ModalType.BindLinkedInAccount]: BindLinkedInAccountModal,
    [ModalType.OpenAddProspect]: AddProspectModal,
    [ModalType.CreateCampaign]: CreateCampaignModal,
    [ModalType.RemakeComment]: RemakeCommentModal,
}

export const Modal = observer(() => {
    const { ModalStore } = useStores()
    const type = ModalStore.openModal
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const props: object = ModalStore.modalProps
    const Component = Modals[type]

    if (!Component) return null

    return <>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
        <Component
          isOpen={true}
          close={ModalStore.close.bind(ModalStore)}
          {...props}
        />
    </>
})