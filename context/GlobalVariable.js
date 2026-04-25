import { create } from "zustand";

export const GlobalSelector = create((set) => ({
  SelectedWork: 'chat',
  SetSelectedWork: (data) => set({ SelectedWork: data }),
  clearData: () => set({ SelectedWork: null }),
}));