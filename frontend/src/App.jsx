import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, login } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check authentication on app load
    console.log("Auth Check");
  }, [checkAuth]);

  console.log({ authUser });

  // Show a loading spinner while checking auth status
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Routes>
        {/* Show Landing page if not logged in, Dashboard if logged in */}
        <Route path="/" element={!authUser ? <Landing /> : <Navigate to="/dashboard"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Redirect to Login if user is not authenticated */}
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
