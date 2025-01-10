import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import ModeSelector from "../components/ModeSelector";
import Graph from "../components/Graph";
import Quote from "../components/Quote";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <ModeSelector />
      <Timer />
      <Graph />
      <Quote />
    </div>
  );
};

export default Dashboard;
