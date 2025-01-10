import { useEffect } from "react";
import { useTimerStore } from "../store/useTimerStore";
import { useSessionStore } from "../store/useSessionStore";
import { RotateCcw, Play, Pause } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Timer = () => {
  const {
    timeLeft,
    isRunning,
    setTimeLeft,
    setIsRunning,
    resetTimer,
    settings,
  } = useTimerStore();
  const {
    sessionCompleted,
    setSessionCompleted,
    saveSession,
    setSessionDuration,
    sessionDuration,
  } = useSessionStore();
  const { authUser } = useAuthStore();

  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };
  useEffect(() => {
    if (authUser && sessionCompleted) {
      saveSession({
        duration: sessionDuration,
      });
    }
  }, [authUser, sessionCompleted, saveSession, sessionDuration]);
  //create a timer using Intervals
  useEffect(() => {
    setSessionDuration(settings.pomodoro);
    console.log("Time Left", settings.pomodoro);
  }, [isRunning, setSessionDuration, settings.pomodoro, timeLeft]);


  useEffect(() => {
    console.log("Duration", sessionDuration);
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 950);
    }
    if (timeLeft - 1 === 0) {
      setSessionCompleted(true);
      setIsRunning(false);
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [
    isRunning,
    timeLeft,
    setTimeLeft,
    setSessionCompleted,
    sessionCompleted,
    setSessionDuration,
    setIsRunning,
    resetTimer,
    sessionDuration,
  ]);
  //Format the time to display in the timer
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const hanldeTimerReset = () => {
    resetTimer();
    setSessionCompleted(false);
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <p className="text-8xl">{formatTime(timeLeft)}</p>
      <div className="mt-10 flex gap-2">
        <button className="btn btn-primary" onClick={handleStartPause}>
          {isRunning ? <Pause /> : <Play />}
        </button>
        <button className="btn btn-primary" onClick={hanldeTimerReset}>
          <RotateCcw />
        </button>
      </div>
    </div>
  );
};

export default Timer;
