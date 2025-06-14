import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { forgotPassword, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!email) {
      setFormError('Vui lòng nhập email');
      return;
    }
    
    const result = await forgotPassword(email);
    if (result.success) {
      setSuccess(true);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <div className="form-container">
            <h4 className="form-title">QUÊN MẬT KHẨU</h4>
            
            {formError && <Alert variant="danger">{formError}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.
              </Alert>
            )}
            
            <p className="mb-4 text-center">
              Nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại mật khẩu.
            </p>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
              </Form.Group>

              <div className="d-grid gap-2 mb-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || success}
                  className="py-2"
                >
                  {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                </Button>
              </div>
              
              <div className="text-center">
                <Link to="/login" className="text-decoration-none">Quay lại đăng nhập</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;