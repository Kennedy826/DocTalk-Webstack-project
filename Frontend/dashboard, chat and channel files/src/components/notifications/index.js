import { toast, Slide } from 'react-toastify';

const options = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  newestOnTop: true,
  closeButton: false,
  transition: Slide,
};

export const toastSuccess = (message) => {
  toast.success(message, options);
};

export const toastError = (message = 'Network problem') => {
  toast.error(message, options);
};
