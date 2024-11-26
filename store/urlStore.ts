import { create } from 'zustand';

// Define the state and actions for the store
interface UrlStore {
  url: string;
  setUrl: (newUrl: string) => void;
}

// Create the store
const useUrlStore = create<UrlStore>((set) => ({
  url: '', // Initial state
  setUrl: (newUrl: string) => set({ url: newUrl }), // Action to update the URL
}));

export default useUrlStore;
