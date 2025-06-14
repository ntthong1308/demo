import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style/booking.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public pages
import HomePage from './pages/Home';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';

// Sửa đường dẫn import để trỏ đến vị trí đúng của các file
import DoctorSearch from './pages/patient/DoctorSearch';
import DoctorDetails from './pages/patient/DoctorDetail';
import BookAppointment from './pages/patient/BookAppointment';
import PatientAppointments from './pages/patient/PatientAppointment';
import DoctorAppointments from './pages/doctor/DoctorAppointment';
import PatientDashboard from './pages/patient/PatientDashboard';


// Thêm profile components với đường dẫn chính xác
import PatientProfile from './pages/patient/PatientProfile';
import DoctorProfile from './pages/doctor/DoctorProfile';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

// Các component placeholder đơn giản
function AppointmentConfirmation() {
  return <Container className="py-5"><h2>Xác nhận đặt lịch</h2></Container>;
}

function PlaceholderPatientDashboard() {
  return <Container className="py-5"><h2>Bảng điều khiển bệnh nhân</h2></Container>;
}

function PlaceholderDoctorDashboard() {
  return <Container className="py-5"><h2>Bảng điều khiển bác sĩ</h2></Container>;
}

// APP COMPONENT
function AppWithRouter() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          
          {/* Doctor Search routes */}
          <Route path="/doctors" element={<DoctorSearch />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          
          {/* Appointment routes */}
          <Route path="/appointments/confirmation" element={<AppointmentConfirmation />} />
          
          {/* Protected routes - Patient */}
          <Route 
            path="/patient/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['PATIENT', 'ADMIN']}>
                <PlaceholderPatientDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/book-appointment/:id" 
            element={
              <ProtectedRoute allowedRoles={['PATIENT', 'ADMIN']}>
                <BookAppointment />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/patient/appointments" 
            element={
              <ProtectedRoute allowedRoles={['PATIENT', 'ADMIN']}>
                <PatientAppointments />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/patient/profile" 
            element={
              <ProtectedRoute allowedRoles={['PATIENT', 'ADMIN']}>
                <PatientProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - Doctor */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['DOCTOR', 'ADMIN']}>
                <PlaceholderDoctorDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/doctor/appointments" 
            element={
              <ProtectedRoute allowedRoles={['DOCTOR', 'ADMIN']}>
                <DoctorAppointments />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/doctor/profile" 
            element={
              <ProtectedRoute allowedRoles={['DOCTOR', 'ADMIN']}>
                <DoctorProfile />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/patient/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['PATIENT', 'ADMIN']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Trang Unauthorized */}
          <Route 
            path="/unauthorized" 
            element={
              <div className="container py-5 text-center">
                <h2>Không có quyền truy cập</h2>
                <p>Bạn không có quyền để truy cập trang này.</p>
                <Link to="/" className="btn btn-primary">Về trang chủ</Link>
              </div>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWithRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;