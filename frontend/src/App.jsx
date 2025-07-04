import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import UserProvider from './context/UserContext.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EditResume from './components/EditResume.jsx';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/resume/:id" element={<EditResume/>} />

        
      </Routes>

      <Toaster toastOptions={{ className: "", style: {fontSize:"13px"}}}>

      </Toaster>
    </UserProvider>
  )
}

export default App
