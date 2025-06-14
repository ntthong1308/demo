import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHospital, FaHeartbeat, FaStethoscope, FaComments } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="hero-title">HỆ THỐNG BỆNH VIỆN CAO CẤP CHUẨN 5 SAO</h1>
              <p className="hero-subtitle">
                MediSched là địa chỉ uy tín về khám chữa bệnh, với đội ngũ chuyên gia - bác sĩ hàng đầu, trang thiết bị hiện đại, cùng các phác đồ điều trị hiệu quả, khoa học mang đến dịch vụ khám, điều trị, chăm sóc sức khỏe cao cấp, toàn diện với chi phí hợp lý.
              </p>
              <div className="d-flex gap-3">
                <Link to="/book-appointment">
                  <Button variant="light" size="lg">Đặt lịch khám ngay</Button>
                </Link>
                <Link to="/doctors">
                  <Button variant="outline-light" size="lg">Đội ngũ bác sĩ</Button>
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <img 
                  src="/placeholder-hospital.jpg" 
                  alt="Bệnh viện MediSched" 
                  className="img-fluid rounded shadow" 
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Giá trị khác biệt */}
      <section className="feature-section">
        <Container>
          <h2 className="section-title">GIÁ TRỊ KHÁC BIỆT CỦA MEDISCHED</h2>
          <div className="section-subtitle mb-5"></div>
          
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaUserMd />
                </div>
                <h3 className="feature-title">CHUYÊN GIA ĐẦU NGÀNH - BÁC SĨ GIỎI</h3>
                <p className="feature-text">
                  Đội ngũ chuyên gia đầu ngành, bác sĩ chuyên môn cao, giàu kinh nghiệm đến từ các bệnh viện lớn.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaHospital />
                </div>
                <h3 className="feature-title">TRANG THIẾT BỊ HIỆN ĐẠI</h3>
                <p className="feature-text">
                  Hệ thống trang thiết bị y tế hiện đại, nhập khẩu từ các nước tiên tiến trên thế giới.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaHeartbeat />
                </div>
                <h3 className="feature-title">HIỆU QUẢ ĐIỀU TRỊ CAO</h3>
                <p className="feature-text">
                  Áp dụng các phác đồ điều trị tiên tiến, hiện đại mang lại hiệu quả tối ưu cho người bệnh.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaStethoscope />
                </div>
                <h3 className="feature-title">QUY TRÌNH TOÀN DIỆN</h3>
                <p className="feature-text">
                  Quy trình khám chữa bệnh chuyên nghiệp, nhanh chóng, tiết kiệm thời gian cho bệnh nhân.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaComments />
                </div>
                <h3 className="feature-title">TƯ VẤN CHUYÊN SÂU</h3>
                <p className="feature-text">
                  Dịch vụ tư vấn y khoa chuyên sâu, giúp bệnh nhân hiểu rõ về tình trạng sức khỏe của mình.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaHospital />
                </div>
                <h3 className="feature-title">DỊCH VỤ CAO CẤP</h3>
                <p className="feature-text">
                  Cung cấp dịch vụ y tế cao cấp với chi phí hợp lý, phù hợp với nhu cầu đa dạng.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Thống kê */}
      <section className="stats-section">
        <Container>
          <h2 className="section-title">ĐỘI NGŨ Y BÁC SĨ CHUYÊN MÔN CAO</h2>
          <div className="section-subtitle">Quy tụ đội ngũ chuyên gia đầu ngành, bác sĩ chuyên môn cao, giàu kinh nghiệm</div>
          
          <Row className="mt-5">
            <Col lg={2} sm={4} xs={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">24</div>
                <div className="stat-label">GIÁO SƯ</div>
              </div>
            </Col>
            
            <Col lg={2} sm={4} xs={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">171</div>
                <div className="stat-label">TIẾN SĨ</div>
              </div>
            </Col>
            
            <Col lg={2} sm={4} xs={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">490</div>
                <div className="stat-label">THẠC SĨ</div>
              </div>
            </Col>
            
            <Col lg={2} sm={4} xs={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">786</div>
                <div className="stat-label">BÁC SĨ</div>
              </div>
            </Col>
            
            <Col lg={2} sm={4} xs={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">155</div>
                <div className="stat-label">KỸ THUẬT VIÊN</div>
              </div>
            </Col>
            
            <Col lg={2} sm={4} xs={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">803</div>
                <div className="stat-label">ĐIỀU DƯỠNG</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="feature-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h3>ĐẶT LỊCH KHÁM NGAY HÔM NAY</h3>
              <p className="lead mt-3 mb-4">
                Đặt lịch khám trực tuyến để được ưu tiên khám sớm và không phải chờ đợi
              </p>
              <Link to="/book-appointment">
                <Button variant="primary" size="lg">Đặt lịch khám ngay</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;