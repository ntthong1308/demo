"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ProgressBar } from "react-bootstrap"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { doctorAPI, appointmentAPI } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

function BookAppointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useAuth()
  const queryParams = new URLSearchParams(location.search)

  // Get date and time from query params if available
  const preSelectedDate = queryParams.get("date") || ""
  const preSelectedTime = queryParams.get("time") || ""

  // State variables
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [doctor, setDoctor] = useState(null)
  const [formData, setFormData] = useState({
    date: preSelectedDate,
    time: preSelectedTime,
    symptoms: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    useInsurance: false,
    insuranceProvider: "",
    insuranceNumber: "",
  })
  const [availableDates, setAvailableDates] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Update form data when user info is available
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim(),
        phone: currentUser.phoneNumber || currentUser.phone || "",
        email: currentUser.email || "",
      }))
    }
  }, [currentUser])

  // Fetch doctor data
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await doctorAPI.getById(id)
        const doctorData = response.data

        setDoctor(doctorData)

        // For now, create mock availability since backend might not have this
        // You can remove this when backend provides availability
        const mockAvailability = [
          { date: "2025-06-18", slots: ["8:00", "9:00", "10:00", "14:00"] },
          { date: "2025-06-19", slots: ["8:00", "9:00", "15:00", "16:00"] },
          { date: "2025-06-20", slots: ["10:00", "11:00", "14:00", "15:00"] },
        ]

        // Use backend availability if available, otherwise use mock
        const availability = doctorData.availability || doctorData.schedules || mockAvailability

        setAvailableDates(availability.map((slot) => slot.date))

        // If date is preselected, load time slots for that date
        if (preSelectedDate) {
          const slots = availability.find((s) => s.date === preSelectedDate)
          if (slots) {
            setTimeSlots(slots.slots || slots.timeSlots || [])
          }
        }
      } catch (err) {
        setError("Không thể tải thông tin bác sĩ. Vui lòng thử lại.")
        console.error("Error loading doctor:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadDoctor()
    }
  }, [id, preSelectedDate])

  // Format date functions
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  const formatShortDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const dayOfWeek = date.toLocaleDateString("vi-VN", { weekday: "short" })
    return { day, month, dayOfWeek }
  }

  const getRelativeDay = (dateString) => {
    if (!dateString) return ""

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const date = new Date(dateString)
    date.setHours(0, 0, 0, 0)

    if (date.getTime() === today.getTime()) return "Hôm nay"
    if (date.getTime() === tomorrow.getTime()) return "Ngày mai"

    return ""
  }

  // Handle date selection
  const handleDateSelect = (selectedDate) => {
    // Mock availability for now
    const mockAvailability = [
      { date: "2025-06-18", slots: ["8:00", "9:00", "10:00", "14:00"] },
      { date: "2025-06-19", slots: ["8:00", "9:00", "15:00", "16:00"] },
      { date: "2025-06-20", slots: ["10:00", "11:00", "14:00", "15:00"] },
    ]

    const availability = doctor?.availability || doctor?.schedules || mockAvailability
    const slots = availability.find((s) => s.date === selectedDate)

    setFormData({
      ...formData,
      date: selectedDate,
      time: "", // Reset time when date changes
    })

    setTimeSlots(slots ? slots.slots || slots.timeSlots || [] : [])
  }

  // Handle time selection
  const handleTimeSelect = (selectedTime) => {
    setFormData({
      ...formData,
      time: selectedTime,
    })
  }

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Navigation functions
  const goToNextStep = () => {
    const isValid = validateCurrentStep()
    if (isValid) {
      window.scrollTo(0, 0)
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  // Validate current step
  const validateCurrentStep = () => {
    setError(null)

    if (currentStep === 1) {
      if (!formData.date) {
        setError("Vui lòng chọn ngày khám")
        return false
      }
      if (!formData.time) {
        setError("Vui lòng chọn giờ khám")
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.symptoms || formData.symptoms.trim().length < 5) {
        setError("Vui lòng mô tả triệu chứng hoặc lý do khám (tối thiểu 5 ký tự)")
        return false
      }

      if (formData.email && !formData.email.includes("@")) {
        setError("Địa chỉ email không hợp lệ")
        return false
      }

      if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
        setError("Số điện thoại không hợp lệ")
        return false
      }
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateCurrentStep()) {
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      // Prepare appointment data to match backend DTO
      const appointmentData = {
        doctorId: Number.parseInt(id),
        patientId: currentUser?.id,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        symptoms: formData.symptoms,
        notes: formData.notes,
        // Additional fields that might be expected by backend
        patientName: formData.name,
        patientPhone: formData.phone,
        patientEmail: formData.email,
        status: "PENDING", // Default status
      }

      const response = await appointmentAPI.book(appointmentData)

      console.log("Appointment booked successfully:", response.data)
      setSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        navigate("/patient/appointments")
      }, 3000)
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error || "Không thể đặt lịch khám. Vui lòng thử lại."
      setError(errorMessage)
      console.error("Error booking appointment:", err)
    } finally {
      setSubmitting(false)
    }
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    return (currentStep / 3) * 100
  }

  // Render success message
  if (success) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="border-0 shadow success-card">
              <Card.Body className="text-center p-5">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
                </div>
                <h2 className="mb-3">Đặt lịch thành công!</h2>
                <p className="lead mb-4">
                  Bạn đã đặt lịch khám thành công với {doctor?.title} {doctor?.firstName} {doctor?.lastName}.
                </p>

                <Card className="bg-light border-0 mb-4">
                  <Card.Body>
                    <Row>
                      <Col md={6} className="border-end">
                        <p className="text-muted mb-1">Ngày khám</p>
                        <h5>{formatDate(formData.date)}</h5>
                      </Col>
                      <Col md={6}>
                        <p className="text-muted mb-1">Giờ khám</p>
                        <h5>{formData.time}</h5>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <p className="mb-4">
                  Thông tin chi tiết đã được gửi đến email của bạn. Bạn sẽ được chuyển đến trang quản lý lịch hẹn...
                </p>

                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang chuyển hướng...</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  // Render loading state
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="loading-container">
          <Spinner animation="border" role="status" variant="primary" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
          <p className="mt-3 lead">Đang tải thông tin bác sĩ...</p>
        </div>
      </Container>
    )
  }

  // Render error state if doctor not found
  if (!doctor) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <Alert.Heading>Không tìm thấy thông tin bác sĩ</Alert.Heading>
          <p>Không thể tìm thấy thông tin của bác sĩ với ID: {id}</p>
          <Button variant="primary" onClick={() => navigate("/doctors")}>
            Quay lại danh sách bác sĩ
          </Button>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-2">Đặt lịch khám bệnh</h2>
      <p className="text-center text-muted mb-4">Vui lòng hoàn thành các bước sau để đặt lịch khám bệnh với bác sĩ</p>

      {/* Progress bar */}
      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <div className="booking-progress">
            <ProgressBar now={calculateProgress()} className="mb-3" />
            <div className="d-flex justify-content-between progress-steps">
              <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
                <span className="step-number">1</span>
                <span className="step-label d-none d-md-inline">Chọn thời gian</span>
              </div>
              <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
                <span className="step-number">2</span>
                <span className="step-label d-none d-md-inline">Thông tin khám bệnh</span>
              </div>
              <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
                <span className="step-number">3</span>
                <span className="step-label d-none d-md-inline">Xác nhận</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          {/* Doctor info card */}
          <Card className="shadow-sm mb-4 border-0">
            <Card.Body>
              <Row>
                <Col md={3} className="text-center">
                  <div className="doctor-avatar">
                    <img
                      src={doctor.profilePicture || "/placeholder.svg?height=100&width=100"}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                      className="rounded-circle"
                      style={{ width: "100px", height: "100px", objectFit: "cover", border: "2px solid #eee" }}
                    />
                  </div>
                </Col>
                <Col md={9}>
                  <h4>
                    {doctor.title} {doctor.firstName} {doctor.lastName}
                  </h4>
                  <div className="doctor-info">
                    {doctor.specialties?.map((specialty, index) => (
                      <span key={index} className="badge bg-primary me-2">
                        {specialty.name || specialty}
                      </span>
                    )) || <span className="badge bg-primary me-2">Chuyên khoa</span>}
                    <span className="badge bg-secondary me-2">{doctor.experience || 0} năm kinh nghiệm</span>
                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-star-fill me-1"></i>
                      {doctor.rating || "N/A"}/5
                    </span>
                  </div>
                  <p className="mt-2 mb-1">
                    <i className="bi bi-hospital me-2"></i>
                    {doctor.hospital || "Bệnh viện"}
                  </p>
                  <p className="doctor-price">
                    <i className="bi bi-cash me-2"></i>
                    <strong>{(doctor.consultationFee || 0).toLocaleString("vi-VN")}đ / lần khám</strong>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Error alert */}
          {error && (
            <Alert variant="danger" className="mb-4">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}

          {/* Main booking form card */}
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                {/* STEP 1: Choose date and time */}
                {currentStep === 1 && (
                  <div className="step-content">
                    <h4 className="mb-4">
                      <i className="bi bi-calendar-check me-2"></i>
                      Chọn ngày và giờ khám
                    </h4>

                    {/* Date selection */}
                    <div className="mb-4">
                      <label className="form-label">
                        Chọn ngày khám <span className="text-danger">*</span>
                      </label>
                      <div className="date-cards">
                        <Row>
                          {availableDates.map((date, index) => {
                            const { day, month, dayOfWeek } = formatShortDate(date)
                            const relativeDay = getRelativeDay(date)
                            return (
                              <Col key={index} xs={6} md={4} className="mb-3">
                                <Card
                                  className={`date-card ${formData.date === date ? "selected" : ""}`}
                                  onClick={() => handleDateSelect(date)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Card.Body className="p-2 text-center">
                                    <p className="small mb-0">{dayOfWeek}</p>
                                    <h4 className="mb-0">{day}</h4>
                                    <p className="small mb-0">Tháng {month}</p>
                                    {relativeDay && <span className="badge bg-success mt-1">{relativeDay}</span>}
                                  </Card.Body>
                                </Card>
                              </Col>
                            )
                          })}
                        </Row>
                      </div>
                    </div>

                    {/* Time selection */}
                    <div className="mb-4">
                      <label className="form-label">
                        {formData.date ? "Chọn giờ khám" : "Vui lòng chọn ngày khám trước"}
                        {formData.date && <span className="text-danger">*</span>}
                      </label>

                      {formData.date && (
                        <div className="time-slots">
                          {timeSlots.length > 0 ? (
                            <Row>
                              {timeSlots.map((time, index) => (
                                <Col key={index} xs={4} sm={3} md={2} className="mb-2">
                                  <div
                                    className={`time-slot-card ${formData.time === time ? "selected" : ""}`}
                                    onClick={() => handleTimeSelect(time)}
                                    style={{
                                      cursor: "pointer",
                                      padding: "10px",
                                      border: "1px solid #ddd",
                                      borderRadius: "5px",
                                      textAlign: "center",
                                      backgroundColor: formData.time === time ? "#007bff" : "#fff",
                                      color: formData.time === time ? "#fff" : "#000",
                                    }}
                                  >
                                    <span>{time}</span>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          ) : (
                            <Alert variant="warning">
                              <i className="bi bi-exclamation-circle me-2"></i>
                              Không có lịch trống vào ngày này. Vui lòng chọn ngày khác.
                            </Alert>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selected date and time summary */}
                    {formData.date && formData.time && (
                      <Card className="bg-light border-0 mb-4">
                        <Card.Body>
                          <h6>Thời gian khám đã chọn:</h6>
                          <p className="mb-0">
                            <i className="bi bi-calendar-event me-2"></i>
                            <strong>{formatDate(formData.date)}</strong> lúc <strong>{formData.time}</strong>
                          </p>
                        </Card.Body>
                      </Card>
                    )}

                    {/* Navigation buttons */}
                    <div className="d-flex justify-content-between mt-4">
                      <Button variant="outline-secondary" onClick={() => navigate("/doctors/" + id)}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Quay lại
                      </Button>
                      <Button variant="primary" onClick={goToNextStep} disabled={!formData.date || !formData.time}>
                        Tiếp tục
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Enter appointment and personal info */}
                {currentStep === 2 && (
                  <div className="step-content">
                    <h4 className="mb-4">
                      <i className="bi bi-file-medical me-2"></i>
                      Thông tin khám bệnh
                    </h4>

                    <Form.Group className="mb-4">
                      <Form.Label>
                        Triệu chứng / Lý do khám <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="symptoms"
                        placeholder="Mô tả triệu chứng hoặc lý do khám của bạn"
                        value={formData.symptoms}
                        onChange={handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Vui lòng mô tả chi tiết các triệu chứng để bác sĩ có thể chuẩn bị tốt nhất cho buổi khám
                      </Form.Text>
                    </Form.Group>

                    <h5 className="mb-3">Thông tin liên hệ</h5>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Họ và tên</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập họ và tên"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Số điện thoại</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-phone"></i>
                            </span>
                            <Form.Control
                              type="tel"
                              name="phone"
                              placeholder="Nhập số điện thoại"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-envelope"></i>
                        </span>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Nhập email của bạn"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <Form.Text className="text-muted">Thông tin đặt lịch sẽ được gửi đến email này</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Ghi chú bổ sung</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="notes"
                        placeholder="Nhập các ghi chú bổ sung (nếu có)"
                        value={formData.notes}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {/* Navigation buttons */}
                    <div className="d-flex justify-content-between mt-4">
                      <Button variant="outline-secondary" onClick={goToPreviousStep}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Quay lại
                      </Button>
                      <Button variant="primary" onClick={goToNextStep}>
                        Tiếp tục
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="step-content">
                    <h4 className="mb-4">
                      <i className="bi bi-check-circle me-2"></i>
                      Xác nhận thông tin đặt lịch
                    </h4>

                    <Card className="border-0 bg-light mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Thông tin khám bệnh</h5>
                          <Button variant="link" className="p-0 text-decoration-none" onClick={() => setCurrentStep(1)}>
                            <i className="bi bi-pencil me-1"></i> Chỉnh sửa
                          </Button>
                        </div>

                        <Row className="mb-3">
                          <Col md={6}>
                            <p className="mb-1 text-muted">Ngày khám</p>
                            <p className="fw-bold">{formatDate(formData.date)}</p>
                          </Col>
                          <Col md={6}>
                            <p className="mb-1 text-muted">Giờ khám</p>
                            <p className="fw-bold">{formData.time}</p>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <p className="mb-1 text-muted">Bác sĩ</p>
                            <p className="fw-bold">
                              {doctor.title} {doctor.firstName} {doctor.lastName}
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>

                    <Card className="border-0 bg-light mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Lý do khám bệnh</h5>
                          <Button variant="link" className="p-0 text-decoration-none" onClick={() => setCurrentStep(2)}>
                            <i className="bi bi-pencil me-1"></i> Chỉnh sửa
                          </Button>
                        </div>

                        <p>{formData.symptoms}</p>

                        {formData.notes && (
                          <div className="mt-3">
                            <h6>Ghi chú bổ sung:</h6>
                            <p>{formData.notes}</p>
                          </div>
                        )}
                      </Card.Body>
                    </Card>

                    <Card className="border-0 bg-light mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Thông tin liên hệ</h5>
                          <Button variant="link" className="p-0 text-decoration-none" onClick={() => setCurrentStep(2)}>
                            <i className="bi bi-pencil me-1"></i> Chỉnh sửa
                          </Button>
                        </div>

                        <p className="mb-1">
                          <strong>Họ tên:</strong> {formData.name || "Chưa cung cấp"}
                        </p>
                        <p className="mb-1">
                          <strong>Số điện thoại:</strong> {formData.phone || "Chưa cung cấp"}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email || "Chưa cung cấp"}
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="border-0 bg-light mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Chi phí</h5>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-1">Phí khám</p>
                          <p className="mb-1">{(doctor.consultationFee || 0).toLocaleString("vi-VN")}đ</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <p className="fw-bold mb-0">Tổng cộng</p>
                          <p className="fw-bold mb-0">{(doctor.consultationFee || 0).toLocaleString("vi-VN")}đ</p>
                        </div>
                      </Card.Body>
                    </Card>

                    <Alert variant="info">
                      <i className="bi bi-info-circle me-2"></i>
                      Bạn có thể hủy lịch hẹn miễn phí trước 24 giờ. Sau thời gian này, sẽ áp dụng phí hủy.
                    </Alert>

                    {/* Navigation buttons */}
                    <div className="d-flex justify-content-between mt-4">
                      <Button variant="outline-secondary" onClick={goToPreviousStep}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Quay lại
                      </Button>
                      <Button variant="success" type="submit" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Đang xử lý...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-calendar2-check me-2"></i> Xác nhận đặt lịch
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BookAppointment
