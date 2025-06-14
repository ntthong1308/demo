import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Button, Spinner, Tabs, Tab, Form, Modal, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mock data for doctor appointments
const mockAppointments = [
  {
    id: 1,
    patientId: 101,
    patientName: 'Nguyễn Văn A',
    patientAge: 45,
    patientGender: 'Nam',
    patientPhone: '0987654321',
    patientEmail: 'nguyenvana@email.com',
    date: '2025-06-15',
    time: '9:00',
    status: 'confirmed', // confirmed, pending, cancelled, completed
    symptoms: 'Đau ngực, khó thở khi vận động',
    notes: '',
    medicalHistory: 'Tiền sử cao huyết áp, tiểu đường type 2',
    location: 'Bệnh viện Đại học Y Dược - 108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    price: 500000,
    appointmentType: 'Tái khám'
  },
  {
    id: 2,
    patientId: 102,
    patientName: 'Trần Thị B',
    patientAge: 32,
    patientGender: 'Nữ',
    patientPhone: '0912345678',
    patientEmail: 'tranthib@email.com',
    date: '2025-06-15',
    time: '10:00',
    status: 'pending',
    symptoms: 'Đau đầu kéo dài, chóng mặt, buồn nôn',
    notes: '',
    medicalHistory: 'Không có tiền sử bệnh',
    location: 'Bệnh viện Đại học Y Dược - 108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    price: 500000,
    appointmentType: 'Khám lần đầu'
  },
  {
    id: 3,
    patientId: 103,
    patientName: 'Lê Văn C',
    patientAge: 55,
    patientGender: 'Nam',
    patientPhone: '0965432109',
    patientEmail: 'levanc@email.com',
    date: '2025-06-14',
    time: '14:00',
    status: 'cancelled',
    symptoms: 'Theo dõi sau phẫu thuật tim',
    notes: 'Bệnh nhân hủy do công việc đột xuất',
    medicalHistory: 'Tiền sử phẫu thuật thay van tim năm 2024',
    location: 'Bệnh viện Đại học Y Dược - 108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    price: 500000,
    appointmentType: 'Tái khám'
  },
  {
    id: 4,
    patientId: 104,
    patientName: 'Phạm Thị D',
    patientAge: 28,
    patientGender: 'Nữ',
    patientPhone: '0932109876',
    patientEmail: 'phamthid@email.com',
    date: '2025-06-13',
    time: '15:00',
    status: 'completed',
    symptoms: 'Khó thở, ho kéo dài',
    notes: 'Đã chẩn đoán viêm phế quản cấp, kê đơn thuốc 7 ngày',
    medicalHistory: 'Tiền sử hen suyễn',
    location: 'Bệnh viện Đại học Y Dược - 108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    price: 500000,
    appointmentType: 'Khám lần đầu'
  },
  {
    id: 5,
    patientId: 105,
    patientName: 'Hoàng Văn E',
    patientAge: 40,
    patientGender: 'Nam',
    patientPhone: '0978563412',
    patientEmail: 'hoangvane@email.com',
    date: '2025-06-16',
    time: '8:00',
    status: 'confirmed',
    symptoms: 'Đau thắt ngực, khó thở khi gắng sức',
    notes: '',
    medicalHistory: 'Gia đình có tiền sử bệnh tim',
    location: 'Bệnh viện Đại học Y Dược - 108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
    price: 500000,
    appointmentType: 'Khám lần đầu'
  },
];

function DoctorAppointments() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('confirm'); // confirm, complete, cancel
  const [modalData, setModalData] = useState(null);
  const [doctorNote, setDoctorNote] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescriptions, setPrescriptions] = useState('');

  useEffect(() => {
    // Simulate API call to fetch appointments
    setLoading(true);
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 800);
  }, [currentUser]);

  const today = new Date().toISOString().split('T')[0];
  
  const todayAppointments = appointments.filter(
    app => app.date === today
  );
  
  const upcomingAppointments = appointments.filter(
    app => (app.status === 'confirmed' || app.status === 'pending') && 
           app.date > today
  );
  
  const pastAppointments = appointments.filter(
    app => app.status === 'completed' || 
           (app.date < today && app.status !== 'cancelled')
  );
  
  const cancelledAppointments = appointments.filter(
    app => app.status === 'cancelled'
  );

  const handleModalOpen = (type, appointment) => {
    setModalType(type);
    setModalData(appointment);
    setDoctorNote('');
    setDiagnosis('');
    setPrescriptions('');
    setShowModal(true);
  };

  const handleModalAction = () => {
    // In a real app, call API to update appointment
    let updatedAppointment;
    
    switch(modalType) {
      case 'confirm':
        updatedAppointment = { ...modalData, status: 'confirmed', notes: doctorNote || modalData.notes };
        break;
      case 'complete':
        updatedAppointment = { 
          ...modalData, 
          status: 'completed', 
          notes: doctorNote || modalData.notes,
          diagnosis: diagnosis,
          prescriptions: prescriptions 
        };
        break;
      case 'cancel':
        updatedAppointment = { ...modalData, status: 'cancelled', notes: doctorNote || modalData.notes };
        break;
      default:
        break;
    }
    
    setAppointments(appointments.map(app => 
      app.id === modalData.id ? updatedAppointment : app
    ));
    
    setShowModal(false);
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

  const renderAppointmentCard = (appointment) => (
    <Card key={appointment.id} className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>
            <i className="bi bi-person me-2"></i>
            {appointment.patientName} ({appointment.patientAge}, {appointment.patientGender})
          </h5>
          <div>
            {getStatusBadge(appointment.status)}
          </div>
        </div>
        
        <Row>
          <Col md={6}>
            <p><i className="bi bi-calendar-date me-2"></i> <strong>Ngày khám:</strong> {formatDate(appointment.date)}</p>
            <p><i className="bi bi-clock me-2"></i> <strong>Giờ khám:</strong> {appointment.time}</p>
            <p><i className="bi bi-telephone me-2"></i> <strong>Điện thoại:</strong> {appointment.patientPhone}</p>
            <p><i className="bi bi-envelope me-2"></i> <strong>Email:</strong> {appointment.patientEmail}</p>
          </Col>
          <Col md={6}>
            <p><i className="bi bi-journal-medical me-2"></i> <strong>Triệu chứng:</strong> {appointment.symptoms}</p>
            <p><i className="bi bi-clipboard2-pulse me-2"></i> <strong>Tiền sử:</strong> {appointment.medicalHistory}</p>
            <p><i className="bi bi-tag me-2"></i> <strong>Loại khám:</strong> {appointment.appointmentType}</p>
            {appointment.notes && (
              <p><i className="bi bi-pencil me-2"></i> <strong>Ghi chú:</strong> {appointment.notes}</p>
            )}
          </Col>
        </Row>
        
        <div className="mt-3 d-flex justify-content-end">
          {appointment.status === 'pending' && (
            <>
              <Button variant="success" className="me-2" onClick={() => handleModalOpen('confirm', appointment)}>
                <i className="bi bi-check-circle me-1"></i> Xác nhận
              </Button>
              <Button variant="danger" onClick={() => handleModalOpen('cancel', appointment)}>
                <i className="bi bi-x-circle me-1"></i> Từ chối
              </Button>
            </>
          )}
          
          {appointment.status === 'confirmed' && appointment.date === today && (
            <Button variant="primary" onClick={() => handleModalOpen('complete', appointment)}>
              <i className="bi bi-clipboard-check me-1"></i> Hoàn thành khám
            </Button>
          )}
          
          {appointment.status === 'confirmed' && appointment.date !== today && (
            <Button variant="danger" onClick={() => handleModalOpen('cancel', appointment)}>
              <i className="bi bi-x-circle me-1"></i> Hủy lịch
            </Button>
          )}
          
          {appointment.status === 'completed' && (
            <Button variant="outline-primary">
              <i className="bi bi-file-earmark-text me-1"></i> Xem hồ sơ
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-2">Đang tải lịch khám...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Quản lý lịch khám bệnh</h2>
      
      <Tabs 
        activeKey={activeTab} 
        onSelect={(k) => setActiveTab(k)} 
        className="mb-4"
      >
        <Tab eventKey="today" title={
          <span>
            <i className="bi bi-calendar-day me-1"></i> Hôm nay
            {todayAppointments.length > 0 && 
              <Badge pill bg="danger" className="ms-2">{todayAppointments.length}</Badge>
            }
          </span>
        }>
          {todayAppointments.length > 0 ? (
            todayAppointments.map(renderAppointmentCard)
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar2-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Không có lịch khám nào trong ngày hôm nay</p>
            </div>
          )}
        </Tab>
        
        <Tab eventKey="upcoming" title={
          <span>
            <i className="bi bi-calendar-check me-1"></i> Sắp tới
            {upcomingAppointments.length > 0 && 
              <Badge pill bg="primary" className="ms-2">{upcomingAppointments.length}</Badge>
            }
          </span>
        }>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(renderAppointmentCard)
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar2-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Không có lịch khám nào sắp tới</p>
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
            pastAppointments.map(renderAppointmentCard)
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar2-check" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
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
            cancelledAppointments.map(renderAppointmentCard)
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar2-check" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Không có lịch khám nào bị hủy</p>
            </div>
          )}
        </Tab>
      </Tabs>
      
      {/* Modal xử lý lịch khám */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size={modalType === 'complete' ? 'lg' : 'md'}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'confirm' && 'Xác nhận lịch khám'}
            {modalType === 'complete' && 'Hoàn thành khám bệnh'}
            {modalType === 'cancel' && 'Hủy lịch khám'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData && (
            <>
              <p>
                <strong>Bệnh nhân:</strong> {modalData.patientName} ({modalData.patientAge}, {modalData.patientGender})
              </p>
              <p>
                <strong>Thời gian:</strong> {formatDate(modalData.date)} lúc {modalData.time}
              </p>
              <p>
                <strong>Triệu chứng:</strong> {modalData.symptoms}
              </p>
              
              {modalType === 'confirm' && (
                <Form.Group className="mb-3">
                  <Form.Label>Ghi chú cho bệnh nhân (nếu có)</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={doctorNote}
                    onChange={(e) => setDoctorNote(e.target.value)}
                    placeholder="Nhập hướng dẫn hoặc ghi chú cho bệnh nhân"
                  />
                </Form.Group>
              )}
              
              {modalType === 'complete' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Chẩn đoán</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={2}
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="Nhập chẩn đoán"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Đơn thuốc và hướng dẫn</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      value={prescriptions}
                      onChange={(e) => setPrescriptions(e.target.value)}
                      placeholder="Nhập đơn thuốc và hướng dẫn điều trị"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={2}
                      value={doctorNote}
                      onChange={(e) => setDoctorNote(e.target.value)}
                      placeholder="Nhập ghi chú thêm (nếu có)"
                    />
                  </Form.Group>
                </>
              )}
              
              {modalType === 'cancel' && (
                <Form.Group className="mb-3">
                  <Form.Label>Lý do hủy</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={doctorNote}
                    onChange={(e) => setDoctorNote(e.target.value)}
                    placeholder="Nhập lý do hủy lịch khám"
                  />
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button 
            variant={
              modalType === 'confirm' ? 'success' : 
              modalType === 'complete' ? 'primary' : 'danger'
            } 
            onClick={handleModalAction}
          >
            {modalType === 'confirm' && 'Xác nhận lịch'}
            {modalType === 'complete' && 'Hoàn thành khám'}
            {modalType === 'cancel' && 'Hủy lịch'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DoctorAppointments;