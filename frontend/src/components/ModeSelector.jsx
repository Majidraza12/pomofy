import React from 'react'
import { useTimerStore } from '../store/useTimerStore'

const ModeSelector = () => {

    const {mode,setMode} = useTimerStore()

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