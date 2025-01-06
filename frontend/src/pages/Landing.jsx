import React from "react";
import Navbar from "../components/Navbar";
import ModeSelector from "../components/ModeSelector";
import Timer from "../components/Timer";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col justify-end">
      <div>
        <Navbar />
        <ModeSelector />
        <Timer />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
