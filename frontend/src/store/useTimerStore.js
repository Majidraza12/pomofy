import { create } from 'zustand';

export const useTimerStore = create((set) => ({
  mode: 'pomodoro',
  timeLeft: 45 * 60, // Derived dynamically based on settings if needed
  isRunning: false,
  settings: {
    pomodoro: 45,
    shortBreak: 5,
    longBreak: 15,
  },
  setMode: (mode) => {
    const validModes = ['pomodoro', 'shortBreak', 'longBreak'];
    if (!validModes.includes(mode)) {
      console.error('Invalid mode:', mode);
      return;
    }
    set((state) => ({
      mode,
      timeLeft: state.settings[mode] * 60,
      isRunning: false,
    }));
  },
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setIsRunning: (isRunning) => set({ isRunning }),
  updateSettings: (newSettings) =>
    set((state) => {
      const updatedSettings = { ...state.settings, ...newSettings };
      return {
        settings: updatedSettings,
        timeLeft: updatedSettings[state.mode] * 60,
      };
    }),
  resetTimer: () =>
    set((state) => ({
      timeLeft: state.settings[state.mode] * 60,
      isRunning: false,
    })),
}));
