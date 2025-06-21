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
<<<<<<< HEAD
=======
  
  // PUT /user/reset-password
  resetPassword: (token, newPassword) => api.put("/user/reset-password", { token, newPassword }),
  
  // PUT /user/set-role - Cập nhật vai trò người dùng
  setRole: (role) => api.put("/user/set-role", { role }),
  
  // GET /user/me - Lấy thông tin user hiện tại
  getProfile: () => api.get("/user/me"),
>>>>>>> 1a644ab (1)
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

<<<<<<< HEAD
  // GET /doctor/get-all-requests
  getAllRequests: () => api.get("/doctor/get-all-requests"),

  // PUT /doctor/decide-request
  decideRequest: (decisionData) => api.put("/doctor/decide-request", decisionData),
=======
  // API cho đăng ký làm bác sĩ (không yêu cầu file)
  requestDoctorRole: (doctorData) => api.post("/doctor/request", doctorData),
  
  // API đơn giản hóa để gửi yêu cầu làm bác sĩ (hỗ trợ form đăng ký đơn giản)
  submitDoctorRequest: (doctorData) => api.post("/doctor/request", doctorData),

  // API để kiểm tra trạng thái yêu cầu làm bác sĩ của người dùng hiện tại
  getMyRequestStatus: () => api.get("/doctor/request/status"),

  // GET /doctor/get-all-requests - Admin: Lấy tất cả yêu cầu đăng ký làm bác sĩ
  getAllRequests: () => api.get("/doctor/get-all-requests"),
  
  // API alias để tương thích với code
  getAllDoctorRequests: () => api.get("/doctor/get-all-requests"),

  // PUT /doctor/decide-request - Admin: Duyệt hoặc từ chối yêu cầu bác sĩ
  decideRequest: (id, status, reason = "") => {
    const decisionData = {
      id,
      status, // "APPROVED" hoặc "REJECTED"
      reason: status === "REJECTED" ? reason : undefined
    }
    return api.put("/doctor/decide-request", decisionData)
  },
  
  // API helper để phê duyệt yêu cầu bác sĩ (dùng decideRequest bên trong)
  approveDoctorRequest: (requestId) => {
    return api.put("/doctor/decide-request", {
      id: requestId,
      status: "APPROVED"
    })
  },
  
  // API helper để từ chối yêu cầu bác sĩ (dùng decideRequest bên trong)
  rejectDoctorRequest: (requestId, data) => {
    return api.put("/doctor/decide-request", {
      id: requestId,
      status: "REJECTED",
      reason: data.rejectionReason
    })
  },

  // GET /doctor/get-all - Admin: Lấy danh sách tất cả bác sĩ
  getAllDoctors: () => api.get("/doctor/get-all"),
>>>>>>> 1a644ab (1)

  // PUT /doctor/update/{doctorId}
  updateDoctor: (doctorId, doctorData) => api.put(`/doctor/update/${doctorId}`, doctorData),

  // GET /doctor/search?name=&specialty=&page=
  search: createApiFunction((params) => api.get("/doctor/search", { params })),

  // GET /doctor/me
  getProfile: () => api.get("/doctor/me"),

  // GET /doctor/{id}
<<<<<<< HEAD
  getById: createApiFunction(
    (id) => api.get(`/doctor/${id}`),
    null, // Will be handled specially
  ),
}

// Special function for getting doctor by ID with mock fallback
=======
  getById: (id) => api.get(`/doctor/${id}`),
  
  // GET /doctor/stats - Admin: Thống kê bác sĩ
  getStats: () => api.get("/doctor/stats"),
}

// Special function for getting doctor by ID with mock fallback - Thêm lại để tương thích
>>>>>>> 1a644ab (1)
export const getDoctorById = (id) => api.get(`/doctor/${id}`)

// ===== PATIENT CONTROLLER APIs =====
export const patientAPI = {
<<<<<<< HEAD
  // GET /patient/get-all
  getAll: () => api.get("/patient/get-all"),

  // PUT /patient/update/{patientId}
  update: (patientId, patientData) => api.put(`/patient/update/${patientId}`, patientData),

  // DELETE /patient/delete/{patientId}
  delete: (patientId) => api.delete(`/patient/delete/${patientId}`),

  // GET /patient/me
  getProfile: () => api.get("/patient/me"),
=======
  // GET /patient/get-all - Admin: Lấy tất cả bệnh nhân
  getAll: () => api.get("/patient/get-all"),

  // GET /patient/{id} - Admin: Lấy thông tin chi tiết bệnh nhân
  getById: (id) => api.get(`/patient/${id}`),

  // PUT /patient/update/{patientId} - Admin: Cập nhật thông tin bệnh nhân
  update: (patientId, patientData) => api.put(`/patient/update/${patientId}`, patientData),

  // DELETE /patient/delete/{patientId} - Admin: Xóa bệnh nhân
  delete: (patientId) => api.delete(`/patient/delete/${patientId}`),

  // GET /patient/me - Patient: Lấy thông tin cá nhân
  getProfile: () => api.get("/patient/me"),
  
  // GET /patient/stats - Admin: Thống kê bệnh nhân
  getStats: () => api.get("/patient/stats"),
>>>>>>> 1a644ab (1)
}

