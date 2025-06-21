import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./style/booking.css"
import 'bootstrap/dist/css/bootstrap.min.css'
<<<<<<< HEAD
=======
import '@fortawesome/fontawesome-free/css/all.min.css' // Thêm FontAwesome
>>>>>>> 1a644ab (1)

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
<<<<<<< HEAD
=======
import RoleSelection from "./pages/auth/RoleSelection" // Thêm import cho trang chọn vai trò
>>>>>>> 1a644ab (1)

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

<<<<<<< HEAD
// Protected Route Component
import ProtectedRoute from "./components/common/ProtectedRoute"

=======
// Import các component cho đăng ký bác sĩ
import DoctorRequestForm from './pages/auth/DoctorRequestForm';
import DoctorRequestStatus from "./components/doctor/DoctorRequestStatus"

// Admin components & pages
// Import AdminLayout mới
import AdminLayout from "./components/admin/layout/AdminLayout"
import Dashboard from "./components/admin/Dashboard"
import DoctorRequests from "./components/admin/DoctorRequests"
import ManageDepartments from "./components/admin/ManageDepartments"
import ManagePatients from "./components/admin/ManagePatients"

// Protected Route Component
import ProtectedRoute from "./components/common/ProtectedRoute"


>>>>>>> 1a644ab (1)
// Public pages
import Services from "./pages/public/Services.jsx"
import Equipment from "./pages/public/Equipment.jsx"
import News from "./pages/public/News.jsx"
import Contact from "./pages/public/Contact.jsx"
<<<<<<< HEAD
import Specialties from "./pages/Specialties"
import ChatBot from "./pages/chatbot.jsx";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard"
import DepartmentManager from "./pages/admin/department"


=======
import ChatBot from "./pages/chatbot.jsx";

>>>>>>> 1a644ab (1)
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
<<<<<<< HEAD
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
=======
      <Routes>
        {/* Admin routes - Sử dụng AdminLayout mới không bao gồm Header và Footer chung */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctor-requests"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout>
                <DoctorRequests />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout>
                <ManageDepartments />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout>
                <ManagePatients />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Các route khác sẽ bao gồm Header và Footer - Thay đổi "/" thành "/*" */}
        <Route path="/*" element={
          <>
            <Header />
            <main className="main-content">
              <Routes>
                {/* Public routes - Xóa dấu "/" ở đầu của các path */}
                <Route path="" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="services" element={<Services />} />
                <Route path="equipment" element={<Equipment />} />
                <Route path="news" element={<News />} />
                <Route path="contact" element={<Contact />} />
                <Route path="chat" element={<ChatBot />} />

                {/* Thêm route cho trang chọn vai trò */}
                <Route
                  path="select-role"
                  element={
                    <ProtectedRoute>
                      <RoleSelection />
                    </ProtectedRoute>
                  }
                />

                {/* Doctor Search routes - Xóa dấu "/" ở đầu */}
                <Route path="doctors" element={<DoctorSearch />} />
                <Route path="doctors/:id" element={<DoctorDetails />} />

                {/* Appointment routes - Xóa dấu "/" ở đầu */}
                <Route path="appointments/confirmation" element={<AppointmentConfirmation />} />

                {/* Protected routes - Patient - Xóa dấu "/" ở đầu */}
                <Route
                  path="patient/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                      <PatientDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="book-appointment/:id"
                  element={
                    <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                      <BookAppointment />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="patient/appointments"
                  element={
                    <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                      <PatientAppointments />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="patient/profile"
                  element={
                    <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                      <PatientProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Protected routes - Doctor - Xóa dấu "/" ở đầu */}
                <Route
                  path="doctor/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
                      <PlaceholderDoctorDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="doctor/appointments"
                  element={
                    <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
                      <DoctorAppointments />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="doctor/profile"
                  element={
                    <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
                      <DoctorProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Thêm routes mới cho đăng ký làm bác sĩ */}
                <Route
                  path="doctor-request"
                  element={
                    <ProtectedRoute>
                      <DoctorRequestForm />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="doctor-request-status"
                  element={
                    <ProtectedRoute>
                      <DoctorRequestStatus />
                    </ProtectedRoute>
                  }
                />

            

                {/* Unauthorized page - Xóa dấu "/" ở đầu */}
                <Route
                  path="unauthorized"
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
                
                {/* Catch-all route cho 404 */}
                <Route 
                  path="*" 
                  element={
                    <div className="container py-5 text-center">
                      <h2>Không tìm thấy trang</h2>
                      <p>Trang bạn đang tìm kiếm không tồn tại.</p>
                      <Link to="/" className="btn btn-primary">
                        Về trang chủ
                      </Link>
                    </div>
                  } 
                />
              </Routes>
            </main>
            <Footer />

          </>
        } />
      </Routes>
>>>>>>> 1a644ab (1)
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

<<<<<<< HEAD
export default App
=======
export default App
>>>>>>> 1a644ab (1)
