import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Spinner, Tabs, Tab, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    doctorId: 1,
    doctorName: 'BS. Hoàng Văn',
    doctorSpecialty: 'Tim mạch',
    doctorImage: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    date: '2025-06-15',
    time: '9:00',
    status: 'confirmed', // confirmed, pending, cancelled, completed
    symptoms: 'Đau ngực, khó thở khi vận động',
    notes: 'Mang theo kết quả xét nghiệm trước đó',
    location: 'Bệnh viện Đại học Y Dược - 108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    price: 500000
  },
  {
    id: 2,
    doctorId: 3,
    doctorName: 'PGS.TS.BS Lê Minh',
    doctorSpecialty: 'Thần kinh',
    doctorImage: 'https://img.freepik.com/free-photo/pleased-young-male-doctor-wearing-medical-robe-stethoscope-showing-thumb-up_409827-2765.jpg',
    date: '2025-06-20',
    time: '10:00',
    status: 'pending',
    symptoms: 'Đau đầu kéo dài, chóng mặt',
    notes: '',
    location: 'Bệnh viện Bạch Mai - 78 Giải Phóng, Phương Đình, Đống Đa, Hà Nội',
    price: 700000
  },
  {
    id: 3,
    doctorId: 2,
    doctorName: 'BS. Nguyễn Thị Hương',
    doctorSpecialty: 'Da liễu',
    doctorImage: 'https://img.freepik.com/free-photo/front-view-covid-recovery-center-female-doctor-with-stethoscope_23-2148847899.jpg',
    date: '2025-06-10',
    time: '15:00',
    status: 'completed',
    symptoms: 'Nổi mẩn đỏ trên da, ngứa',
    notes: 'Đã kê đơn thuốc và theo dõi',
    location: 'Bệnh viện Da liễu Trung ương - 15A Phương Mai, Đống Đa, Hà Nội',
    price: 450000
  },
  {
    id: 4,
    doctorId: 1,
    doctorName: 'BS. Hoàng Văn',
    doctorSpecialty: 'Tim mạch',
    doctorImage: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    date: '2025-05-25',
    time: '14:00',
    status: 'cancelled',
    symptoms: 'Khám định kỳ huyết áp',
    notes: 'Bệnh nhân đã hủy lịch',
    location: 'Bệnh viện Đại học Y Dược - 108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    price: 500000
  },
];

