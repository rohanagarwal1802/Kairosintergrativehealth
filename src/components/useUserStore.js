import { create } from 'zustand';

const useUserStore = create((set) => ({
  loadLoader: true,
  setLoadLoader: (value) => set({ loadLoader: value }),
  expanded: true,
  setExpanded: (value) => set({ expanded: value }),

  pageDisplay: "",
  setPageDisplay: (value) => set({ pageDisplay: value }),

  login: false,
  setLogin: (value) => set({ login: value }),

  toResetPassword: false,
  setResetPassword: (value) => set({ toResetPassword: value }),

}));

export default useUserStore;
