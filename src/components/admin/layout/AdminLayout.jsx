import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Lấy tên hiển thị của admin
  const getAdminName = () => {
    if (!user) return 'Admin';
    return user.fullName || user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username;
  };

  return (
    <div className={`admin-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">MS</div>
            {!collapsed && <span className="logo-text">MediSched</span>}
          </div>
          <Button 
            variant="link" 
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className={`bi bi-chevron-${collapsed ? 'right' : 'left'}`}></i>
          </Button>
        </div>

        <div className="sidebar-menu">
          <Nav className="flex-column">
            <Nav.Link href="/admin" className="sidebar-link">
              <i className="bi bi-speedometer2"></i>
              {!collapsed && <span>Dashboard</span>}
            </Nav.Link>
            
            <Nav.Link href="/admin/doctor-requests" className="sidebar-link">
              <i className="bi bi-person-plus"></i>
              {!collapsed && <span>Yêu cầu bác sĩ</span>}
            </Nav.Link>
            
            <Nav.Link href="/admin/manage-departments" className="sidebar-link">
              <i className="bi bi-building"></i>
              {!collapsed && <span>Phòng ban</span>}
            </Nav.Link>
            
            <Nav.Link href="/admin/manage-patients" className="sidebar-link">
              <i className="bi bi-people"></i>
              {!collapsed && <span>Bệnh nhân</span>}
            </Nav.Link>
            
            <div className="sidebar-divider"></div>
            
            <Nav.Link href="/admin/settings" className="sidebar-link">
              <i className="bi bi-gear"></i>
              {!collapsed && <span>Cài đặt</span>}
            </Nav.Link>
          </Nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {/* Top Navigation */}
        <Navbar bg="white" className="admin-topbar shadow-sm">
          <Container fluid>
            <Navbar.Brand className="d-block d-md-none">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
              >
                <i className="bi bi-list"></i>
              </Button>
            </Navbar.Brand>
            
            <div className="ms-auto d-flex align-items-center">
              <div className="me-4 d-none d-md-block">
                <i className="bi bi-calendar-check me-2"></i>
                {new Date().toLocaleDateString('vi-VN')}
              </div>
              
              <Dropdown align="end">
                <Dropdown.Toggle as="div" className="admin-user-dropdown">
                  <div className="admin-avatar">
                    <i className="bi bi-person"></i>
                  </div>
                  <div className="admin-info d-none d-md-block">
                    <div className="admin-name">{getAdminName()}</div>
                    <div className="admin-role">Quản trị viên</div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/admin/profile">
                    <i className="bi bi-person-circle me-2"></i>
                    Hồ sơ
                  </Dropdown.Item>
                  <Dropdown.Item href="/admin/settings">
                    <i className="bi bi-gear me-2"></i>
                    Cài đặt
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>

        {/* Page Content */}
        <div className="admin-page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;