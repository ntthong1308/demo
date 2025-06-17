import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const Equipment = () => {
  const equipmentCategories = [
    {
      id: 1,
      name: 'Thiết bị chẩn đoán hình ảnh',
      description: 'Hệ thống máy móc hiện đại phục vụ chẩn đoán hình ảnh',
      items: [
        {
          name: 'Máy MRI 3.0 Tesla',
          description: 'Máy cộng hưởng từ thế hệ mới, cho hình ảnh siêu nét, chẩn đoán chính xác các bệnh lý não bộ, cột sống, khớp',
          image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg',
          features: ['Độ phân giải cao', 'Thời gian chụp nhanh', 'Ít tiếng ồn'],
          origin: 'Đức'
        },
        {
          name: 'Máy CT Scanner 128 lát cắt',
          description: 'Máy chụp cắt lớp vi tính 128 lát cắt, chẩn đoán nhanh chóng và chính xác',
          image: 'https://images.pexels.com/photos/7089334/pexels-photo-7089334.jpeg',
          features: ['128 lát cắt', 'Liều bức xạ thấp', 'Tốc độ cao'],
          origin: 'Nhật Bản'
        },
        {
          name: 'Máy siêu âm 4D',
          description: 'Hệ thống siêu âm 4D hiện đại, hình ảnh rõ nét, theo dõi thai nhi chi tiết',
          image: 'https://images.pexels.com/photos/7089678/pexels-photo-7089678.jpeg',
          features: ['Hình ảnh 4D', 'Doppler màu', 'Đầu dò đa tần số'],
          origin: 'Hàn Quốc'
        }
      ]
    },
    {
      id: 2,
      name: 'Thiết bị xét nghiệm',
      description: 'Hệ thống xét nghiệm tự động hiện đại',
      items: [
        {
          name: 'Máy xét nghiệm sinh hóa tự động',
          description: 'Hệ thống xét nghiệm sinh hóa tự động, kết quả nhanh và chính xác',
          image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg',
          features: ['Tự động hoàn toàn', 'Kết quả nhanh', 'Độ chính xác cao'],
          origin: 'Mỹ'
        },
        {
          name: 'Máy xét nghiệm huyết học',
          description: 'Phân tích tế bào máu tự động, đếm và phân loại tế bào máu',
          image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg',
          features: ['Phân tích 5 phần', 'Tốc độ cao', 'Báo cáo chi tiết'],
          origin: 'Đức'
        }
      ]
    },
    {
      id: 3,
      name: 'Thiết bị phẫu thuật',
      description: 'Trang thiết bị phẫu thuật hiện đại và an toàn',
      items: [
        {
          name: 'Hệ thống phẫu thuật nội soi',
          description: 'Hệ thống phẫu thuật nội soi hiện đại, ít xâm lấn, hồi phục nhanh',
          image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
          features: ['HD 4K', 'Robot hỗ trợ', 'Ít xâm lấn'],
          origin: 'Mỹ'
        },
        {
          name: 'Máy gây mê hiện đại',
          description: 'Hệ thống gây mê và hồi sức hiện đại, an toàn tuyệt đối',
          image: 'https://images.pexels.com/photos/4021773/pexels-photo-4021773.jpeg',
          features: ['Giám sát liên tục', 'An toàn cao', 'Hồi phục nhanh'],
          origin: 'Đức'
        }
      ]
    },
    {
      id: 4,
      name: 'Thiết bị tim mạch',
      description: 'Chuyên khoa tim mạch với thiết bị tiên tiến',
      items: [
        {
          name: 'Máy siêu âm tim 3D',
          description: 'Siêu âm tim 3D, đánh giá chức năng tim chi tiết và chính xác',
          image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg',
          features: ['Hình ảnh 3D', 'Doppler màu', 'Phân tích chức năng'],
          origin: 'Hàn Quốc'
        },
        {
          name: 'Máy điện tim 12 chuyển đạo',
          description: 'Hệ thống điện tim hiện đại, chẩn đoán rối loạn nhịp tim',
          image: 'https://images.pexels.com/photos/4021774/pexels-photo-4021774.jpeg',
          features: ['12 chuyển đạo', 'Phân tích tự động', 'Lưu trữ số'],
          origin: 'Nhật Bản'
        }
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="hero-title">TRANG THIẾT BỊ Y TẾ HIỆN ĐẠI</h1>
              <p className="hero-subtitle">
                MediSched đầu tư hệ thống trang thiết bị y tế hiện đại, nhập khẩu từ các nước tiên tiến, 
                đảm bảo chất lượng chẩn đoán và điều trị tốt nhất cho bệnh nhân.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Equipment Categories */}
      <section className="feature-section">
        <Container>
          {equipmentCategories.map((category, categoryIndex) => (
            <div key={category.id} className={categoryIndex > 0 ? 'mt-5' : ''}>
              <h2 className="section-title">{category.name}</h2>
              <p className="section-subtitle">{category.description}</p>
              
              <Row>
                {category.items.map((item, index) => (
                  <Col lg={4} md={6} className="mb-4" key={index}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Img 
                        variant="top" 
                        src={item.image} 
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <div className="mb-2">
                          <Badge bg="primary" className="mb-2">Xuất xứ: {item.origin}</Badge>
                        </div>
                        <Card.Title className="h5">{item.name}</Card.Title>
                        <Card.Text className="flex-grow-1">
                          {item.description}
                        </Card.Text>
                        
                        <div className="mt-auto">
                          <h6 className="mb-2">Tính năng nổi bật:</h6>
                          <ul className="list-unstyled">
                            {item.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="mb-1">
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
            </div>
          ))}
        </Container>
      </section>

      {/* Quality Assurance */}
      <section className="stats-section">
        <Container>
          <h2 className="section-title">CAM KẾT CHẤT LƯỢNG</h2>
          <div className="section-subtitle">Đảm bảo chất lượng thiết bị và dịch vụ tốt nhất</div>
          
          <Row className="mt-5">
            <Col lg={3} md={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">THIẾT BỊ NHẬP KHẨU</div>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">BẢO TRÌ THIẾT BỊ</div>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">ISO</div>
                <div className="stat-label">CHỨNG NHẬN CHẤT LƯỢNG</div>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">5★</div>
                <div className="stat-label">ĐÁNH GIÁ CHẤT LƯỢNG</div>
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
              <h3>TRẢI NGHIỆM DỊCH VỤ Y TẾ HIỆN ĐẠI</h3>
              <p className="lead mt-3 mb-4">
                Đặt lịch khám để trải nghiệm hệ thống thiết bị y tế hiện đại và dịch vụ chăm sóc sức khỏe chất lượng cao
              </p>
              <a href="/book-appointment" className="btn btn-primary btn-lg">
                Đặt lịch khám ngay
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Equipment;