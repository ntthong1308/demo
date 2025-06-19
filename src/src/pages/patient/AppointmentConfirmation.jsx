import React, { useEffect } from 'react';
import { Container, Alert, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function AppointmentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;
  
  useEffect(() => {
    if (!appointment) {
      // Redirect if no appointment data
      navigate('/patient/appointments');
    }
  }, [appointment, navigate]);
  
  if (!appointment) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Không tìm thấy thông tin lịch khám</Alert.Heading>
          <p>Không thể hiển thị thông tin lịch khám. Vui lòng thử lại.</p>
          <Button variant="primary" onClick={() => navigate('/doctors')}>
            Tìm bác sĩ
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Alert variant="success" className="mb-4">
        <Alert.Heading>Đặt lịch khám thành công!</Alert.Heading>
        <p>Lịch khám của bạn đã được đặt thành công và đang chờ xác nhận từ bác sĩ.</p>
      </Alert>
      
      <Card className="shadow-sm mb-4">
        <Card.Header as="h5" className="bg-primary text-white">
          <i className="bi bi-calendar2-check me-2"></i> 
          Thông tin lịch khám
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Bác sĩ:</strong> {appointment.doctorName}</p>
              <p><strong>Ngày khám:</strong> {new Date(appointment.date).toLocaleDateString('vi-VN')}</p>
              <p><strong>Giờ khám:</strong> {appointment.time}</p>
              <p><strong>Địa điểm:</strong> {appointment.location}</p>
            </Col>
            <Col md={6}>
              <p><strong>Họ tên:</strong> {appointment.patientName}</p>
              <p><strong>Số điện thoại:</strong> {appointment.phone}</p>
              <p><strong>Email:</strong> {appointment.email}</p>
              <p><strong>Phí khám:</strong> {appointment.price?.toLocaleString('vi-VN')}đ</p>
            </Col>
          </Row>
          <hr />
          <div>
            <h6>Lý do khám:</h6>
            <p>{appointment.symptoms}</p>
          </div>
          {appointment.notes && (
            <div>
              <h6>Ghi chú:</h6>
              <p>{appointment.notes}</p>
            </div>
          )}
        </Card.Body>
      </Card>
      
      <div className="text-center">
        <Button variant="primary" onClick={() => navigate('/patient/appointments')} className="me-2">
          <i className="bi bi-calendar-week me-2"></i> 
          Xem lịch hẹn
        </Button>
        <Button variant="outline-primary" onClick={() => navigate('/doctors')}>
          <i className="bi bi-search me-2"></i>
          Tìm bác sĩ khác
        </Button>
      </div>
    </Container>
  );
}

export default AppointmentConfirmation;