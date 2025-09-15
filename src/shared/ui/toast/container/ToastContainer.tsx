import "./toastContainer.css";
import {useToastStore} from "@/shared/lib/toast-storage";
import {Toast} from "@/shared/ui/toast/component/Toast";

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
