import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Mock data
const mockSpecialties = [
  { id: 'cardiology', name: 'Tim mạch' },
  { id: 'dermatology', name: 'Da liễu' },
  { id: 'neurology', name: 'Thần kinh' },
  { id: 'orthopedics', name: 'Cơ xương khớp' },
  { id: 'pediatrics', name: 'Nhi khoa' },
];

const mockDoctors = [
  {
    id: 1,
    firstName: 'Văn',
    lastName: 'Hoàng',
    title: 'Bác sĩ',
    specialties: ['cardiology', 'internal'],
    specialtyNames: ['Tim mạch', 'Nội khoa'],
    hospital: 'Bệnh viện Đại học Y Dược',
    experience: 15,
    rating: 4.9,
    price: 500000,
    image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg'
  },
  {
    id: 2,
    firstName: 'Thị Hương',
    lastName: 'Nguyễn',
    title: 'Bác sĩ',
    specialties: ['dermatology'],
    specialtyNames: ['Da liễu'],
    hospital: 'Bệnh viện Da liễu Trung ương',
    experience: 10,
    rating: 4.7,
    price: 450000,
    image: 'https://img.freepik.com/free-photo/front-view-covid-recovery-center-female-doctor-with-stethoscope_23-2148847899.jpg'
  },
  {
    id: 3,
    firstName: 'Minh',
    lastName: 'Lê',
    title: 'PGS.TS.BS',
    specialties: ['neurology'],
    specialtyNames: ['Thần kinh'],
    hospital: 'Bệnh viện Bạch Mai',
    experience: 20,
    rating: 5.0,
    price: 700000,
    image: 'https://img.freepik.com/free-photo/pleased-young-male-doctor-wearing-medical-robe-stethoscope-showing-thumb-up_409827-2765.jpg'
  },
];

function DoctorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Filter doctors based on search term and specialty
      let filtered = [...mockDoctors];
      
      if (searchTerm) {
        filtered = filtered.filter(doctor => 
          `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialtyNames.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      if (selectedSpecialty) {
        filtered = filtered.filter(doctor => 
          doctor.specialties.includes(selectedSpecialty)
        );
      }
      
      setDoctors(filtered);
      setLoading(false);
    }, 500);
  }, [searchTerm, selectedSpecialty]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is actually triggered by the useEffect above when searchTerm changes
  };

  return (
    <Container className="py-5">
      <h2>Tìm kiếm bác sĩ</h2>
      
      <Form onSubmit={handleSearch} className="my-4">
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nhập tên bác sĩ hoặc chuyên khoa"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4} className="mb-3">
            <Form.Select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">Tất cả chuyên khoa</option>
              {mockSpecialties.map(specialty => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2} className="mb-3">
            <Button variant="primary" type="submit" className="w-100">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>
      
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
          <p className="mt-2">Đang tìm kiếm bác sĩ...</p>
        </div>
      ) : (
        <Row>
          {doctors.length > 0 ? (
            doctors.map(doctor => (
              <Col md={4} className="mb-4" key={doctor.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={doctor.image} style={{ height: "200px", objectFit: "cover" }} />
                  <Card.Body>
                    <Card.Title>{doctor.title} {doctor.firstName} {doctor.lastName}</Card.Title>
                    <div className="mb-2">
                      {doctor.specialtyNames.map((specialty, index) => (
                        <Badge bg="info" className="me-1" key={index}>{specialty}</Badge>
                      ))}
                    </div>
                    <Card.Text>
                      <i className="bi bi-hospital me-2"></i> {doctor.hospital}<br />
                      <i className="bi bi-star-fill me-2 text-warning"></i> {doctor.rating}/5.0<br />
                      <i className="bi bi-calendar-check me-2"></i> {doctor.experience} năm kinh nghiệm<br />
                      <strong><i className="bi bi-cash me-2"></i> {doctor.price.toLocaleString('vi-VN')}đ / lần khám</strong>
                    </Card.Text>
                    <Link to={`/doctors/${doctor.id}`} className="btn btn-primary w-100">Xem chi tiết</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-center py-5">
                <i className="bi bi-search" style={{ fontSize: "3rem" }}></i>
                <p className="mt-3">Không tìm thấy bác sĩ phù hợp. Vui lòng thử lại với từ khóa khác.</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
}

export default DoctorSearch;