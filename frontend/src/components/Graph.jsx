import { useSessionStore } from "../store/useSessionStore";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";


const Graph = () => {
  const { getSessionsByUser } = useSessionStore();
  const [sessions, setSessions] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const { authUser } = useAuthStore();
  const dates = [];
  const durations = [];

  const handleSeeProductivity = async () => {
    try {
      const userSessions = await getSessionsByUser({ userId: authUser._id });
      setSessions(userSessions);
      // console.log("Fetched sessions:", userSessions);

      // Map over userSessions instead of sessions
      userSessions.map((session, index) => {
        console.log("Session : ", session);
        dates[index] = session.date;
        durations[index] = session.totalDuration;
      });

      // console.log("Dates : ", dates);
      // console.log("Durations : ", durations);

      setShowStats(true);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center mt-20">
        <button onClick={handleSeeProductivity} className="btn btn-primary">
          Productivity Stats
        </button>
      </div>

      {/* Modal */}
      {showStats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowStats(false)}
          ></div>

          <div className="relative z-50 bg-black rounded-lg p-6 shadow-xl min-w-[600px]">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-bold text-white mb-4">
                Your Productivity Stats
              </h1>

              {/* Styled Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-200">
                  <thead className="text-xs uppercase bg-base-300 text-gray-200">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr
                        key={index}
                        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">{session.date}</td>
                        <td className="px-6 py-4">{session.totalDuration + " minutes"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                className="btn btn-primary mt-6"
                onClick={() => setShowStats(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Graph;
