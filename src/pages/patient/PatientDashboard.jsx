import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [currentDateTime, setCurrentDateTime] = useState('');
  
  useEffect(() => {
    // Cập nhật thời gian mỗi giây
    const timer = setInterval(() => {
      const now = new Date();
      // Định dạng UTC theo YYYY-MM-DD HH:MM:SS
      const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
      setCurrentDateTime(formatted);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Container className="py-5">
      <h2 className="mb-4">Bảng điều khiển bệnh nhân</h2>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="card-title">Thông tin hệ thống</h5>
              <p><strong>Ngày giờ hiện tại (UTC):</strong> {currentDateTime}</p>
              <p><strong>Người dùng đăng nhập:</strong> {currentUser?.username || 'ntthong1308'}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Các phần khác của dashboard */}
    </Container>
  );
};

export default PatientDashboard;