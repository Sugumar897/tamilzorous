import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/login';
import Registration from './registration/registration';
import Admin from './admin/admin';
import Employee from './employee/employee';
import ProtectedRoute from './protectedroute';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRole="employee">
              <Employee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
