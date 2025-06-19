import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const Services = () => {
  const medicalServices = [
    {
      name: 'Khám tổng quát',
      description: 'Dịch vụ khám sức khỏe tổng quát định kỳ, phát hiện sớm các nguy cơ bệnh lý.',
      image: 'https://images.pexels.com/photos/4266945/pexels-photo-4266945.jpeg',
      features: ['Tư vấn chuyên sâu', 'Xét nghiệm máu', 'Đo huyết áp', 'Đánh giá chức năng tim, phổi'],
      category: 'Khám sức khỏe'
    },
    {
      name: 'Khám chuyên khoa',
      description: 'Khám và điều trị các bệnh lý chuyên khoa như tim mạch, nội tiết, tiêu hóa, da liễu...',
      image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg',
      features: ['Đội ngũ bác sĩ chuyên khoa', 'Thiết bị hiện đại', 'Theo dõi và điều trị liên tục'],
      category: 'Chuyên khoa'
    },
    {
      name: 'Khám tại nhà',
      description: 'Dịch vụ khám bệnh tại nhà, phù hợp cho người già, người bệnh hạn chế di chuyển.',
      image: 'https://images.pexels.com/photos/3845125/pexels-photo-3845125.jpeg',
      features: ['Bác sĩ đến tận nơi', 'Trang bị đầy đủ thiết bị', 'Kết quả nhanh chóng'],
      category: 'Chăm sóc tại nhà'
    },
    {
      name: 'Khám sức khỏe doanh nghiệp',
      description: 'Khám sức khỏe định kỳ cho nhân viên theo yêu cầu doanh nghiệp và tiêu chuẩn y tế.',
      image: 'https://images.pexels.com/photos/8376292/pexels-photo-8376292.jpeg',
      features: ['Báo cáo sức khỏe chi tiết', 'Linh hoạt thời gian', 'Chăm sóc sau khám'],
      category: 'Doanh nghiệp'
    },
    {
      name: 'Tư vấn từ xa',
      description: 'Dịch vụ tư vấn sức khỏe từ xa qua video, hỗ trợ nhanh chóng và tiện lợi.',
      image: 'https://images.pexels.com/photos/8867488/pexels-photo-8867488.jpeg',
      features: ['Tư vấn 24/7', 'Kết nối video', 'Bác sĩ tận tâm'],
      category: 'Tư vấn online'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="hero-title">DỊCH VỤ Y TẾ CHUYÊN NGHIỆP</h1>
              <p className="hero-subtitle">
                MediSched mang đến dịch vụ y tế đa dạng, hiện đại và chất lượng, phục vụ mọi nhu cầu chăm sóc sức khỏe.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Service List */}
      <section className="feature-section py-5">
        <Container>
          <h2 className="section-title mb-4">Danh sách dịch vụ</h2>
          <Row>
            {medicalServices.map((service, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={service.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Badge bg="success" className="mb-2">{service.category}</Badge>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {service.description}
                    </Card.Text>
                    <div>
                      <h6 className="mb-2">Tính năng:</h6>
                      <ul className="list-unstyled">
                        {service.features.map((feature, i) => (
                          <li key={i} className="mb-1">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h2>BẠN CẦN HỖ TRỢ VỀ DỊCH VỤ Y TẾ?</h2>
              <p className="lead mt-3 mb-4">
                Liên hệ ngay với chúng tôi để được tư vấn và hỗ trợ tốt nhất về các dịch vụ y tế phù hợp với bạn.
              </p>
              <a href="/contact" className="btn btn-light btn-lg">
                Liên hệ với chúng tôi
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Services;
