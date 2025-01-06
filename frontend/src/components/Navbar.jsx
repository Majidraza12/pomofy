import React from 'react'
import Settings from './Settings'

const Navbar = () => {
  return (
    <div className="bg-primary flex justify-between">
      <p className="text-2xl p-2">Productivity At its finest</p>
      <div className="flex">
        <p>Toggle</p>
        <div className="mr-5">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Navbar