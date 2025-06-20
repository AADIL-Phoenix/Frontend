import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';


const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Do you want to logout?");
    if (confirmed) {
      navigate('/');
    }
  };
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>User</h2>
        <ul>
          <li>
            <NavLink to="/member/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
              🏠 Dashboard
            </NavLink>

            <NavLink to="/member/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
              📋 My Tasks
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              🚪 Logout
            </button>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
