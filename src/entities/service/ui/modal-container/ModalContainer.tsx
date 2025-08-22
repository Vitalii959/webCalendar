import {Modal} from "@/shared/ui-kit/ui/modal";
import "./modalContainer.css";
import {useModalStore} from "@/entities/service/model/modal-storage-local";

export const ModalContainer = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const children = useModalStore((state) => state.modalContent);

  const title = useModalStore((state) => state.title);
  const closeModal = useModalStore((state) => state.closeModal);

  const editButton = useModalStore((state) => state.editBtn);
  const deleteButton = useModalStore((state) => state.deleteBtn);

  return (
    <Modal
      title={title}
      showModal={isOpen}
      setShowModal={closeModal}
      editBtn={editButton}
      deleteBtn={deleteButton}
    >
      {children}
    </Modal>
  );
};
