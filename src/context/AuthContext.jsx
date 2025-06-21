"use client"

<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authAPI } from "../services/api"
=======
import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { authAPI, doctorService } from "../services/api" // Thêm doctorService
>>>>>>> 1a644ab (1)

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
<<<<<<< HEAD
=======
  // Thêm state cho trạng thái yêu cầu bác sĩ
  const [doctorRequestStatus, setDoctorRequestStatus] = useState(null)
  const [checkingDoctorRequest, setCheckingDoctorRequest] = useState(false)
  const [initialized, setInitialized] = useState(false) // State mới để theo dõi quá trình khởi tạo
>>>>>>> 1a644ab (1)

  const navigate = useNavigate()

  useEffect(() => {
    // Check for stored user data on component mount
<<<<<<< HEAD
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      setToken(token)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
  try {
    setLoading(true)
    setError(null)

    const response = await authAPI.login({ username, password }) // ✅ Gửi đúng key

    const { token: apiToken, ...userData } = response.data
    const user = userData.user || userData

    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", apiToken)
    setUser(user)
    setToken(apiToken)

    const userRoles = user.roles || user.role || []
    if (userRoles.includes("ADMIN") || userRoles.includes("ROLE_ADMIN")) {
      navigate("/admin/dashboard")
    } else if (userRoles.includes("DOCTOR") || userRoles.includes("ROLE_DOCTOR")) {
      navigate("/doctor/profile")
    } else {
      navigate("/patient/profile")
    }

    return { success: true }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.response?.data?.error || "Đăng nhập thất bại"
    setError(errorMessage)
    return { success: false, message: errorMessage }
  } finally {
    setLoading(false)
  }
}

=======
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token")
        const storedUserStr = localStorage.getItem("user")
        
        console.log("Initializing auth - Token exists:", !!storedToken)
        console.log("Initializing auth - User data exists:", !!storedUserStr)
        
        if (storedToken && storedUserStr) {
          try {
            const storedUser = JSON.parse(storedUserStr)
            console.log("User data loaded from localStorage:", storedUser)
            
            setUser(storedUser)
            setToken(storedToken)
            
            // Kiểm tra vai trò
            const userRole = determineUserRole(storedUser)
            console.log("User role from localStorage:", userRole)
          } catch (parseError) {
            console.error("Error parsing stored user:", parseError)
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setUser(null)
            setToken(null)
          }
        }
      } catch (error) {
        console.error("Error during auth initialization:", error)
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }
    
    initializeAuth()
  }, [])

  // Thêm effect mới để kiểm tra trạng thái yêu cầu bác sĩ
  useEffect(() => {
    const checkDoctorRequestStatus = async () => {
      // Chỉ kiểm tra nếu user đã đăng nhập và không phải là bác sĩ
      if (user && token && !hasRole("DOCTOR") && !checkingDoctorRequest) {
        try {
          setCheckingDoctorRequest(true)
          const response = await doctorService.getMyRequestStatus()
          if (response.data) {
            setDoctorRequestStatus(response.data)
          }
        } catch (error) {
          console.error("Error checking doctor request status:", error)
          // Không cần xử lý lỗi, giả định user chưa gửi yêu cầu
        } finally {
          setCheckingDoctorRequest(false)
        }
      }
    }

    // Gọi hàm kiểm tra nếu người dùng đã đăng nhập
    if (user && token) {
      checkDoctorRequestStatus()
    } else {
      // Reset trạng thái khi đăng xuất
      setDoctorRequestStatus(null)
    }
  }, [user, token]) // Theo dõi sự thay đổi của user và token

  const login = async (username, password) => {
    try {
      setLoading(true)
      setError(null)

      const response = await authAPI.login({ username, password })
      console.log("Login API response (full):", response) // Debug toàn bộ response
      console.log("Login API response data:", response.data) // Debug response.data
      
      // Xử lý đối tượng phản hồi để nhận token và dữ liệu người dùng
      let apiToken, userData;
      
      // Kiểm tra các định dạng phản hồi API có thể có
      if (response.data.token) {
        apiToken = response.data.token;
        userData = response.data.user || response.data;
      } else if (response.data.accessToken) {
        apiToken = response.data.accessToken;
        userData = response.data.user || response.data;
      } else {
        // Phương án cuối cùng - giả định cấu trúc ban đầu
        const { token: extractedToken, ...extractedUserData } = response.data;
        apiToken = extractedToken;
        userData = extractedUserData.user || extractedUserData;
      }
      
      console.log("Extracted token:", apiToken) // Debug token
      console.log("Extracted user data:", userData) // Debug user object
      
      // Đảm bảo vai trò được chuẩn hóa
      if (!userData.role && !userData.roles) {
        console.warn("User role information is missing in the response")
      }
      
      // Lưu thông tin người dùng và token
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", apiToken)
      console.log("Saved to localStorage - user:", JSON.stringify(userData))
      console.log("Saved to localStorage - token:", apiToken)
      
      setUser(userData)
      setToken(apiToken)

      // Xác định người dùng mới (chưa có vai trò) hay đã có vai trò
      const userRole = determineUserRole(userData)
      const isNewUser = !userRole
      
      console.log("Detected user role:", userRole, "Is new user:", isNewUser) // Debug log
      
      if (isNewUser) {
        // Người dùng mới - chuyển đến trang chọn vai trò
        console.log("New user - navigating to role selection")
        setTimeout(() => navigate("/select-role"), 100)
      } else {
        // Người dùng đã có vai trò - chuyển đến dashboard phù hợp
        if (userRole === "ADMIN") {
          console.log("Navigating to /admin")
          setTimeout(() => navigate("/admin"), 100)
        } else if (userRole === "DOCTOR") {
          console.log("Navigating to /doctor/dashboard")
          setTimeout(() => navigate("/doctor/dashboard"), 100)
        } else if (userRole === "PATIENT") {
          console.log("Navigating to /patient/dashboard")
          setTimeout(() => navigate("/patient/dashboard"), 100)
        } else {
          // Fallback nếu không xác định được vai trò
          console.warn("Could not determine user role, defaulting to home")
          console.log("Navigating to /")
          setTimeout(() => navigate("/"), 100)
        }
  
        // Nếu sau 1 giây vẫn ở trang chủ, thực hiện refresh để cập nhật trạng thái
        setTimeout(() => {
          if (window.location.pathname === '/') {
            console.log("Force refreshing page to update auth state");
            window.location.reload();
          }
        }, 1000);
      }

      return { success: true }
    } catch (err) {
      console.error("Login error:", err)
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Đăng nhập thất bại"
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Hàm helper để xác định vai trò người dùng từ các định dạng có thể có
  const determineUserRole = (user) => {
    if (!user) return null;
    
    // Xử lý trường role nếu là chuỗi
    if (typeof user.role === 'string') {
      return user.role;
    }
    
    // Xử lý trường roles nếu là mảng
    if (Array.isArray(user.roles) && user.roles.length > 0) {
      // Ưu tiên vai trò ADMIN
      if (user.roles.includes("ADMIN") || user.roles.includes("ROLE_ADMIN")) {
        return "ADMIN";
      }
      // Ưu tiên vai trò DOCTOR tiếp theo
      if (user.roles.includes("DOCTOR") || user.roles.includes("ROLE_DOCTOR")) {
        return "DOCTOR";
      }
      // Cuối cùng là PATIENT
      if (user.roles.includes("PATIENT") || user.roles.includes("ROLE_PATIENT")) {
        return "PATIENT";
      }
      // Lấy vai trò đầu tiên nếu không có vai trò ưu tiên
      return user.roles[0].replace("ROLE_", "");
    }
    
    // Fallback
    return null;
  }

  // Cập nhật: Sửa hàm updateUserRole để xử lý lỗi API 403
  const updateUserRole = async (role) => {
    if (!user || !token) {
      console.error("Cannot update role: User not authenticated");
      return { success: false, message: "Không thể cập nhật vai trò: Người dùng chưa đăng nhập" };
    }
    
    setLoading(true);
    
    try {
      // Thử gọi API để cập nhật vai trò trên server
      try {
        await authAPI.setRole(role);
        console.log("API role update successful");
      } catch (apiError) {
        console.error("API role update failed:", apiError);
        console.warn("Continuing with local role update despite API failure");
        // Không throw lỗi ở đây, vẫn tiếp tục cập nhật cục bộ
      }
      
      // Cập nhật vai trò trong đối tượng user
      const updatedUser = {
        ...user,
        role: role,
        roles: user.roles 
          ? [...user.roles.filter(r => r !== 'PATIENT' && r !== 'DOCTOR' && r !== 'ADMIN'), role] 
          : [role]
      };
      
      // Cập nhật localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Cập nhật state
      setUser(updatedUser);
      
      console.log('User role updated locally:', role);
      console.log('Updated user object:', updatedUser);
      
      return { success: true };
    } catch (error) {
      console.error("Error updating user role:", error);
      // Cải thiện thông báo lỗi
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Có lỗi xảy ra khi cập nhật vai trò người dùng";
      
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };
>>>>>>> 1a644ab (1)

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await authAPI.register(userData)
<<<<<<< HEAD

      return { success: true, data: response.data }
=======
      
      // Thêm thông báo thành công và gợi ý đăng nhập
      return { 
        success: true, 
        data: response.data,
        message: "Đăng ký thành công! Vui lòng đăng nhập để tiếp tục."
      }
>>>>>>> 1a644ab (1)
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Đăng ký thất bại"
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      setLoading(true)
      setError(null)

      const response = await authAPI.forgotPassword(email)

      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error || "Không thể xử lý yêu cầu quên mật khẩu"
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true)
      setError(null)

      const response = await authAPI.resetPassword(token, newPassword)

      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Không thể đặt lại mật khẩu"
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
=======
  // Thêm xử lý token hết hạn
  const handleTokenExpiration = () => {
    // Xóa thông tin người dùng và token từ localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Cập nhật state
    setUser(null);
    setToken(null);
    setDoctorRequestStatus(null);
    
    // Hiển thị thông báo
    setError("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.");
    
    // Chuyển hướng đến trang đăng nhập
    navigate("/login", { state: { message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại." } });
  };

>>>>>>> 1a644ab (1)
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
<<<<<<< HEAD
=======
    setDoctorRequestStatus(null) // Reset trạng thái yêu cầu bác sĩ
    navigate("/login") // Chuyển hướng về trang login sau khi đăng xuất
>>>>>>> 1a644ab (1)
  }

  const hasRole = (role) => {
    if (!user) return false

<<<<<<< HEAD
    const userRoles = user.roles || user.role || []

    // Handle both array and string formats
=======
    // Xử lý khi role là chuỗi
    if (typeof user.role === 'string') {
      return user.role === role || user.role === `ROLE_${role}`
    }

    // Xử lý khi roles là mảng
    const userRoles = user.roles || []
>>>>>>> 1a644ab (1)
    if (Array.isArray(userRoles)) {
      return userRoles.includes(role) || userRoles.includes(`ROLE_${role}`)
    }

<<<<<<< HEAD
    return userRoles === role || userRoles === `ROLE_${role}`
  }

  // Check authentication
  const isAuthenticated = !!token && !!user

  const value = {
    user,
=======
    return false
  }

  // Check authentication - sử dụng useMemo để cải thiện hiệu suất và logging
  const isAuthenticated = useMemo(() => {
    const hasToken = !!token;
    const hasUser = !!user;
    console.log(`Auth state check: token=${hasToken}, user=${hasUser}, authenticated=${hasToken && hasUser}`);
    return hasToken && hasUser;
  }, [token, user]);

  // Kiểm tra xem người dùng là mới (chưa có vai trò) hay không
  const isNewUser = useMemo(() => {
    if (!user) return false;
    
    // Kiểm tra nếu không có role hoặc roles là mảng rỗng
    if (typeof user.role === 'undefined' || user.role === null) {
      if (!Array.isArray(user.roles) || user.roles.length === 0) {
        return true;
      }
    }
    
    return false;
  }, [user]);

  // Thêm hàm trợ giúp để cập nhật trạng thái yêu cầu bác sĩ sau khi gửi yêu cầu mới
  const updateDoctorRequestStatus = (newStatus) => {
    setDoctorRequestStatus(newStatus)
  }

  const value = {
    user,
    currentUser: user, // Thêm alias currentUser cho tương thích với Header.jsx
>>>>>>> 1a644ab (1)
    login,
    logout,
    loading,
    error,
    isAuthenticated,
    register,
    forgotPassword,
    resetPassword,
    hasRole,
    isAdmin: hasRole("ADMIN"),
    isDoctor: hasRole("DOCTOR"),
    isPatient: hasRole("PATIENT"),
<<<<<<< HEAD
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
=======
    // Thêm giá trị mới cho yêu cầu bác sĩ
    hasRequestedDoctor: !!doctorRequestStatus,
    doctorRequestStatus,
    updateDoctorRequestStatus, // Thêm hàm cập nhật trạng thái
    checkingDoctorRequest, // Trạng thái đang kiểm tra
    initialized, // Thêm trạng thái khởi tạo
    updateUserRole, // Thêm hàm cập nhật vai trò người dùng
    isNewUser, // Thêm kiểm tra người dùng mới
    handleTokenExpiration, // Thêm hàm xử lý token hết hạn
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
>>>>>>> 1a644ab (1)
