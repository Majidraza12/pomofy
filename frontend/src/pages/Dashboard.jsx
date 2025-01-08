import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import ModeSelector from "../components/ModeSelector";
import Graph from "../components/Graph";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <ModeSelector />
      <Timer />
      <Graph />
    </div>
  );
};

export default Dashboard;
