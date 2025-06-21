import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

<<<<<<< HEAD
  const { login, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
=======
  const { login, error, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mặc định chuyển hướng tới trang trước đó nếu có
  const from = location.state?.from || '/';

  // Xử lý chuyển hướng dựa vào vai trò
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User authenticated:", user);
      
      // Chuyển hướng dựa vào vai trò
      if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (user.role === 'DOCTOR') {
        navigate('/doctor', { replace: true });
      } else if (user.role === 'PATIENT') {
        navigate('/patient', { replace: true });
      } else {
        // Nếu không xác định được vai trò, chuyển hướng đến from
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, navigate, from, user]);
>>>>>>> 1a644ab (1)

  useEffect(() => {
    let timer;
    if (localLoading) {
      timer = setTimeout(() => {
        setLocalLoading(false);
        setFormError('Đăng nhập mất quá nhiều thời gian. Vui lòng thử lại.');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [localLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!username) {
      setFormError('Vui lòng nhập tên đăng nhập');
      return;
    }
    if (!password) {
      setFormError('Vui lòng nhập mật khẩu');
      return;
    }

    setLocalLoading(true);

    try {
<<<<<<< HEAD
=======
      // Thêm console.log để debug
      console.log("Attempting to login with:", { username });
>>>>>>> 1a644ab (1)
      await login(username, password);
    } catch (error) {
      console.error('Login error:', error);
      setFormError(error.message || 'Đăng nhập không thành công. Vui lòng thử lại.');
      setLocalLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <div className="form-container">
            <h4 className="form-title">ĐĂNG NHẬP</h4>

            {formError && <Alert variant="danger">{formError}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-person"></i>
                  </span>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Mật khẩu</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-lock"></i>
                  </span>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    required
                  />
                </div>
              </Form.Group>

              <div className="d-grid gap-2 mb-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={localLoading}
                >
                  {localLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Đang đăng nhập...
                    </>
                  ) : 'Đăng nhập'}
                </Button>
              </div>

              <div className="text-center">
                <Link to="/forgot-password" className="text-decoration-none">Quên mật khẩu?</Link>
                <div className="mt-3">
                  Bạn chưa có tài khoản? <Link to="/register" className="text-decoration-none">Đăng ký ngay</Link>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 1a644ab (1)
