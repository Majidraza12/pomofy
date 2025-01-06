import React from 'react'
import Navbar from '../components/Navbar'
import Timer from '../components/Timer'
import ModeSelector from '../components/ModeSelector'

const Dashboard = () => {
  return (
    <div>
          <Navbar />
          <ModeSelector/>
          <Timer/>
    </div>
  )
}

export default Dashboard