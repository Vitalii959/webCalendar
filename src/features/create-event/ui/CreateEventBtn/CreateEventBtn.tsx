import "./CreateEventBtn.css";
import {useModalStore} from "@/entities/service/model/modal-storage-local";
import {EventForm} from "../EventForm/EventForm";
import {Button} from "@/shared/ui-kit/ui/Button";

export const CreateEventBtn = () => {
  const setModalContent = useModalStore((state) => state.setModalContent);

  const openModal = () => {
    const title = "Create event";
    const modalOpen = true;
    const modalContent = <EventForm mode='create' />;
    setModalContent(title, modalOpen, modalContent);
  };

  return (
    <div className='create-event-btn'>
      <Button options='primary' icon='plus' onClick={openModal}>
        Create
      </Button>
    </div>
  );
};
