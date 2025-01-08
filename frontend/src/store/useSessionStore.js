import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore"; // Import your auth store

export const useSessionStore = create((set) => ({
  sessionCompleted: false,
  sessionDuration: null,

  setSessionCompleted: (completed) => set({ sessionCompleted: completed }),

  setSessionDuration: (duration) => set({ sessionDuration: duration }),

  saveSession: async (sessionData) => {
    // Get the authenticated user from the auth store
    const { authUser } = useAuthStore.getState(); // Access authUser from Zustand store

    if (!authUser || !authUser._id) {
      toast.error("User not authenticated.");
      return;
    }

    const dataToSend = {
      ...sessionData, // Include session data (duration, type)
      userId: authUser._id, // Send the userId from the authenticated user
    };

    try {
      const response = await axiosInstance.post("/session/store", dataToSend);
      toast.success("Session saved successfully!");
      return response.data;
    } catch (error) {
      console.error("Error saving session:", error);
      toast.error("Failed to save session.");
    }
  },

  getSessionsByUser: async (data) => {
    try {
      const response = await axiosInstance.post("/session/getSessions", data);
      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.log("Error getting sessions:", error);
      toast.error("Failed to get sessions.");
      return [];
    }
  },
}));

