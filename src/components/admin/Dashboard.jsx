import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container className="py-4">
      <h2>Admin Dashboard</h2>
      <p className="lead">Welcome to the admin panel!</p>
      
      <Row className="mt-4">
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Doctor Requests</Card.Title>
              <Card.Text>
                Review and manage doctor applications.
              </Card.Text>
              <a href="/admin/doctor-requests" className="btn btn-primary">View Requests</a>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Manage Patients</Card.Title>
              <Card.Text>
                View and manage patient accounts.
              </Card.Text>
              <a href="/admin/manage-patients" className="btn btn-info">Manage Patients</a>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Departments</Card.Title>
              <Card.Text>
                Create and manage medical departments.
              </Card.Text>
              <a href="/admin/manage-departments" className="btn btn-success">Manage Departments</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;