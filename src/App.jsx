import React from 'react'
import Navbar from './components/navbar'
import Assign from './components/assign'
import Home from './components/home'  
import "bootstrap-icons/font/bootstrap-icons.css";
const App = () => {
  return (
    <div>
      <Home />
      <Navbar />
      <Assign />
      </div>
  )
}

export default App