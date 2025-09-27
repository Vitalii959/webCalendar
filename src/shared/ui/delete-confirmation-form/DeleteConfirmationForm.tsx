import {Button} from "@/shared/ui/Button";
import "./deleteConfirmationForm.css";

type Props = {
  eventTitle?: string;
  deleteFn: () => void;
  cancelFn: () => void;
};
export const DeleteConfirmationForm = ({
  eventTitle,
  deleteFn,
  cancelFn
}: Props) => {
  return (
    <div className='form-container'>
      <h3 className='form-title'>
        {`Are you sure you want to delete ${eventTitle}? You'll no longer have access to it.`}
      </h3>
      <div className='buttonsContainer'>
        <Button options='secondary' onClick={cancelFn}>
          Cancel
        </Button>
        <Button options='primary' onClick={deleteFn}>
          Delete
        </Button>
      </div>
    </div>
  );
};
