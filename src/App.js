import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./style/booking.css"
import 'bootstrap/dist/css/bootstrap.min.css'

// Context Providers
import { AuthProvider } from "./context/AuthContext"

// Layout components
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Public pages
import HomePage from "./pages/Home"
import LoginPage from "./pages/auth/Login"
import RegisterPage from "./pages/auth/Register"
import ForgotPasswordPage from "./pages/auth/ForgotPassword"
import ResetPasswordPage from "./pages/auth/ResetPassword"

// Patient pages
import DoctorSearch from "./pages/patient/DoctorSearch"
import DoctorDetails from "./pages/patient/DoctorDetail"
import BookAppointment from "./pages/patient/BookAppointment"
import PatientAppointments from "./pages/patient/PatientAppointment"
import PatientDashboard from "./pages/patient/PatientDashboard"
import PatientProfile from "./pages/patient/PatientProfile"

// Doctor pages
import DoctorAppointments from "./pages/doctor/DoctorAppointment"
import DoctorProfile from "./pages/doctor/DoctorProfile"

// Protected Route Component
import ProtectedRoute from "./components/common/ProtectedRoute"

// Public pages
import Services from "./pages/public/Services.jsx"
import Equipment from "./pages/public/Equipment.jsx"
import News from "./pages/public/News.jsx"
import Contact from "./pages/public/Contact.jsx"
import Specialties from "./pages/Specialties"
import ChatBot from "./pages/chatbot.jsx";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard"
import DepartmentManager from "./pages/admin/department"


// Placeholder components
function AppointmentConfirmation() {
  return (
    <Container className="py-5">
      <h2>Xác nhận đặt lịch</h2>
    </Container>
  )
}

function PlaceholderDoctorDashboard() {
  return (
    <Container className="py-5">
      <h2>Bảng điều khiển bác sĩ</h2>
    </Container>
  )
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
          <Route path="/services" element={<Services />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/departments" element={<Specialties />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/chat" element={<ChatBot />} />

          {/* Doctor Search routes */}
          <Route path="/doctors" element={<DoctorSearch />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />

          {/* Appointment routes */}
          <Route path="/appointments/confirmation" element={<AppointmentConfirmation />} />

          {/* Protected routes - Patient */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book-appointment/:id"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/appointments"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                <PatientAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/profile"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                <PatientProfile />
              </ProtectedRoute>
            }
          />

          {/* Protected routes - Doctor */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
                <PlaceholderDoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
                <DoctorProfile />
              </ProtectedRoute>
            }
          />

          {/* Unauthorized page */}
          <Route
            path="/unauthorized"
            element={
              <div className="container py-5 text-center">
                <h2>Không có quyền truy cập</h2>
                <p>Bạn không có quyền để truy cập trang này.</p>
                <Link to="/" className="btn btn-primary">
                  Về trang chủ
                </Link>
              </div>
            }
          />
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
              </ProtectedRoute>
            }
          >
          <Route path="managedepartments" element={<DepartmentManager />} />     
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWithRouter />
      </AuthProvider>
    </Router>
  )
}

export default App
