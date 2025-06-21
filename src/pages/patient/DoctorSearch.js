import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function DoctorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [searchParams] = useSearchParams();

  // Chuyên khoa dạng id + name (hiển thị name, gửi id)
useEffect(() => {
  setSpecialties([
    { id: 'GENERAL_PRACTICE', name: 'Đa khoa' },
    { id: 'CARDIOLOGY', name: 'Tim mạch' },
    { id: 'DERMATOLOGY', name: 'Da liễu' },
    { id: 'NEUROLOGY', name: 'Thần kinh' },
    { id: 'PEDIATRICS', name: 'Nhi khoa' },
    { id: 'ORTHOPEDICS', name: 'Chấn thương chỉnh hình' },
    { id: 'PSYCHIATRY', name: 'Tâm thần học' },
    { id: 'ONCOLOGY', name: 'Ung bướu' },
    { id: 'RADIOLOGY', name: 'Chẩn đoán hình ảnh' },
    { id: 'GYNECOLOGY', name: 'Phụ khoa' },
    { id: 'OPHTHALMOLOGY', name: 'Mắt' },
    { id: 'ENT', name: 'Tai-Mũi-Họng' },
    { id: 'DENTISTRY', name: 'Nha khoa' },
    { id: 'ANESTHESIOLOGY', name: 'Gây mê hồi sức' },
  ]);
}, []);

// Đọc tham số chuyên khoa từ URL và tự động tìm kiếm
useEffect(() => {
  const specialtyFromUrl = searchParams.get('specialty');
  if (specialtyFromUrl && specialties.length > 0) {
    // Tìm ID chuyên khoa tương ứng với tên
    const specialty = specialties.find(s => s.name === specialtyFromUrl);
    if (specialty) {
      setSelectedSpecialty(specialty.id);
    }
  }
}, [searchParams, specialties]);

// Tự động tìm kiếm khi selectedSpecialty thay đổi
useEffect(() => {
  if (selectedSpecialty && searchParams.get('specialty')) {
    handleSearch();
  }
}, [selectedSpecialty]);

const handleSearch = async (e = null) => {
  if (e) e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.get('http://localhost:8080/doctor/search', {
      params: {
        name: searchTerm?.trim() || "",
        specialty: selectedSpecialty || "",
        page: 0,
      },
    });

    setDoctors(response.data);
  } catch (error) {
    console.error("Lỗi khi tìm bác sĩ:", error);
    setDoctors([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <Container className="py-5">
      <h2>Tìm kiếm bác sĩ</h2>
      
      {searchParams.get('specialty') && (
        <div className="alert alert-info mb-4 d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-info-circle me-2"></i>
            Đang hiển thị bác sĩ chuyên khoa: <strong>{searchParams.get('specialty')}</strong>
          </div>
          <Link to="/doctors" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-x-circle me-1"></i>
            Xóa bộ lọc
          </Link>
        </div>
      )}

      <Form onSubmit={handleSearch} className="my-4">
        <Row>
          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nhập tên bác sĩ"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4} className="mb-3">
            <Form.Select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
            <option value="">Tất cả chuyên khoa</option> {/* gửi rỗng */}
            {specialties.map((specialty) => (
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
          <Spinner animation="border" role="status" variant="primary" />
          <p className="mt-2">Đang tìm kiếm bác sĩ...</p>
        </div>
      ) : (
        <Row>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <Col md={4} className="mb-4" key={doctor.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={doctor.imageUrl || 'https://via.placeholder.com/400x200'}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>
                      {doctor.title || 'Bs.'} {doctor.fullName}
                    </Card.Title>

                    <div className="mb-2">
                      {doctor.specialty && (
                        <Badge bg="info" className="me-1">
                          {doctor.specialty}
                        </Badge>
                      )}
                    </div>

                    <Card.Text>
                      <i className="bi bi-hospital me-2"></i> {doctor.department?.name  || 'Không rõ'}<br />
                      <i className="bi bi-star-fill me-2 text-warning"></i> {doctor.rating || 0}/5.0<br />
                      <i className="bi bi-calendar-check me-2"></i> {doctor.experience || 0} năm kinh nghiệm<br />
                      {doctor.price && (
                        <strong>
                          <i className="bi bi-cash me-2"></i> {doctor.fee.toLocaleString('vi-VN')}đ / lần khám
                        </strong>
                      )}
                    </Card.Text>

                    <Link to={`/doctors/${doctor.id}`} className="btn btn-primary w-100">
                      Xem chi tiết
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-center py-5">
                <i className="bi bi-search" style={{ fontSize: '3rem' }}></i>
                <p className="mt-3">Không tìm thấy bác sĩ phù hợp. Vui lòng thử từ khóa khác.</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
}



export default DoctorSearch;
