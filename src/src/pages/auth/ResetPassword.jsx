import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { resetPassword, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Kiểm tra mật khẩu
    if (newPassword !== confirmPassword) {
      setFormError('Mật khẩu nhập lại không khớp');
      return;
    }
    
    if (newPassword.length < 6) {
      setFormError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    const result = await resetPassword(token, newPassword);
    if (result.success) {
      setSuccess(true);
      // Chuyển hướng đến trang đăng nhập sau 3 giây
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <div className="form-container">
            <h4 className="form-title">ĐẶT LẠI MẬT KHẨU</h4>
            
            {formError && <Alert variant="danger">{formError}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Đặt lại mật khẩu thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập sau một vài giây...
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Mật khẩu mới</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-lock"></i>
                  </span>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-lock"></i>
                  </span>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
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
                  {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
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

export default ResetPassword;