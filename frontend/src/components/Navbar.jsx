import React from 'react'
import Settings from './Settings'
import { useAuthStore } from '../store/useAuthStore';
import {LogOut} from "lucide-react"


const Navbar = () => {


  const { authUser , logout } = useAuthStore()
  
  const handleLogout = (e) => {
    e.preventDefault()
    try {
      logout()
    } catch (error) {
      
    }
  }

  return (
    <div className="bg-primary flex justify-between">
      <p className="text-4xl text-center p-2">Productivity At its finest</p>
      <div className="flex p-2">
        <div className="mr-5">
          <Settings />
        </div>
        {
          authUser ? (
            <button className='btn hover:text-gray-300' onClick={(e)=>handleLogout(e)}><LogOut/></button>
          ) : ""
        }
      </div>
    </div>
  );
}

export default Navbar