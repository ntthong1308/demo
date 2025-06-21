import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileActions = () => {
  const { isDoctor, hasRequestedDoctor } = useAuth();
  
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Tùy chọn nâng cao</h5>
      </Card.Header>
      <Card.Body>
        {!isDoctor && !hasRequestedDoctor && (
          <div className="mb-3">
            <h6>Bạn là bác sĩ?</h6>
            <p className="text-muted">Đăng ký làm bác sĩ trên hệ thống để giúp đỡ nhiều bệnh nhân hơn.</p>
            <Link to="/doctor-request" className="btn btn-outline-primary">
              <i className="bi bi-clipboard-plus me-2"></i>
              Đăng ký làm bác sĩ
            </Link>
          </div>
        )}
        
        {!isDoctor && hasRequestedDoctor && (
          <div className="mb-3">
            <h6>Yêu cầu đăng ký bác sĩ</h6>
            <p className="text-muted">Bạn đã gửi yêu cầu đăng ký làm bác sĩ. Kiểm tra trạng thái yêu cầu.</p>
            <Link to="/doctor-request-status" className="btn btn-outline-info">
              <i className="bi bi-hourglass-split me-2"></i>
              Xem trạng thái yêu cầu
            </Link>
          </div>
        )}
        
        {/* Các tùy chọn khác */}
      </Card.Body>
    </Card>
  );
};

export default ProfileActions;