"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authAPI } from "../services/api"

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

  const navigate = useNavigate()

  useEffect(() => {
    // Check for stored user data on component mount
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


  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await authAPI.register(userData)

      return { success: true, data: response.data }
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

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  const hasRole = (role) => {
    if (!user) return false

    const userRoles = user.roles || user.role || []

    // Handle both array and string formats
    if (Array.isArray(userRoles)) {
      return userRoles.includes(role) || userRoles.includes(`ROLE_${role}`)
    }

    return userRoles === role || userRoles === `ROLE_${role}`
  }

  // Check authentication
  const isAuthenticated = !!token && !!user

  const value = {
    user,
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
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
