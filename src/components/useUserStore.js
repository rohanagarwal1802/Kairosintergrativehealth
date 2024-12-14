import { create } from 'zustand';

const useUserStore = create((set) => ({
  loadLoader: true,
  setLoadLoader: (value) => set({ loadLoader: value }),
  expanded: true,
  setExpanded: (value) => set({ expanded: value }),


}));

export default useUserStore;
