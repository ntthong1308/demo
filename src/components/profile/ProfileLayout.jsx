import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileLayout = ({ children }) => {
  const { isPatient, isDoctor, isAdmin } = useAuth();
  const location = useLocation();
  
  return (
    <Container className="py-4">
      <Row>
        <Col lg={3} md={4}>
          <div className="profile-sidebar mb-4">
            <h5 className="mb-3">Tài khoản</h5>
            
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link 
                  as={Link}
                  to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ''}
                >
                  <i className="bi bi-person me-2"></i>
                  Thông tin cá nhân
                </Nav.Link>
              </Nav.Item>
              
              {isPatient && (
                <Nav.Item>
                  <Nav.Link 
                    as={Link}
                    to="/patient/appointments"
                    className={location.pathname === '/patient/appointments' ? 'active' : ''}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Lịch hẹn của tôi
                  </Nav.Link>
                </Nav.Item>
              )}
              
              {!isDoctor && !isAdmin && (
                <Nav.Item>
                  <Nav.Link 
                    as={Link}
                    to="/doctor-request"
                    className={location.pathname === '/doctor-request' ? 'active' : ''}
                  >
                    <i className="bi bi-clipboard-plus me-2"></i>
                    Đăng ký làm bác sĩ
                  </Nav.Link>
                </Nav.Item>
              )}
              
              {!isDoctor && !isAdmin && (
                <Nav.Item>
                  <Nav.Link 
                    as={Link}
                    to="/doctor-request-status"
                    className={location.pathname === '/doctor-request-status' ? 'active' : ''}
                  >
                    <i className="bi bi-clipboard-check me-2"></i>
                    Trạng thái đăng ký
                  </Nav.Link>
                </Nav.Item>
              )}
              
              {/* Các mục menu khác */}
              <Nav.Item>
                <Nav.Link 
                  as={Link}
                  to="/change-password"
                  className={location.pathname === '/change-password' ? 'active' : ''}
                >
                  <i className="bi bi-shield-lock me-2"></i>
                  Đổi mật khẩu
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>
        
        <Col lg={9} md={8}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileLayout;