import { create } from 'zustand';

const useUserStore = create((set) => ({
  loadLoader: true,
  setLoadLoader: (value) => set({ loadLoader: value }),
}));

export default useUserStore;
