import { flow, makeAutoObservable } from "mobx"

export enum ModalType {
  BindLinkedInAccount,
  OpenAddProspect,
  CreateCampaign,
  RemakeComment,
}

class ModalStore {
  openModal: ModalType = null
  modalProps: unknown = {}
  closeAction: () => void

  constructor() {
    makeAutoObservable(this, {
      open: flow,
      close: flow,
    })
  }

  *open(type: ModalType, props?: unknown, closeAction?: () => void) {
    this.openModal = type
    this.modalProps = props
    this.closeAction = closeAction

    yield undefined
  }

  *close() {
    this.openModal = null
    this.modalProps = {}

    this.closeAction?.()

    yield undefined
  }
}

export default ModalStore