// ===== APPOINTMENT CONTROLLER APIs =====
export const appointmentAPI = {
<<<<<<< HEAD
  // GET /appointment/available-slots?doctorId=&date=
  getAvailableSlots: createApiFunction(
    (doctorId, date) =>
      api.get("/appointment/available-slots", {
        params: { doctorId, date },
      }),
  ),
=======
  // GET /appointment/get-all - Admin: Lấy tất cả lịch hẹn
  getAll: () => api.get("/appointment/get-all"),

  // GET /appointment/available-slots?doctorId=&date=
  getAvailableSlots: (doctorId, date) => 
    api.get("/appointment/available-slots", {
      params: { doctorId, date },
    }),
>>>>>>> 1a644ab (1)

  // POST /appointment/book
  book: (appointmentData) => api.post("/appointment/book", appointmentData),

  // PUT /appointment/update/{appointmentId}?status=
<<<<<<< HEAD
  update: (appointmentId, status) =>
=======
  updateStatus: (appointmentId, status) =>
>>>>>>> 1a644ab (1)
    api.put(`/appointment/update/${appointmentId}`, null, {
      params: { status },
    }),

<<<<<<< HEAD
=======
  // PUT /appointment/update-schedule/{appointmentId} - Admin: Cập nhật lịch khám
  updateSchedule: (appointmentId, scheduleData) =>
    api.put(`/appointment/update-schedule/${appointmentId}`, scheduleData),

>>>>>>> 1a644ab (1)
  // GET /appointment/getBy-doctor
  getByDoctor: () => api.get("/appointment/getBy-doctor"),

  // GET /appointment/me
  getMyAppointments: () => api.get("/appointment/me"),
<<<<<<< HEAD
=======
  
  // GET /appointment/stats - Admin: Thống kê cuộc hẹn
  getStats: () => api.get("/appointment/stats"),
>>>>>>> 1a644ab (1)
}

// ===== REVIEW CONTROLLER APIs =====
export const reviewAPI = {
  // POST /review/evaluate
  create: (reviewData) => api.post("/review/evaluate", reviewData),

  // GET /review/get-all/{doctorId}
<<<<<<< HEAD
  getByDoctor: createApiFunction((doctorId) => api.get(`/review/get-all/${doctorId}`)),
=======
  getByDoctor: (doctorId) => api.get(`/review/get-all/${doctorId}`),
  
  // GET /review/get-all - Admin: Lấy tất cả đánh giá
  getAll: () => api.get('/review/get-all'),
>>>>>>> 1a644ab (1)
}

// ===== DEPARTMENT CONTROLLER APIs =====
export const departmentAPI = {
<<<<<<< HEAD
  // POST /department/createDepartment?name=&description=
  create: (name, description) =>
    api.post("/department/createDepartment", null, {
      params: { name, description },
    }),

  // GET /department/get-all
  getAll: createApiFunction(() => api.get("/department/get-all")),
=======
  // GET /department/get-all - Lấy tất cả phòng ban
  getAll: () => api.get("/department/get-all"),
  
  // POST /department/create - Admin: Tạo phòng ban mới
  create: (departmentData) => api.post("/department/create", departmentData),
  
  // PUT /department/update/{id} - Admin: Cập nhật phòng ban
  update: (id, departmentData) => api.put(`/department/update/${id}`, departmentData),
  
  // DELETE /department/delete/{id} - Admin: Xóa phòng ban
  delete: (id) => api.delete(`/department/delete/${id}`),
  
  // POST /department/createDepartment?name=&description= (Legacy endpoint)
  createLegacy: (name, description) =>
    api.post("/department/createDepartment", null, {
      params: { name, description },
    }),
>>>>>>> 1a644ab (1)
}

// ===== CHATBOT CONTROLLER APIs =====
export const chatBotAPI = {
  // POST /bot/chat?prompt=
  chat: (prompt) =>
    api.post("/bot/chat", null, {
      params: { prompt },
    }),
}

<<<<<<< HEAD
=======
// ===== ADMIN DASHBOARD APIs =====
export const dashboardAPI = {
  // GET /admin/dashboard/stats - Admin: Lấy thống kê tổng quan
  getStats: () => api.get("/admin/dashboard/stats"),
  
  // GET /admin/dashboard/recent-appointments - Admin: Lấy danh sách cuộc hẹn gần đây
  getRecentAppointments: () => api.get("/admin/dashboard/recent-appointments"),
}

>>>>>>> 1a644ab (1)
// Legacy exports for backward compatibility
export { doctorAPI as doctorService }
export { patientAPI as patientService }
export { appointmentAPI as appointmentService }
export { reviewAPI as reviewService }
export { departmentAPI as departmentService }
<<<<<<< HEAD

export default api
=======
export { dashboardAPI as dashboardService }

export default api
>>>>>>> 1a644ab (1)
