import { useSessionStore } from "../store/useSessionStore.js";
import { SlidersHorizontal } from "lucide-react";
import { useTimerStore } from "../store/useTimerStore.js";
import { useEffect } from "react";

export const Settings = () => {
  const { settings, updateSettings,setIsRunning } = useTimerStore();
  const { setSessionCompleted } = useSessionStore();


  useEffect(() => {
    setSessionCompleted(false);
    setIsRunning(false)
  }, [settings, setSessionCompleted,setIsRunning]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <SlidersHorizontal />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-black text-base-content"
      >
        <div className="card-body">
          <h3 className="font-bold text-lg">Timer Settings</h3>
          {/* Fix nesting by ensuring no <p> tag contains block-level elements */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pomodoro (minutes)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={settings.pomodoro}
              onChange={(e) =>
                updateSettings({ pomodoro: Number(e.target.value) })
              }
              min="1"
              max="60"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Short Break (minutes)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={settings.shortBreak}
              onChange={(e) =>
                updateSettings({ shortBreak: Number(e.target.value) })
              }
              min="1"
              max="30"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Long Break (minutes)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={settings.longBreak}
              onChange={(e) =>
                updateSettings({ longBreak: Number(e.target.value) })
              }
              min="1"
              max="60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
