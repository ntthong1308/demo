import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);
  
  const { login, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy địa chỉ trả về từ state (nếu có)
  const from = location.state?.from || '/';
  
  // Kiểm tra nếu đã đăng nhập thì chuyển hướng
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Xử lý timeout
  useEffect(() => {
    let timer;
    if (localLoading) {
      timer = setTimeout(() => {
        setLocalLoading(false);
        setFormError('Đăng nhập mất quá nhiều thời gian. Vui lòng thử lại.');
      }, 5000); // 5 giây timeout
    }
    return () => clearTimeout(timer);
  }, [localLoading]);

  // Hàm xử lý đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Kiểm tra form
    if (!email) {
      setFormError('Vui lòng nhập email hoặc tên đăng nhập');
      return;
    }
    if (!password) {
      setFormError('Vui lòng nhập mật khẩu');
      return;
    }
    
    setLocalLoading(true); // Bật trạng thái loading
    
    try {
      // Gọi hàm đăng nhập từ AuthContext
      await login(email, password);
      // Khi đăng nhập thành công, component sẽ được redirect qua useEffect
    } catch (error) {
      console.error('Login error:', error);
      setFormError(error.message || 'Đăng nhập không thành công. Vui lòng thử lại.');
      setLocalLoading(false); // Tắt trạng thái loading khi có lỗi
    }
  };

  // Hàm đăng nhập nhanh với tài khoản test
  const handleQuickLogin = async (username, pass) => {
    setEmail(username);
    setPassword(pass);
    
    // Tự động submit form sau khi điền thông tin
    try {
      setLocalLoading(true);
      await login(username, pass);
    } catch (error) {
      console.error('Quick login error:', error);
      setFormError(error.message || 'Đăng nhập không thành công. Vui lòng thử lại.');
      setLocalLoading(false);
    }
  };

  // Format ngày giờ UTC
  const formatCurrentDateTime = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <div className="form-container">
            <h4 className="form-title">ĐĂNG NHẬP</h4>
            
            {formError && <Alert variant="danger">{formError}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            
            {/* Hiển thị ngày giờ và tài khoản test cho môi trường phát triển */}
            {process.env.NODE_ENV === 'development' && (
              <Alert variant="info" className="mb-3">
                <small>
                  <strong>Test Mode</strong> - {formatCurrentDateTime()} UTC<br/>
                  <Button 
                    variant="link" 
                    className="p-0" 
                    onClick={() => setShowTestAccounts(!showTestAccounts)}
                  >
                    {showTestAccounts ? 'Ẩn tài khoản test' : 'Hiển thị tài khoản test'}
                  </Button>
                </small>
                
                {showTestAccounts && (
                  <Card className="mt-2 border-0">
                    <Card.Body className="p-2">
                      <Tabs defaultActiveKey="patient" className="mb-2 small">
                        <Tab eventKey="patient" title="Bệnh nhân">
                          <p className="mb-1 small">
                            <strong>Username:</strong> patient123<br/>
                            <strong>Password:</strong> Patient@123
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline-primary" 
                            className="w-100"
                            onClick={() => handleQuickLogin('patient123', 'Patient@123')}
                          >
                            Đăng nhập với tài khoản bệnh nhân
                          </Button>
                        </Tab>
                        <Tab eventKey="doctor" title="Bác sĩ">
                          <p className="mb-1 small">
                            <strong>Username:</strong> doctor456<br/>
                            <strong>Password:</strong> Doctor@456
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline-info" 
                            className="w-100"
                            onClick={() => handleQuickLogin('doctor456', 'Doctor@456')}
                          >
                            Đăng nhập với tài khoản bác sĩ
                          </Button>
                        </Tab>
                        <Tab eventKey="admin" title="Admin">
                          <p className="mb-1 small">
                            <strong>Username:</strong> admin789<br/>
                            <strong>Password:</strong> Admin@789
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline-dark" 
                            className="w-100"
                            onClick={() => handleQuickLogin('admin789', 'Admin@789')}
                          >
                            Đăng nhập với tài khoản admin
                          </Button>
                        </Tab>
                        <Tab eventKey="current" title="Hiện tại">
                          <p className="mb-1 small">
                            <strong>Username:</strong> ntthong1308<br/>
                            <strong>Password:</strong> password123
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline-secondary" 
                            className="w-100"
                            onClick={() => handleQuickLogin('ntthong1308', 'password123')}
                          >
                            Đăng nhập với tài khoản hiện tại
                          </Button>
                        </Tab>
                      </Tabs>
                    </Card.Body>
                  </Card>
                )}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Email hoặc Username</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-person"></i>
                  </span>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email hoặc username"
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

export default Login;