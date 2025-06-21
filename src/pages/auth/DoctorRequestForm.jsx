import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const DoctorRequestForm = () => {
  const { user, updateDoctorRequestStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialization: '',
    experience: ''
  });

  // Validation state
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Gọi API để gửi yêu cầu làm bác sĩ
      const response = await doctorService.submitDoctorRequest(formData);
      
      setSuccess('Đăng ký làm bác sĩ thành công! Yêu cầu của bạn đang chờ admin phê duyệt.');
      
      // Cập nhật trạng thái yêu cầu bác sĩ trong context
      if (response?.data) {
        updateDoctorRequestStatus(response.data);
      }
      
      // Sau 2 giây chuyển hướng đến trang hiển thị trạng thái
      setTimeout(() => {
        navigate('/doctor-request-status');
      }, 2000);
      
    } catch (err) {
      console.error("Error submitting doctor request:", err);
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error || 
                      'Có lỗi xảy ra khi gửi yêu cầu làm bác sĩ. Vui lòng thử lại sau.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-success text-white py-3">
              <h3 className="mb-0 text-center">Đăng ký làm Bác sĩ</h3>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <p className="text-muted mb-4">
                Vui lòng điền đầy đủ thông tin dưới đây để gửi yêu cầu trở thành bác sĩ trên hệ thống.
                Đơn đăng ký của bạn sẽ được xem xét và phê duyệt bởi quản trị viên.
              </p>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên đầy đủ <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập họ tên đầy đủ
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập email hợp lệ
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập số điện thoại
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Chuyên khoa <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    placeholder="Nội khoa, Ngoại khoa, ..."
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập chuyên khoa
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Kinh nghiệm <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    name="experience"
                    rows={3}
                    placeholder="5 năm kinh nghiệm tại Bệnh viện..."
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập kinh nghiệm
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/select-role')}
                    disabled={loading}
                  >
                    Quay lại
                  </Button>
                  <Button 
                    variant="success" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Đang gửi...
                      </>
                    ) : (
                      'Gửi yêu cầu'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorRequestForm;