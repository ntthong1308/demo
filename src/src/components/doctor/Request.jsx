import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const DoctorRequest = () => {
  return (
    <Container className="py-4">
      <h2>Apply to Become a Doctor</h2>
      <Card className="mt-4">
        <Card.Body>
          <p>This feature is under development.</p>
          <p>You will be able to submit your application to become a doctor on our platform.</p>
          
          <Form className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Medical License Number</Form.Label>
              <Form.Control type="text" placeholder="Enter your license number" disabled />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control as="select" disabled>
                <option>Select specialization</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
              </Form.Control>
            </Form.Group>
            
            <Button variant="primary" disabled>
              Submit Application
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorRequest;