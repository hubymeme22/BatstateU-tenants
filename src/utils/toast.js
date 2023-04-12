import { toast } from 'react-toastify';

export const showToast = (message) => {
  toast(message);
};

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message, { autoClose: 2000 });
};
