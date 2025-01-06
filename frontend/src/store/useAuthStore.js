import { axiosInstance } from "../lib/axios";
import { create } from "zustand"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import axios from "axios";


const BASE_URL = "http://localhost:3001"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,
    //reset Password thing
    isSendingOTP: false,
    isVerifying: false,
    isValid: true,
    step: 1,
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth")
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in CheckAuth", error)
            set({authUser:null})
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    //Data from frontend is always is sent in JSON object format
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axios.post("/auth/signup",data)
            set({ authUser: res.data })
            toast.success("Account Created Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        } finally {
            set({isSigningUp : false})
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged In Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        finally {
            set({isLoggingIn:false})
        }
    },
    logout: async () => {
        try {
            const res = axiosInstance.post("/auth/logout")
            set({authUser : null})
            toast.success("logout Successful")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    },




}))

