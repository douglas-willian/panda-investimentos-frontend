import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function notify (status, message) {
  const options = {
    position: 'top-center',
    pauseOnFocusLoss: false,
    pauseOnHover: false,
  }
  return status === 'success' ? toast.success(message, options) : toast.error(message, options)
}

export {ToastContainer, notify}