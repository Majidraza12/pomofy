import { useTimerStore } from '../store/useTimerStore'
import { useSessionStore } from '../store/useSessionStore'
import { useEffect } from 'react'

const ModeSelector = () => {

    const { mode, setMode } = useTimerStore()
    const { setSessionCompleted } = useSessionStore()
    
    useEffect(() => { 
        setSessionCompleted(false)
    },[mode,setSessionCompleted])

  return (
    <div className='flex justify-center mt-20 gap-4'>
        <button className={mode ==="pomodoro" ? "btn btn-primary": ""} onClick={()=>setMode("pomodoro")}>
            Pomodoro
        </button>
        <button className={mode ==="shortBreak" ? "btn btn-primary": ""} onClick={()=>setMode("shortBreak")}>
            Short Break
        </button>
        <button className={mode ==="longBreak" ? "btn btn-primary": ""} onClick={()=>setMode("longBreak")}>
            Long Break
        </button>
    </div>
  )
}

export default ModeSelector