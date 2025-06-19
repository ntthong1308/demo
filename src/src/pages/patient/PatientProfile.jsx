import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, ListGroup, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

// Mock dữ liệu bệnh nhân
const mockPatient = {
  id: 1,
  firstName: 'Văn',
  lastName: 'Nguyễn',
  email: 'nguyenvan@example.com',
  phone: '0912345678',
  dateOfBirth: '1990-06-15',
  gender: 'male',
  address: '123 Đường Láng, Đống Đa, Hà Nội',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Hải sản'],
  chronicConditions: ['Huyết áp cao'],
  emergencyContact: {
    name: 'Nguyễn Thị Hương',
    relationship: 'Vợ',
    phone: '0987654321'
  },
  medicalHistory: [
    {
      id: 1,
      date: '2025-03-10',
      doctorName: 'BS. Hoàng Văn',
      diagnosis: 'Viêm họng cấp',
      treatment: 'Kháng sinh, nghỉ ngơi, uống nhiều nước',
      notes: 'Tái khám sau 1 tuần nếu triệu chứng không giảm'
    },
    {
      id: 2,
      date: '2024-12-05',
      doctorName: 'BS. Nguyễn Thị Hương',
      diagnosis: 'Viêm da dị ứng',
      treatment: 'Kem bôi, thuốc kháng histamine',
      notes: 'Tránh tiếp xúc với chất gây dị ứng'
    }
  ],
  insurance: {
    provider: 'Bảo hiểm Y tế Việt Nam',
    policyNumber: 'BHYT12345678',
    expiryDate: '2026-12-31',
    coverage: 'Toàn phần'
  }
};

