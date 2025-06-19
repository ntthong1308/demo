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
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Manage Patients</Card.Title>
              <Card.Text>
                View and manage patient accounts.
              </Card.Text>
              <Link to="/admin/manage-patients" className="btn btn-info">Manage Patients</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Departments</Card.Title>
              <Card.Text>
                Create and manage medical departments.
              </Card.Text>
              <Link to="/admin/manage-departments" className="btn btn-success">Manage Departments</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
