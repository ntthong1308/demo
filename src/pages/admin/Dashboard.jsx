import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  
  // Mock data cho yêu cầu bác sĩ
  const doctorRequests = [
    { id: 1, name: 'Bùi Văn Minh', specialty: 'Nhi khoa', status: 'Chờ duyệt' },
    { id: 2, name: 'Nguyễn Thị Lan', specialty: 'Da liễu', status: 'Chờ duyệt' }
  ];
  
  return (
    <Container className="py-5">
      <h2 className="mb-4">Bảng điều khiển Quản trị viên</h2>
      
      <div className="mb-4 p-4 bg-light rounded">
        <h4>Xin chào, {currentUser?.firstName} {currentUser?.lastName}!</h4>
        <p>Email: {currentUser?.email}</p>
        <p>Quyền: Quản trị viên</p>
      </div>
      
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">15</div>
              <Card.Title>Bác sĩ</Card.Title>
              <Button variant="outline-primary" size="sm">Quản lý</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">124</div>
              <Card.Title>Bệnh nhân</Card.Title>
              <Button variant="outline-primary" size="sm">Quản lý</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">8</div>
              <Card.Title>Chuyên khoa</Card.Title>
              <Button variant="outline-primary" size="sm">Quản lý</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-4 mb-2">47</div>
              <Card.Title>Cuộc hẹn hôm nay</Card.Title>
              <Button variant="outline-primary" size="sm">Xem chi tiết</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="mb-4">
        <Card.Header as="h5">Yêu cầu làm bác sĩ mới</Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Chuyên khoa</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {doctorRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.specialty}</td>
                  <td>{request.status}</td>
                  <td>
                    <Button variant="success" size="sm" className="me-2">Duyệt</Button>
                    <Button variant="danger" size="sm">Từ chối</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;