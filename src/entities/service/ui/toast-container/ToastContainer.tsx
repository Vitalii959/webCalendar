import "./toastContainer.css";
import {useToastStore} from "@/entities/service/model/toast-storage-local";
import {Toast} from "@/shared/ui-kit/ui/toast/Toast";

export const ToastContainer = () => {
  const {showToast, content, hide} = useToastStore();

  return (
    <div className='toast-wrapper'>
      <Toast onCloseClick={hide} showToast={showToast}>
        {content}
      </Toast>
    </div>
  );
};
