import Settings from './Settings'
import { useAuthStore } from '../store/useAuthStore';
import { LogOut } from "lucide-react"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {


  const { authUser, logout } = useAuthStore()
  const navigate = useNavigate()
  
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <div className="bg-primary flex justify-between">
      <p className="text-4xl text-center p-2 font-bold font-mono">Pomofy</p>
      <div className="flex p-2">
        <div className="mr-5">
          <Settings />
        </div>
        {
          authUser ? (
            <button className='btn  hover:text-gray-300' onClick={(e)=>handleLogout(e)}><LogOut/></button>
          ) : ""
        }
      </div>
    </div>
  );
}

export default Navbar