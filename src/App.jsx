import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Assign from './components/Assign';
import TeamManagement from './components/TeamManagement';
import DashboardLayout from './components/user/DashboardLayout';
import Task from './components/user/Task';
import SubmitPage from './components/user/Submit';
import TeamDashboard from './components/user/TeamDashboard';
import LogOut from './components/user/LogOut';
import './App.css'; // if you have one

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar
                loginOpen={loginOpen}
                setLoginOpen={setLoginOpen}
                signupOpen={signupOpen}
                setSignupOpen={setSignupOpen}
              />
              <Home setLoginOpen={setLoginOpen} />
              <Assign />
              <TeamManagement />
            </>
          }
        />

        {/* User Dashboard Routes */}
        <Route path="/member" element={<DashboardLayout />}>
          <Route index element={<Task />} />
          <Route path="dashboard" element={<TeamDashboard />} />
          <Route path="tasks" element={<Task />} />
          <Route path="submit/:projectId" element={<SubmitPage />} />
        </Route>

        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </Router>
  );
};

export default App;
