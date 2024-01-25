import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/pages/register';
import Login from './components/pages/login';
import Dashboard from './components/pages/Dashboard';
import LoggedInRoute from './components/partials/LoggedInRoute';
import Home from './components/pages/Home';
import CollegeBuddy from './components/pages/CollegeBuddy';
import GroupChat from './components/pages/GroupChat';
import InfoKuliah from './components/pages/InfoKuliah';

const App = () => {
  return (

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Protected Routes */}
        <Route path="/dashboard" element={<LoggedInRoute> <Dashboard /> </LoggedInRoute>} />
        <Route path='/college-buddy' element={<LoggedInRoute> <CollegeBuddy /> </LoggedInRoute>} />
        <Route path='/group-chat' element={<LoggedInRoute> <GroupChat /> </LoggedInRoute>} />
        <Route path="/info-kuliah" element={<LoggedInRoute> <InfoKuliah /> </LoggedInRoute>} />

        {/* 404 Page */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
  );
};

export default App;
