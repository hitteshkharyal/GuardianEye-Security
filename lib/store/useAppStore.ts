'use client';

import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  cursorType: 'default' | 'hover' | 'button';
  setCursorType: (t: 'default' | 'hover' | 'button') => void;
  activeSection: number;
  setActiveSection: (n: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),
  cursorType: 'default',
  setCursorType: (t) => set({ cursorType: t }),
  activeSection: 0,
  setActiveSection: (n) => set({ activeSection: n }),
}));
