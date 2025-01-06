import React, { useEffect } from 'react'
import { useTimerStore } from '../store/useTimerStore'
import {RotateCcw,Play,Pause} from "lucide-react"


const Timer = () => {

    const {mode,timeLeft,isRunning,settings,setTimeLeft,setIsRunning,resetTimer} = useTimerStore()

    const handleStartPause = ()=>{
        if(isRunning){
            setIsRunning(false)
        }
        else{
            setIsRunning(true)
        }
    }

    

    //create a timer using Intervals
    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
          interval = setInterval(() => {
            setTimeLeft(timeLeft - 1);
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [isRunning, timeLeft, setTimeLeft]);
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };


  return (
    <div className='flex flex-col items-center mt-10'>
        <p className='text-8xl'>{formatTime(timeLeft)}</p>
        <div className='mt-10 flex gap-2'>
            <button className='btn btn-primary' onClick={handleStartPause}>
                {isRunning ? <Pause/> : <Play/>}
            </button>
            <button className='btn btn-primary' onClick={resetTimer}>
                <RotateCcw/>
            </button>
        </div>
    </div>
  )
}

export default Timer