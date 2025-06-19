import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Assign from './components/Assign'
import Home from './components/Home'  
import TeamManagement from './components/TeamManagement'
import "bootstrap-icons/font/bootstrap-icons.css";
// import ProfilePage from './components/ProfilePage'
import AdminLogin from './components/AdminLogin'
import MemberSignup from './components/MemberSignup'



const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div>
      <Navbar 
        loginOpen={loginOpen} 
        setLoginOpen={setLoginOpen}
        signupOpen={signupOpen}
        setSignupOpen={setSignupOpen}
      />
      <Home setLoginOpen={setLoginOpen} />
      <Assign />
      <TeamManagement />
      {/* <ProfilePage /> */}
      <AdminLogin />
      <MemberSignup />
     
  

    </div>
  )
}

export default App