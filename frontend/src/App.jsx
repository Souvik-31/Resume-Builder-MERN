import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import UserProvider from './context/UserContext.jsx';

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        
      </Routes>
    </UserProvider>
  )
}

export default App
