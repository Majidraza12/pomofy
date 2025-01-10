import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()
  
  const hanldeClick = (e) => {
    e.preventDefault()
  
    navigate("/login")

  }

  return (
    <div className='flex flex-col justify-end p-3 mt-20 gap-2'>
        <p className='mx-auto text-xl underline'>Boost Your Productivity Today!</p>
        <p className='mx-auto text-sm'>Stay on top of your game—track and transform your progress with us!</p>
        <button className='btn mx-auto btn-primary mt-2 btn-md ' onClick={(e)=> hanldeClick(e)}>Login</button>
    </div>
  )
}

export default Footer