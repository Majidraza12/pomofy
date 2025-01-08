import { useSessionStore } from "../store/useSessionStore";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";


const Graph = () => {
  const { getSessionsByUser } = useSessionStore();
  const [sessions, setSessions] = useState([]);
  const { authUser } = useAuthStore();

  const handleSeeProductivity = async () => {
    try {
      const userSessions = await getSessionsByUser({ userId: authUser._id });
      setSessions(userSessions);
      console.log(userSessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSeeProductivity} className="btn btn-primary">
        See Productivity
      </button>
      {sessions.length > 0 && (
        <div className="mt-4">
          <pre>{JSON.stringify(sessions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Graph;
