import { create } from 'zustand';

const useUserStore = create((set) => ({
  loadLoader: true,
  setLoadLoader: (value) => set({ loadLoader: value }),
  expanded: true,
  setExpanded: (value) => set({ expanded: value }),

  pageDisplay: "",
  setPageDisplay: (value) => set({ pageDisplay: value }),



}));

export default useUserStore;
