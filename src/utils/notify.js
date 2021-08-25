import { toast } from "react-toastify";

toast.configure();

const alignment = {
  position: toast.POSITION.TOP_RIGHT,
};

export const errorToast = (text) => {
  toast.error(text, alignment);
};

export const successToast = (text) => {
  toast.success(text, alignment);
};

export const infoToast = (text) => {
  toast.info(text, alignment);
};

export const warningToast = (text) => {
  toast.warn(text, alignment);
};
