import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleSelection = () => {
  const { updateUserRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const selectPatientRole = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Thử gọi API để cập nhật vai trò
      try {
        const result = await updateUserRole('PATIENT');
        
        if (result.success) {
          // Nếu API thành công, chuyển hướng đến trang dashboard
          navigate('/patient/dashboard');
        } else {
          // Hiển thị thông báo khi có lỗi API
          setError("Cập nhật vai trò trên hệ thống có thể chưa thành công, nhưng bạn vẫn có thể tiếp tục sử dụng ứng dụng. Lỗi: " + result.message);
          
          // Vẫn điều hướng người dùng sau 1 giây
          setTimeout(() => {
            navigate('/patient/dashboard');
          }, 1000);
        }
      } catch (apiErr) {
        console.error("API error:", apiErr);
        // Vẫn chuyển hướng người dùng ngay cả khi API lỗi
        setTimeout(() => {
          navigate('/patient/dashboard');
        }, 1000);
      }
      
    } catch (err) {
      console.error('Error setting patient role:', err);
      setError('Không thể cập nhật vai trò bệnh nhân. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const requestDoctorRole = () => {
    navigate('/doctor-request');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h3>Chào mừng bạn đến với MediSched!</h3>
              <p className="mb-0">Vui lòng chọn vai trò của bạn để tiếp tục</p>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="warning">{error}</Alert>}
              
              <p className="text-center mb-4">
                Chọn một trong hai vai trò dưới đây để có thể sử dụng đầy đủ tính năng của hệ thống
              </p>

              <Row>
                <Col md={6} className="mb-4 mb-md-0">
                  <Card 
                    className="h-100 shadow-sm hover-card" 
                    style={{ cursor: loading ? 'default' : 'pointer' }}
                  >
                    <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                      <div className="icon-wrapper mb-3">
                        <i className="bi bi-person-fill text-primary" style={{ fontSize: '3rem' }}></i>
                      </div>
                      <Card.Title>Tôi là Bệnh Nhân</Card.Title>
                      <Card.Text>
                        Đặt lịch khám bệnh online, xem lịch sử khám bệnh, nhận tư vấn từ bác sĩ
                      </Card.Text>
                      <Button 
                        variant="primary" 
                        className="mt-auto w-100" 
                        onClick={selectPatientRole}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Đang xử lý...
                          </>
                        ) : 'Chọn vai trò Bệnh Nhân'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card 
                    className="h-100 shadow-sm hover-card"
                    style={{ cursor: loading ? 'default' : 'pointer' }}
                  >
                    <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                      <div className="icon-wrapper mb-3">
                        <i className="bi bi-clipboard2-pulse-fill text-success" style={{ fontSize: '3rem' }}></i>
                      </div>
                      <Card.Title>Tôi là Bác Sĩ</Card.Title>
                      <Card.Text>
                        Quản lý lịch khám, tư vấn bệnh nhân, quản lý hồ sơ y tế
                      </Card.Text>
                      <Button 
                        variant="success" 
                        className="mt-auto w-100" 
                        onClick={requestDoctorRole}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Đang xử lý...
                          </>
                        ) : 'Đăng ký làm Bác Sĩ'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RoleSelection;