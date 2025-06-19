import axios from "axios"

// Fix the process.env issue by providing a fallback
const getApiUrl = () => {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // Try to get from window.env first (if set by build process)
    if (window.env && window.env.REACT_APP_API_URL) {
      return window.env.REACT_APP_API_URL
    }
    // Try to get from process.env (if available)
    if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL
    }
  }
  // Default fallback
  return "http://localhost:8080"
}

// Cấu hình axios
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // Reduced timeout for faster error detection
})


// Interceptor cho request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    console.log("API Request:", config.method?.toUpperCase(), config.url, config.baseURL)
    return config
  },
  (error) => {
    console.error("API Request Error:", error)
    return Promise.reject(error)
  },
)

// Interceptor cho response
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url)
    return response
  },
  (error) => {
    console.error("API Response Error:", error.response?.status, error.config?.url, error.message)

    if (error.response && error.response.status === 401) {
      // Xóa token và chuyển hướng đến trang đăng nhập khi token hết hạn
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Enhanced API functions with fallback
const createApiFunction = (apiCall) => {
  return async (...args) => {
    return await apiCall(...args)
  }
}

// ===== USER CONTROLLER APIs =====
export const authAPI = {
  // POST /user/register
  register: (userData) => api.post("/user/register", userData),

  // POST /user/login
  login: (credentials) => api.post("/user/login", credentials),

  // POST /user/forgot-password?email=
  forgotPassword: (email) => api.post("/user/forgot-password", null, { params: { email } }),
}

// ===== DOCTOR CONTROLLER APIs =====
export const doctorAPI = {
  // POST /doctor/request (multipart form data)
  submitRequest: (requestData) => {
    const formData = new FormData()
    formData.append("specialty", requestData.specialty)
    formData.append("departmentId", requestData.departmentId)
    formData.append("startTime", requestData.startTime)
    formData.append("endTime", requestData.endTime)
    formData.append("fee", requestData.fee)
    formData.append("description", requestData.description)
    formData.append("file", requestData.file)

    // Handle daysOfWeek array
    if (requestData.daysOfWeek && Array.isArray(requestData.daysOfWeek)) {
      requestData.daysOfWeek.forEach((day) => {
        formData.append("daysOfWeek", day)
      })
    }

    return api.post("/doctor/request", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // GET /doctor/get-all-requests
  getAllRequests: () => api.get("/doctor/get-all-requests"),

  // PUT /doctor/decide-request
  decideRequest: (decisionData) => api.put("/doctor/decide-request", decisionData),

  // PUT /doctor/update/{doctorId}
  updateDoctor: (doctorId, doctorData) => api.put(`/doctor/update/${doctorId}`, doctorData),

  // GET /doctor/search?name=&specialty=&page=
  search: createApiFunction((params) => api.get("/doctor/search", { params })),

  // GET /doctor/me
  getProfile: () => api.get("/doctor/me"),

  // GET /doctor/{id}
  getById: createApiFunction(
    (id) => api.get(`/doctor/${id}`),
    null, // Will be handled specially
  ),
}

// Special function for getting doctor by ID with mock fallback
export const getDoctorById = (id) => api.get(`/doctor/${id}`)

// ===== PATIENT CONTROLLER APIs =====
export const patientAPI = {
  // GET /patient/get-all
  getAll: () => api.get("/patient/get-all"),

  // PUT /patient/update/{patientId}
  update: (patientId, patientData) => api.put(`/patient/update/${patientId}`, patientData),

  // DELETE /patient/delete/{patientId}
  delete: (patientId) => api.delete(`/patient/delete/${patientId}`),

  // GET /patient/me
  getProfile: () => api.get("/patient/me"),
}

// ===== APPOINTMENT CONTROLLER APIs =====
export const appointmentAPI = {
  // GET /appointment/available-slots?doctorId=&date=
  getAvailableSlots: createApiFunction(
    (doctorId, date) =>
      api.get("/appointment/available-slots", {
        params: { doctorId, date },
      }),
  ),

  // POST /appointment/book
  book: (appointmentData) => api.post("/appointment/book", appointmentData),

  // PUT /appointment/update/{appointmentId}?status=
  update: (appointmentId, status) =>
    api.put(`/appointment/update/${appointmentId}`, null, {
      params: { status },
    }),

  // GET /appointment/getBy-doctor
  getByDoctor: () => api.get("/appointment/getBy-doctor"),

  // GET /appointment/me
  getMyAppointments: () => api.get("/appointment/me"),
}

// ===== REVIEW CONTROLLER APIs =====
export const reviewAPI = {
  // POST /review/evaluate
  create: (reviewData) => api.post("/review/evaluate", reviewData),

  // GET /review/get-all/{doctorId}
  getByDoctor: createApiFunction((doctorId) => api.get(`/review/get-all/${doctorId}`)),
}

// ===== DEPARTMENT CONTROLLER APIs =====
export const departmentAPI = {
  // POST /department/createDepartment?name=&description=
  create: (name, description) =>
    api.post("/department/createDepartment", null, {
      params: { name, description },
    }),

  // GET /department/get-all
  getAll: createApiFunction(() => api.get("/department/get-all")),
}

// ===== CHATBOT CONTROLLER APIs =====
export const chatBotAPI = {
  // POST /bot/chat?prompt=
  chat: (prompt) =>
    api.post("/bot/chat", null, {
      params: { prompt },
    }),
}

// Legacy exports for backward compatibility
export { doctorAPI as doctorService }
export { patientAPI as patientService }
export { appointmentAPI as appointmentService }
export { reviewAPI as reviewService }
export { departmentAPI as departmentService }

export default api
