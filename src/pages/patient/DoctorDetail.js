import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Tab, Tabs, Table, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// Mock data
const mockDoctors = [
  {
    id: 1,
    firstName: 'Văn',
    lastName: 'Hoàng',
    title: 'Bác sĩ',
    specialties: ['cardiology', 'internal'],
    specialtyNames: ['Tim mạch', 'Nội khoa'],
    hospital: 'Bệnh viện Đại học Y Dược',
    address: '108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    experience: 15,
    rating: 4.9,
    price: 500000,
    bio: 'Bác sĩ Hoàng Văn có hơn 15 năm kinh nghiệm trong lĩnh vực tim mạch và nội khoa. Ông tốt nghiệp Đại học Y Hà Nội và đã hoàn thành chương trình đào tạo sau đại học tại Pháp.',
    education: [
      'Bác sĩ Y khoa - Đại học Y Hà Nội (2008)',
      'Thạc sĩ Y khoa - Đại học Paris, Pháp (2012)',
      'Chuyên khoa I Tim mạch - Đại học Y Hà Nội (2014)'
    ],
    availableSlots: [
      { date: '2025-06-14', slots: ['8:00', '9:00', '10:00', '14:00'] },
      { date: '2025-06-15', slots: ['8:00', '9:00', '15:00', '16:00'] },
      { date: '2025-06-16', slots: ['10:00', '11:00', '14:00', '15:00'] }
    ],
    image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    reviews: [
      { id: 1, patientName: 'Nguyễn Văn A', rating: 5, date: '2025-05-20', comment: 'Bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với dịch vụ.' },
      { id: 2, patientName: 'Trần Thị B', rating: 5, date: '2025-05-15', comment: 'Bác sĩ giải thích rất rõ ràng về tình trạng bệnh và phương pháp điều trị.' },
      { id: 3, patientName: 'Lê Văn C', rating: 4, date: '2025-05-10', comment: 'Chất lượng khám bệnh tốt, tuy nhiên thời gian chờ đợi hơi lâu.' }
    ]
  },
  // Mock data cho các bác sĩ khác...
];

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập API call
    setLoading(true);
    setTimeout(() => {
      const foundDoctor = mockDoctors.find(doc => doc.id.toString() === id);
      setDoctor(foundDoctor);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-2">Đang tải thông tin bác sĩ...</p>
      </Container>
    );
  }

  if (!doctor) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Không tìm thấy thông tin bác sĩ
        </div>
        <Link to="/doctors" className="btn btn-primary mt-3">Quay lại danh sách bác sĩ</Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col lg={3} className="text-center mb-4 mb-lg-0">
              <img 
                src={doctor.image} 
                alt={`${doctor.firstName} ${doctor.lastName}`}
                className="rounded-circle mb-3 shadow"
                style={{ width: '180px', height: '180px', objectFit: 'cover', border: '4px solid #f8f9fa' }}
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
              <h2>{doctor.title} {doctor.firstName} {doctor.lastName}</h2>
              <div className="mb-3">
                {doctor.specialtyNames.map((specialty, index) => (
                  <Badge bg="info" className="me-2" key={index}>{specialty}</Badge>
                ))}
              </div>
              <Row className="mb-3">
                <Col md={6}>
                  <p><i className="bi bi-hospital me-2"></i> {doctor.hospital}</p>
                  <p><i className="bi bi-geo-alt me-2"></i> {doctor.address}</p>
                </Col>
                <Col md={6}>
                  <p><i className="bi bi-calendar-check me-2"></i> {doctor.experience} năm kinh nghiệm</p>
                  <p><i className="bi bi-cash me-2"></i> <strong className="text-primary">{doctor.price.toLocaleString('vi-VN')}đ / lần khám</strong></p>
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
              <p>{doctor.bio}</p>
              
              <h4 className="mb-3 mt-4">Học vấn & Chứng chỉ</h4>
              <ul>
                {doctor.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="schedule" title="Lịch khám có sẵn">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Lịch khám có sẵn</h4>
              <Row>
                {doctor.availableSlots.map((day, index) => (
                  <Col md={4} key={index} className="mb-4">
                    <Card>
                      <Card.Header className="bg-light">
                        <strong>
                          {new Date(day.date).toLocaleDateString('vi-VN', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'numeric' 
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
              {doctor.reviews.map(review => (
                <Card key={review.id} className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <h5>{review.patientName}</h5>
                      <div>
                        {[...Array(review.rating)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                        ))}
                        {[...Array(5-review.rating)].map((_, i) => (
                          <i key={i} className="bi bi-star text-muted me-1"></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted small">{new Date(review.date).toLocaleDateString('vi-VN')}</p>
                    <p>{review.comment}</p>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default DoctorDetails;