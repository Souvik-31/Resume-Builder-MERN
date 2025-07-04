import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import UserProvider from './context/UserContext.jsx';
import DashboardPage from './pages/DashboardPage.jsx';


const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />

        
      </Routes>
    </UserProvider>
  )
}

export default App
