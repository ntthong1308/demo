<<<<<<< HEAD
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Container className="py-4">
      <h2>Admin Dashboard</h2>
      <p className="lead">Welcome to the admin panel!</p>
      
      <Row className="mt-4">
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Doctor Requests</Card.Title>
              <Card.Text>
                Review and manage doctor applications.
              </Card.Text>
              <Link to="/admin/doctor-requests" className="btn btn-primary">View Requests</Link>
=======
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { doctorService, patientService, appointmentService, departmentService } from '../../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    departments: 0,
    pendingRequests: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel for better performance
      const [doctorsResponse, patientsResponse, appointmentsResponse, departmentsResponse] = 
        await Promise.all([
          doctorService.getAllRequests(),
          patientService.getAll(),
          appointmentService.getAll(),
          departmentService.getAll()
        ]);

      // Count pending doctor requests
      const pendingRequests = doctorsResponse.data.filter(req => req.status === 'PENDING').length;
      
      // Set the statistics
      setStats({
        doctors: doctorsResponse.data.filter(doc => doc.status === 'APPROVED').length,
        patients: patientsResponse.data.length,
        appointments: appointmentsResponse.data.length,
        departments: departmentsResponse.data.length,
        pendingRequests
      });

      // Get recent appointments (last 5)
      const sortedAppointments = [...appointmentsResponse.data]
        .sort((a, b) => new Date(b.createdAt || b.appointmentDate) - new Date(a.createdAt || a.appointmentDate))
        .slice(0, 5);
      
      setRecentAppointments(sortedAppointments);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Không thể tải dữ liệu tổng quan. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="badge bg-success">Hoàn thành</span>;
      case 'PENDING':
        return <span className="badge bg-warning">Chờ xác nhận</span>;
      case 'CONFIRMED':
        return <span className="badge bg-primary">Đã xác nhận</span>;
      case 'CANCELLED':
        return <span className="badge bg-danger">Đã hủy</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Tổng quan hệ thống</h2>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={fetchDashboardData}
          disabled={loading}
        >
          {loading ? (
            <><Spinner animation="border" size="sm" /> Đang tải...</>
          ) : (
            <><i className="bi bi-arrow-clockwise me-1"></i> Làm mới</>
          )}
        </Button>
      </div>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-2">Bác sĩ</h6>
                  <h3 className="mb-0">{loading ? '...' : stats.doctors}</h3>
                </div>
                <div className="icon-box bg-primary-light rounded-circle p-3">
                  <i className="bi bi-person-badge-fill fs-4 text-primary"></i>
                </div>
              </div>
              <div className="mt-3">
                <Link to="/admin/doctor-requests" className="text-decoration-none">
                  Xem danh sách <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
>>>>>>> 1a644ab (1)
            </Card.Body>
          </Card>
        </Col>
        
<<<<<<< HEAD
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Manage Patients</Card.Title>
              <Card.Text>
                View and manage patient accounts.
              </Card.Text>
              <Link to="/admin/manage-patients" className="btn btn-info">Manage Patients</Link>
=======
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-2">Bệnh nhân</h6>
                  <h3 className="mb-0">{loading ? '...' : stats.patients}</h3>
                </div>
                <div className="icon-box bg-success-light rounded-circle p-3">
                  <i className="bi bi-people-fill fs-4 text-success"></i>
                </div>
              </div>
              <div className="mt-3">
                <Link to="/admin/manage-patients" className="text-decoration-none">
                  Xem danh sách <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
>>>>>>> 1a644ab (1)
            </Card.Body>
          </Card>
        </Col>
        
<<<<<<< HEAD
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Departments</Card.Title>
              <Card.Text>
                Create and manage medical departments.
              </Card.Text>
              <Link to="/admin/manage-departments" className="btn btn-success">Manage Departments</Link>
=======
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-2">Cuộc hẹn</h6>
                  <h3 className="mb-0">{loading ? '...' : stats.appointments}</h3>
                </div>
                <div className="icon-box bg-info-light rounded-circle p-3">
                  <i className="bi bi-calendar-check-fill fs-4 text-info"></i>
                </div>
              </div>
              <div className="mt-3">
                <Link to="#" className="text-decoration-none">
                  Xem lịch hẹn <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-2">Yêu cầu mới</h6>
                  <h3 className="mb-0">{loading ? '...' : stats.pendingRequests}</h3>
                </div>
                <div className="icon-box bg-warning-light rounded-circle p-3">
                  <i className="bi bi-person-plus-fill fs-4 text-warning"></i>
                </div>
              </div>
              <div className="mt-3">
                <Link to="/admin/doctor-requests" className="text-decoration-none">
                  Xem yêu cầu <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
>>>>>>> 1a644ab (1)
            </Card.Body>
          </Card>
        </Col>
      </Row>
<<<<<<< HEAD
    </Container>
  );
};

export default AdminDashboard;
=======
      
      {/* Recent appointments */}
      <Row>
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white pt-4 pb-3 border-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Lịch hẹn gần đây</h5>
                <Link to="#" className="text-decoration-none">
                  Xem tất cả <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th className="border-top-0 ps-4">Bệnh nhân</th>
                      <th className="border-top-0">Bác sĩ</th>
                      <th className="border-top-0">Thời gian</th>
                      <th className="border-top-0">Trạng thái</th>
                      <th className="border-top-0 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <Spinner animation="border" variant="primary" />
                          <p className="mt-2">Đang tải dữ liệu...</p>
                        </td>
                      </tr>
                    ) : recentAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <i className="bi bi-calendar-x fs-1 text-muted"></i>
                          <p className="mt-2">Không có lịch hẹn gần đây</p>
                        </td>
                      </tr>
                    ) : (
                      recentAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="ps-4">
                            {appointment.patientName || 'N/A'}
                          </td>
                          <td>{appointment.doctorName || 'N/A'}</td>
                          <td>{formatDate(appointment.appointmentDate)}</td>
                          <td>{getStatusBadge(appointment.status)}</td>
                          <td className="text-center">
                            <Button variant="outline-primary" size="sm">
                              <i className="bi bi-eye"></i>
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
>>>>>>> 1a644ab (1)
