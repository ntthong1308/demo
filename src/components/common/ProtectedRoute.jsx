"use client"

import { useAuth } from "../../context/AuthContext"
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap"

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải thông tin người dùng...</p>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="warning" className="text-center p-4">
              <h5 className="mb-3">⚠️ Truy cập bị giới hạn</h5>
              <p>Vui lòng <strong>đăng nhập</strong> để truy cập trang này.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" className="text-center p-4">
              <h5 className="mb-3">🚫 Không có quyền truy cập</h5>
              <p>Tài khoản của bạn không đủ quyền để xem trang này.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }

  return children
}

export default ProtectedRoute