const PatientProfile = () => {
  const { currentUser } = useAuth();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    // Giả lập API call để lấy thông tin bệnh nhân
    setLoading(true);
    setTimeout(() => {
      setPatient(mockPatient);
      setFormData({
        firstName: mockPatient.firstName,
        lastName: mockPatient.lastName,
        email: mockPatient.email,
        phone: mockPatient.phone,
        dateOfBirth: mockPatient.dateOfBirth,
        gender: mockPatient.gender,
        address: mockPatient.address,
        bloodType: mockPatient.bloodType,
        allergies: mockPatient.allergies.join(', '),
        chronicConditions: mockPatient.chronicConditions.join(', '),
        emergencyContactName: mockPatient.emergencyContact.name,
        emergencyContactRelationship: mockPatient.emergencyContact.relationship,
        emergencyContactPhone: mockPatient.emergencyContact.phone,
        insuranceProvider: mockPatient.insurance.provider,
        insurancePolicyNumber: mockPatient.insurance.policyNumber,
        insuranceExpiryDate: mockPatient.insurance.expiryDate
      });
      setLoading(false);
    }, 800);
  }, [currentUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    // Giả lập API call để cập nhật thông tin
    try {
      // Trong thực tế, chúng ta sẽ gửi formData đến API
      console.log('Updating profile with data:', formData);
      
      // Giả lập thành công
      setTimeout(() => {
        const updatedPatient = {
          ...patient,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
          bloodType: formData.bloodType,
          allergies: formData.allergies ? formData.allergies.split(',').map(item => item.trim()) : [],
          chronicConditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(item => item.trim()) : [],
          emergencyContact: {
            name: formData.emergencyContactName,
            relationship: formData.emergencyContactRelationship,
            phone: formData.emergencyContactPhone
          },
          insurance: {
            ...patient.insurance,
            provider: formData.insuranceProvider,
            policyNumber: formData.insurancePolicyNumber,
            expiryDate: formData.insuranceExpiryDate
          }
        };
        
        setPatient(updatedPatient);
        setSuccessMessage('Cập nhật thông tin thành công!');
        setEditMode(false);
        
        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }, 800);
    } catch (error) {
      setErrorMessage('Đã có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại sau.');
    }
  };
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2">Đang tải thông tin bệnh nhân...</p>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <h2 className="mb-4">Hồ sơ bệnh nhân</h2>
      
      {successMessage && (
        <Alert variant="success" className="mb-4">
          <i className="bi bi-check-circle-fill me-2"></i>
          {successMessage}
        </Alert>
      )}
      
      {errorMessage && (
        <Alert variant="danger" className="mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {errorMessage}
        </Alert>
      )}
      
      <Tabs defaultActiveKey="personal" className="mb-4">
        {/* Tab thông tin cá nhân */}
        <Tab eventKey="personal" title={<span><i className="bi bi-person me-2"></i>Thông tin cá nhân</span>}>
          <Card className="shadow-sm">
            <Card.Body>
              {!editMode ? (
                <>
                  <div className="d-flex justify-content-end mb-3">
                    <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                      <i className="bi bi-pencil me-2"></i> Chỉnh sửa
                    </Button>
                  </div>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Họ và tên:</Col>
                    <Col md={9}>{patient.lastName} {patient.firstName}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Ngày sinh:</Col>
                    <Col md={9}>{new Date(patient.dateOfBirth).toLocaleDateString('vi-VN')}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Giới tính:</Col>
                    <Col md={9}>{patient.gender === 'male' ? 'Nam' : 'Nữ'}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Email:</Col>
                    <Col md={9}>{patient.email}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Số điện thoại:</Col>
                    <Col md={9}>{patient.phone}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Địa chỉ:</Col>
                    <Col md={9}>{patient.address}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Nhóm máu:</Col>
                    <Col md={9}>{patient.bloodType}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Dị ứng:</Col>
                    <Col md={9}>
                      {patient.allergies.length > 0 ? (
                        patient.allergies.map((allergy, idx) => (
                          <Badge bg="danger" className="me-1" key={idx}>{allergy}</Badge>
                        ))
                      ) : (
                        <span className="text-muted">Không có thông tin</span>
                      )}
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Bệnh mãn tính:</Col>
                    <Col md={9}>
                      {patient.chronicConditions.length > 0 ? (
                        patient.chronicConditions.map((condition, idx) => (
                          <Badge bg="warning" text="dark" className="me-1" key={idx}>{condition}</Badge>
                        ))
                      ) : (
                        <span className="text-muted">Không có thông tin</span>
                      )}
                    </Col>
                  </Row>
                  
                  <h5 className="mt-4 mb-3">Thông tin liên hệ khẩn cấp</h5>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Người liên hệ:</Col>
                    <Col md={9}>{patient.emergencyContact.name}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Quan hệ:</Col>
                    <Col md={9}>{patient.emergencyContact.relationship}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Số điện thoại:</Col>
                    <Col md={9}>{patient.emergencyContact.phone}</Col>
                  </Row>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <h5 className="mb-3">Thông tin cá nhân</h5>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Label>Họ</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="lastName" 
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="firstName" 
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="dateOfBirth">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="dateOfBirth" 
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="gender">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select 
                          name="gender" 
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="address" 
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="bloodType">
                        <Form.Label>Nhóm máu</Form.Label>
                        <Form.Select 
                          name="bloodType" 
                          value={formData.bloodType}
                          onChange={handleChange}
                        >
                          <option value="">-- Chọn nhóm máu --</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="allergies">
                    <Form.Label>Dị ứng (ngăn cách bởi dấu phẩy)</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="allergies" 
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="Ví dụ: Penicillin, Hải sản"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="chronicConditions">
                    <Form.Label>Bệnh mãn tính (ngăn cách bởi dấu phẩy)</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="chronicConditions" 
                      value={formData.chronicConditions}
                      onChange={handleChange}
                      placeholder="Ví dụ: Tiểu đường, Huyết áp cao"
                    />
                  </Form.Group>
                  
                  <h5 className="mt-4 mb-3">Thông tin liên hệ khẩn cấp</h5>
                  
                  <Form.Group className="mb-3" controlId="emergencyContactName">
                    <Form.Label>Tên người liên hệ</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="emergencyContactName" 
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="emergencyContactRelationship">
                        <Form.Label>Mối quan hệ</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="emergencyContactRelationship" 
                          value={formData.emergencyContactRelationship}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="emergencyContactPhone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="emergencyContactPhone" 
                          value={formData.emergencyContactPhone}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-flex justify-content-end mt-4">
                    <Button 
                      variant="secondary" 
                      className="me-2" 
                      onClick={() => setEditMode(false)}
                    >
                      Hủy
                    </Button>
                    <Button variant="primary" type="submit">
                      Lưu thay đổi
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Tab>
        
        {/* Tab thông tin bảo hiểm */}
        <Tab eventKey="insurance" title={<span><i className="bi bi-shield-check me-2"></i>Thông tin bảo hiểm</span>}>
          <Card className="shadow-sm">
            <Card.Body>
              {!editMode ? (
                <>
                  <div className="d-flex justify-content-end mb-3">
                    <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                      <i className="bi bi-pencil me-2"></i> Chỉnh sửa
                    </Button>
                  </div>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Nhà cung cấp:</Col>
                    <Col md={9}>{patient.insurance.provider}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Số thẻ bảo hiểm:</Col>
                    <Col md={9}>{patient.insurance.policyNumber}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Ngày hết hạn:</Col>
                    <Col md={9}>{new Date(patient.insurance.expiryDate).toLocaleDateString('vi-VN')}</Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={3} className="fw-bold">Phạm vi bảo hiểm:</Col>
                    <Col md={9}>{patient.insurance.coverage}</Col>
                  </Row>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="insuranceProvider">
                    <Form.Label>Nhà cung cấp bảo hiểm</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="insuranceProvider" 
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="insurancePolicyNumber">
                    <Form.Label>Số thẻ bảo hiểm</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="insurancePolicyNumber" 
                      value={formData.insurancePolicyNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="insuranceExpiryDate">
                    <Form.Label>Ngày hết hạn</Form.Label>
                    <Form.Control 
                      type="date" 
                      name="insuranceExpiryDate" 
                      value={formData.insuranceExpiryDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <div className="d-flex justify-content-end mt-4">
                    <Button 
                      variant="secondary" 
                      className="me-2" 
                      onClick={() => setEditMode(false)}
                    >
                      Hủy
                    </Button>
                    <Button variant="primary" type="submit">
                      Lưu thay đổi
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Tab>
        
        {/* Tab lịch sử khám bệnh */}
        <Tab eventKey="history" title={<span><i className="bi bi-clipboard2-pulse me-2"></i>Lịch sử khám bệnh</span>}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Lịch sử bệnh án</h5>
              
              {patient.medicalHistory.length > 0 ? (
                <ListGroup>
                  {patient.medicalHistory.map((record) => (
                    <ListGroup.Item key={record.id} className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <h6 className="mb-0">
                          <i className="bi bi-calendar3 me-2"></i>
                          {new Date(record.date).toLocaleDateString('vi-VN')}
                        </h6>
                        <Badge bg="info" className="ms-3">{record.doctorName}</Badge>
                      </div>
                      <Row>
                        <Col md={3} className="fw-bold">Chẩn đoán:</Col>
                        <Col md={9}>{record.diagnosis}</Col>
                      </Row>
                      <Row>
                        <Col md={3} className="fw-bold">Điều trị:</Col>
                        <Col md={9}>{record.treatment}</Col>
                      </Row>
                      {record.notes && (
                        <Row>
                          <Col md={3} className="fw-bold">Ghi chú:</Col>
                          <Col md={9}>{record.notes}</Col>
                        </Row>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-clipboard-x" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
                  <p className="mt-3">Chưa có lịch sử khám bệnh nào.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
        
        {/* Tab bảo mật */}
        <Tab eventKey="security" title={<span><i className="bi bi-shield-lock me-2"></i>Bảo mật</span>}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Đổi mật khẩu</h5>
              
              <Form>
                <Form.Group className="mb-3" controlId="currentPassword">
                  <Form.Label>Mật khẩu hiện tại</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label>Mật khẩu mới</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Nhập mật khẩu mới"
                  />
                  <Form.Text className="text-muted">
                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" type="submit">
                    Cập nhật mật khẩu
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default PatientProfile;