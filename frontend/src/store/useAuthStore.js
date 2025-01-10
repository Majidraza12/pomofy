import { axiosInstance } from "../lib/axios";
import { create } from "zustand"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  isFetchingQuote: false,
  quote: null,
  //reset Password thing
  isSendingOTP: false,
  isVerifying: false,
  isValid: true,
  step: 1,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in CheckAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  //Data from frontend is always is sent in JSON object format
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("logout Successful");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },
  getQuote: async () => {
    set({ isFetchingQuote: true });
    try {
      const res = await axiosInstance.get("/auth/getQuote");
      if (res.data[0].a === "zenquotes.io") {
        set({
          quote: "Keep your eyes on the stars, and your feet on the ground.",
        });
      } else {
        set({ quote: res.data[0].q });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isFetchingQuote: false });
    }
  },
}));

