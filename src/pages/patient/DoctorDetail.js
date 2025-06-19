"use client"

import { useState, useEffect, useRef } from "react"
import { Container, Row, Col, Card, Button, Badge, Tab, Tabs, Spinner, Alert } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { getDoctorById, reviewAPI } from "../../services/api"

function DoctorDetails() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Use ref to prevent duplicate API calls
  const hasFetched = useRef(false)
  const effectCleanedUp = useRef(false)

useEffect(() => {
  let isMounted = true;

  const loadDoctorData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Loading doctor with ID:", id);

      const doctorResponse = await getDoctorById(id);
      if (!isMounted) return;

      const doctorData = doctorResponse.data;
      console.log("Doctor data:", doctorData);

      const transformedDoctor = {
        id: doctorData.id,
        fullName: doctorData.fullName,
        specialty: doctorData.specialty || "Chưa xác định",
        department: doctorData.department,
        email: doctorData.email,
        imageUrl: doctorData.imageUrl,
        fee: doctorData.fee || 0,
        description: doctorData.description,
        role: doctorData.role || "Bác sĩ",
        experience: doctorData.experience || 5,
        rating: doctorData.rating || 4.5,
        hospital: doctorData.department?.name || doctorData.hospital || "Bệnh viện",
        address: doctorData.department?.address || doctorData.address || "Địa chỉ bệnh viện",
      };

      setDoctor(transformedDoctor);
      await loadReviews(id, isMounted);
    } catch (err) {
      console.error("Error loading doctor:", err);
      let errorMessage = "Không thể tải thông tin bác sĩ.";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "Không thể kết nối đến server. Backend có thể chưa được khởi động.";
      } else if (err.response?.status === 404) {
        errorMessage = "Không tìm thấy thông tin bác sĩ.";
      } else if (err.response?.status === 500) {
        errorMessage = "Lỗi server. Vui lòng thử lại sau.";
      }

      setError(errorMessage);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  loadDoctorData();

  return () => {
    isMounted = false;
  };
}, [id]);


  const loadReviews = async (doctorId, isMounted) => {
    try {
      if (!isMounted) return
      setReviewsLoading(true)
      console.log("Loading reviews for doctor:", doctorId)

      const reviewsResponse = await reviewAPI.getByDoctor(doctorId)

      if (!isMounted) return
      console.log("Reviews response:", reviewsResponse)

      setReviews(reviewsResponse.data || [])
    } catch (err) {
      if (!isMounted) return
      console.error("Error loading reviews:", err)
      // Don't show error for reviews, just log it
      setReviews([])
    } finally {
      if (isMounted) {
        setReviewsLoading(false)
      }
    }
  }

  // Generate mock available slots since backend might not have this
  const generateAvailableSlots = () => {
    const slots = []
    const today = new Date()

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Skip weekends for now
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        slots.push({
          date: date.toISOString().split("T")[0],
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
        })
      }
    }

    return slots
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-3">Đang tải thông tin bác sĩ...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Có lỗi xảy ra</Alert.Heading>
          <p>{error}</p>

          <hr />
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-danger"
              onClick={() => {
                hasFetched.current = false
                effectCleanedUp.current = false
                window.location.reload()
              }}
            >
              Thử lại
            </Button>
            <Link to="/doctors" className="btn btn-primary ms-2">
              Quay lại danh sách bác sĩ
            </Link>
          </div>
        </Alert>
      </Container>
    )
  }

  if (!doctor) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          <Alert.Heading>Không tìm thấy thông tin bác sĩ</Alert.Heading>
          <p>Không thể tìm thấy thông tin của bác sĩ với ID: {id}</p>
          <Link to="/doctors" className="btn btn-primary mt-3">
            Quay lại danh sách bác sĩ
          </Link>
        </Alert>
      </Container>
    )
  }

  const availableSlots = generateAvailableSlots()

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col lg={3} className="text-center mb-4 mb-lg-0">
              <img
                src={doctor.imageUrl || "/placeholder.svg?height=180&width=180"}
                alt={doctor.fullName}
                className="rounded-circle mb-3 shadow"
                style={{ width: "180px", height: "180px", objectFit: "cover", border: "4px solid #f8f9fa" }}
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=180&width=180"
                }}
              />
              <div className="d-flex justify-content-center align-items-center">
                <div className="bg-light p-1 px-2 rounded-pill d-inline-flex align-items-center">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  <span className="fw-bold">{doctor.rating}</span>
                  <small className="text-muted ms-1">/5.0</small>
                </div>
              </div>
            </Col>
            <Col lg={9}>
              <h2>{doctor.fullName}</h2>
              <div className="mb-3">
                <Badge bg="info" className="me-2">
                  {doctor.specialty}
                </Badge>
                <Badge bg="secondary" className="me-2">
                  {doctor.role}
                </Badge>
              </div>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <i className="bi bi-hospital me-2"></i> {doctor.hospital}
                  </p>
                  <p>
                    <i className="bi bi-geo-alt me-2"></i> {doctor.address}
                  </p>
                  <p>
                    <i className="bi bi-envelope me-2"></i> {doctor.email}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <i className="bi bi-calendar-check me-2"></i> {doctor.experience} năm kinh nghiệm
                  </p>
                  <p>
                    <i className="bi bi-cash me-2"></i>{" "}
                    <strong className="text-primary">{(doctor.fee || 0).toLocaleString("vi-VN")}đ / lần khám</strong>
                  </p>
                </Col>
              </Row>
              <Link to={`/book-appointment/${doctor.id}`} className="btn btn-lg btn-primary">
                <i className="bi bi-calendar2-plus me-2"></i> Đặt lịch khám
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Tabs defaultActiveKey="about" className="mb-4">
        <Tab eventKey="about" title="Thông tin bác sĩ">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Giới thiệu</h4>
              <p>{doctor.description || "Chưa có thông tin mô tả về bác sĩ."}</p>

              <h4 className="mb-3 mt-4">Thông tin chuyên môn</h4>
              <ul>
                <li>
                  <strong>Chuyên khoa:</strong> {doctor.specialty}
                </li>
                <li>
                  <strong>Vai trò:</strong> {doctor.role}
                </li>
                <li>
                  <strong>Khoa:</strong> {doctor.department?.name || "Chưa xác định"}
                </li>
                <li>
                  <strong>Kinh nghiệm:</strong> {doctor.experience} năm
                </li>
              </ul>

              {doctor.department && (
                <>
                  <h4 className="mb-3 mt-4">Thông tin khoa</h4>
                  <p>
                    <strong>Tên khoa:</strong> {doctor.department.name}
                  </p>
                  {doctor.department.description && (
                    <p>
                      <strong>Mô tả:</strong> {doctor.department.description}
                    </p>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="schedule" title="Lịch khám có sẵn">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Lịch khám có sẵn</h4>
              <Row>
                {availableSlots.map((day, index) => (
                  <Col md={4} key={index} className="mb-4">
                    <Card>
                      <Card.Header className="bg-light">
                        <strong>
                          {new Date(day.date).toLocaleDateString("vi-VN", {
                            weekday: "long",
                            day: "numeric",
                            month: "numeric",
                          })}
                        </strong>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-flex flex-wrap">
                          {day.slots.map((time, i) => (
                            <Button
                              key={i}
                              variant="outline-primary"
                              size="sm"
                              className="me-2 mb-2"
                              as={Link}
                              to={`/book-appointment/${doctor.id}?date=${day.date}&time=${time}`}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-3">
                <Link to={`/book-appointment/${doctor.id}`} className="btn btn-primary">
                  <i className="bi bi-calendar2-plus me-2"></i> Đặt lịch khám
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="reviews" title="Đánh giá">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Đánh giá từ bệnh nhân</h4>

              {reviewsLoading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" size="sm" />
                  <p className="mt-2">Đang tải đánh giá...</p>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <h5>{review.patientName || "Bệnh nhân"}</h5>
                        <div>
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                          ))}
                          {[...Array(5 - (review.rating || 5))].map((_, i) => (
                            <i key={i} className="bi bi-star text-muted me-1"></i>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted small">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString("vi-VN")
                          : "Ngày không xác định"}
                      </p>
                      <p>{review.comment || review.feedback || "Không có nhận xét"}</p>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-chat-square-text text-muted" style={{ fontSize: "3rem" }}></i>
                  <p className="mt-3 text-muted">Chưa có đánh giá nào cho bác sĩ này.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default DoctorDetails
