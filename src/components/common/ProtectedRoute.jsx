import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Tạm thời bỏ qua các kiểm tra bảo mật trong quá trình phát triển
  return children;
};

export default ProtectedRoute;