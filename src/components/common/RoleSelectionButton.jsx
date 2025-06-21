import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const RoleSelectionButton = () => {
  const { isAuthenticated, isAdmin, isDoctor, isPatient, isNewUser, user } = useAuth();

  // Không hiển thị nếu người dùng chưa đăng nhập
  if (!isAuthenticated) return null;
  
  // Không hiển thị nếu người dùng đã có vai trò cụ thể
  if (isAdmin || isDoctor || isPatient) return null;
  
  // Nếu người dùng đã đăng nhập nhưng chưa có vai trò
  return (
    <Card className="mt-4 shadow-sm border-0">
      <Card.Body className="p-4 text-center">
        <Alert variant="info" className="mb-3">
          <strong>Chào mừng {user?.firstName || user?.username || 'người dùng mới'}!</strong> <br />
          Bạn cần chọn vai trò để tiếp tục sử dụng đầy đủ các tính năng của hệ thống.
        </Alert>
        
        <div className="d-grid gap-2">
          <Link to="/select-role" className="btn btn-primary btn-lg">
            <i className="bi bi-person-fill-gear me-2"></i>
            Chọn vai trò người dùng
          </Link>
        </div>
        
        <div className="mt-3 text-muted small">
          <i className="bi bi-info-circle me-1"></i>
          Bạn có thể chọn vai trò Bệnh nhân hoặc đăng ký làm Bác sĩ
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoleSelectionButton;