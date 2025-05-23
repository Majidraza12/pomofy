import  { useEffect } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import Login from "./pages/Login";
import ResetPage from "./pages/ResetPage";
const App = () => {
  
  const { authUser, checkAuth, isCheckingAuth,} = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check authentication on app load
    // console.log("Auth Check");
    // console.log(isCheckingAuth)
  }, [checkAuth,isCheckingAuth]);


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
        <Route path="/" element={authUser ? <Dashboard/> : <Landing/>} />
        <Route path="/login" element={ !authUser ? <Login /> : <Dashboard/>} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Dashboard />} />
        <Route path="/forgetPassword" element={<ResetPage/>} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
