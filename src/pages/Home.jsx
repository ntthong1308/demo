import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section bg-white text-dark py-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Đặt lịch khám bệnh dễ dàng với MediSched</h1>
              <p className="lead mb-4">
                Hệ thống đặt lịch khám bệnh trực tuyến hiện đại, kết nối bạn với các bác sĩ chuyên khoa hàng đầu.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/doctors" size="lg" variant="primary">
                  Tìm bác sĩ
                </Button>
                <Button as={Link} to="/register" size="lg" variant="outline-light">
                  Đăng ký ngay
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
                alt="Medical consultation"
                className="img-fluid rounded shadow"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=400&width=600"
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold">Tại sao chọn MediSched?</h2>
              <p className="lead text-muted">Chúng tôi mang đến trải nghiệm đặt lịch khám bệnh tốt nhất</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="bi bi-calendar-check fs-2"></i>
                </div>
                <h4>Đặt lịch dễ dàng</h4>
                <p className="text-muted">Đặt lịch khám bệnh chỉ với vài cú click, tiết kiệm thời gian và công sức.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div
                  className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="bi bi-people fs-2"></i>
                </div>
                <h4>Bác sĩ chuyên khoa</h4>
                <p className="text-muted">Đội ngũ bác sĩ giàu kinh nghiệm, chuyên khoa đa dạng phục vụ mọi nhu cầu.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div
                  className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="bi bi-shield-check fs-2"></i>
                </div>
                <h4>An toàn & Bảo mật</h4>
                <p className="text-muted">Thông tin cá nhân được bảo mật tuyệt đối theo tiêu chuẩn quốc tế.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="mb-4">Bắt đầu chăm sóc sức khỏe của bạn ngay hôm nay</h2>
              <Button as={Link} to="/register" size="lg" variant="primary">
                Đăng ký miễn phí
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home
