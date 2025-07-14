import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const UserDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>UserDashboard</h2>
      <button onClick={() => navigate("/user-dashboard/orders")}>Orders</button>
      <button onClick={() => navigate("/user-dashboard/settings")}>Settings</button>
      <Outlet />
    </div>
  )
}
