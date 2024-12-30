import { create } from "zustand";

const useCustomSnackbarStore = create((set) => ({
  snackbarOpen: false,
  alertType: "success",
  alertMessage: "",
  setSnackbar: (type, message) =>
    set((state) => ({
      snackbarOpen: true,
      alertType: type,
      alertMessage: message,
    })),
  closeSnackbar: () =>
    set((state) => ({
      snackbarOpen: false,
    })),
}));

export default useCustomSnackbarStore;