import { Flip, toast } from "react-toastify";

const baseOptions = {
    className: "toast-container",
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
};

export const defaultMsg = (msg) => toast(msg, baseOptions);
export const infoMsg = (msg) => toast.info(msg, baseOptions);
export const successMsg = (msg) => toast.success(msg, baseOptions);
export const warningMsg = (msg) => toast.warn(msg, baseOptions);
export const errorMsg = (msg) => toast.error(msg, baseOptions);