import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import LoggedInRoute from './components/partials/LoggedInRoute';

const App = () => {
  return (

      <Routes>
        <Route path="/" element={<div>Public Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<LoggedInRoute><Dashboard /></LoggedInRoute>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
  );
};

export default App;