const PatientAppointments = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch appointments
    setLoading(true);
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 800);
  }, [currentUser]);

  const upcomingAppointments = appointments.filter(
    app => (app.status === 'confirmed' || app.status === 'pending') && new Date(`${app.date}T${app.time}`) >= new Date()
  );
  
  const pastAppointments = appointments.filter(
    app => app.status === 'completed' || new Date(`${app.date}T${app.time}`) < new Date()
  );
  
  const cancelledAppointments = appointments.filter(
    app => app.status === 'cancelled'
  );

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    // In a real app, call API to cancel appointment
    setAppointments(appointments.map(app => 
      app.id === selectedAppointment.id 
        ? {...app, status: 'cancelled', notes: `Hủy bởi bệnh nhân: ${cancelReason}`} 
        : app
    ));
    setShowCancelModal(false);
    setCancelReason('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge bg="success">Đã xác nhận</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">Chờ xác nhận</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Đã hủy</Badge>;
      case 'completed':
        return <Badge bg="info">Đã khám</Badge>;
      default:
        return <Badge bg="secondary">Không xác định</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-2">Đang tải lịch hẹn...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Quản lý lịch hẹn khám bệnh</h2>
      
      <Tabs 
        activeKey={activeTab} 
        onSelect={(k) => setActiveTab(k)} 
        className="mb-4"
      >
        <Tab eventKey="upcoming" title={
          <span>
            <i className="bi bi-calendar-check me-1"></i> Sắp tới
            {upcomingAppointments.length > 0 && 
              <Badge pill bg="primary" className="ms-2">{upcomingAppointments.length}</Badge>
            }
          </span>
        }>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={appointment.doctorImage} 
                      alt={appointment.doctorName}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="mb-0">{appointment.doctorName}</h5>
                      <p className="text-muted mb-0">
                        <i className="bi bi-tag me-1"></i> {appointment.doctorSpecialty}
                      </p>
                    </div>
                    <div className="ms-auto text-end">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>
                  
                  <Row>
                    <Col md={6}>
                      <p><i className="bi bi-calendar-date me-2"></i> <strong>Ngày khám:</strong> {formatDate(appointment.date)}</p>
                      <p><i className="bi bi-clock me-2"></i> <strong>Giờ khám:</strong> {appointment.time}</p>
                      <p><i className="bi bi-geo-alt me-2"></i> <strong>Địa điểm:</strong> {appointment.location}</p>
                    </Col>
                    <Col md={6}>
                      <p><i className="bi bi-journal-medical me-2"></i> <strong>Triệu chứng:</strong> {appointment.symptoms}</p>
                      {appointment.notes && (
                        <p><i className="bi bi-pencil me-2"></i> <strong>Ghi chú:</strong> {appointment.notes}</p>
                      )}
                      <p><i className="bi bi-cash me-2"></i> <strong>Phí khám:</strong> {appointment.price.toLocaleString('vi-VN')}đ</p>
                    </Col>
                  </Row>
                  
                  <div className="mt-3 d-flex justify-content-end">
                    <Link to={`/doctors/${appointment.doctorId}`} className="btn btn-outline-primary me-2">
                      <i className="bi bi-info-circle me-1"></i> Thông tin bác sĩ
                    </Link>
                    
                    {appointment.status !== 'cancelled' && new Date(`${appointment.date}T${appointment.time}`) > new Date() && (
                      <Button variant="outline-danger" onClick={() => handleCancelClick(appointment)}>
                        <i className="bi bi-x-circle me-1"></i> Hủy lịch
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar2-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Bạn chưa có lịch hẹn nào sắp tới</p>
              <Link to="/doctors" className="btn btn-primary">
                <i className="bi bi-search me-1"></i> Tìm bác sĩ và đặt lịch
              </Link>
            </div>
          )}
        </Tab>
        
        <Tab eventKey="past" title={
          <span>
            <i className="bi bi-calendar-event me-1"></i> Đã khám
            {pastAppointments.length > 0 && 
              <Badge pill bg="secondary" className="ms-2">{pastAppointments.length}</Badge>
            }
          </span>
        }>
          {pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={appointment.doctorImage} 
                      alt={appointment.doctorName}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="mb-0">{appointment.doctorName}</h5>
                      <p className="text-muted mb-0">
                        <i className="bi bi-tag me-1"></i> {appointment.doctorSpecialty}
                      </p>
                    </div>
                    <div className="ms-auto text-end">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>
                  
                  <Row>
                    <Col md={6}>
                      <p><i className="bi bi-calendar-date me-2"></i> <strong>Ngày khám:</strong> {formatDate(appointment.date)}</p>
                      <p><i className="bi bi-clock me-2"></i> <strong>Giờ khám:</strong> {appointment.time}</p>
                      <p><i className="bi bi-geo-alt me-2"></i> <strong>Địa điểm:</strong> {appointment.location}</p>
                    </Col>
                    <Col md={6}>
                      <p><i className="bi bi-journal-medical me-2"></i> <strong>Triệu chứng:</strong> {appointment.symptoms}</p>
                      {appointment.notes && (
                        <p><i className="bi bi-pencil me-2"></i> <strong>Ghi chú:</strong> {appointment.notes}</p>
                      )}
                      <p><i className="bi bi-cash me-2"></i> <strong>Phí khám:</strong> {appointment.price.toLocaleString('vi-VN')}đ</p>
                    </Col>
                  </Row>
                  
                  <div className="mt-3 d-flex justify-content-end">
                    <Link to={`/doctors/${appointment.doctorId}`} className="btn btn-outline-primary me-2">
                      <i className="bi bi-info-circle me-1"></i> Thông tin bác sĩ
                    </Link>
                    <Button variant="outline-secondary">
                      <i className="bi bi-star me-1"></i> Đánh giá
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar2-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Không có lịch khám nào trong quá khứ</p>
            </div>
          )}
        </Tab>
        
        <Tab eventKey="cancelled" title={
          <span>
            <i className="bi bi-calendar-x me-1"></i> Đã hủy
            {cancelledAppointments.length > 0 && 
              <Badge pill bg="danger" className="ms-2">{cancelledAppointments.length}</Badge>
            }
          </span>
        }>
          {cancelledAppointments.length > 0 ? (
            cancelledAppointments.map((appointment) => (
              <Card key={appointment.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={appointment.doctorImage} 
                      alt={appointment.doctorName}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="mb-0">{appointment.doctorName}</h5>
                      <p className="text-muted mb-0">
                        <i className="bi bi-tag me-1"></i> {appointment.doctorSpecialty}
                      </p>
                    </div>
                    <div className="ms-auto text-end">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>
                  
                  <Row>
                    <Col md={6}>
                      <p><i className="bi bi-calendar-date me-2"></i> <strong>Ngày khám:</strong> {formatDate(appointment.date)}</p>
                      <p><i className="bi bi-clock me-2"></i> <strong>Giờ khám:</strong> {appointment.time}</p>
                      <p><i className="bi bi-geo-alt me-2"></i> <strong>Địa điểm:</strong> {appointment.location}</p>
                    </Col>
                    <Col md={6}>
                      <p><i className="bi bi-journal-medical me-2"></i> <strong>Triệu chứng:</strong> {appointment.symptoms}</p>
                      {appointment.notes && (
                        <p><i className="bi bi-pencil me-2"></i> <strong>Ghi chú:</strong> {appointment.notes}</p>
                      )}
                      <p><i className="bi bi-cash me-2"></i> <strong>Phí khám:</strong> {appointment.price.toLocaleString('vi-VN')}đ</p>
                    </Col>
                  </Row>
                  
                  <div className="mt-3 d-flex justify-content-end">
                    <Link to={`/book-appointment/${appointment.doctorId}`} className="btn btn-primary">
                      <i className="bi bi-calendar-plus me-1"></i> Đặt lịch lại
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar2-check" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Không có lịch hẹn nào bị hủy</p>
            </div>
          )}
        </Tab>
      </Tabs>
      
      {/* Modal xác nhận hủy lịch */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy lịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn hủy lịch khám với {selectedAppointment?.doctorName} vào {selectedAppointment && formatDate(selectedAppointment.date)} lúc {selectedAppointment?.time}?</p>
          <Form.Group className="mb-3">
            <Form.Label>Lý do hủy</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Nhập lý do hủy lịch khám"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleCancelConfirm}>
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PatientAppointments;