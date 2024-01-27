class ModalService {
  closeWithId(id: string) {
    (document.getElementById(id) as HTMLDialogElement)?.close();
  }
}

export default new ModalService();
