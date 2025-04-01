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

  loginLoader: false,
  setLoginLoader: (value) => set({ loginLoader: value }),

  preferedLocation:null,
  setPreferedLocation:(value)=>set({preferedLocation:value}),

}));

export default useUserStore;
