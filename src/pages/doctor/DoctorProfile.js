import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Badge, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

// Mock dữ liệu bác sĩ
const mockDoctor = {
  id: 1,
  firstName: 'Văn',
  lastName: 'Hoàng',
  title: 'BS',
  email: 'hoangvan@example.com',
  phone: '0987654321',
  specialties: ['Tim mạch', 'Nội khoa'],
  hospital: 'Bệnh viện Đại học Y Dược',
  address: '108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Hà Nội',
  experience: 15,
  education: [
    { year: '2008', degree: 'Bác sĩ Y khoa', institution: 'Đại học Y Hà Nội' },
    { year: '2012', degree: 'Thạc sĩ Y khoa', institution: 'Đại học Paris, Pháp' },
    { year: '2014', degree: 'Chuyên khoa I Tim mạch', institution: 'Đại học Y Hà Nội' }
  ],
  certifications: [
    { year: '2015', name: 'Chứng chỉ siêu âm tim mạch', institution: 'Hiệp hội Tim mạch Việt Nam' },
    { year: '2018', name: 'Chứng chỉ can thiệp tim mạch', institution: 'Hiệp hội Tim mạch Châu Âu' }
  ],
  bio: 'Bác sĩ Hoàng Văn có hơn 15 năm kinh nghiệm trong lĩnh vực tim mạch và nội khoa. Ông tốt nghiệp Đại học Y Hà Nội và đã hoàn thành chương trình đào tạo sau đại học tại Pháp.',
  rating: 4.9,
  availability: [
    { day: 'monday', start: '08:00', end: '12:00' },
    { day: 'monday', start: '14:00', end: '17:00' },
    { day: 'wednesday', start: '08:00', end: '12:00' },
    { day: 'wednesday', start: '14:00', end: '17:00' },
    { day: 'friday', start: '08:00', end: '12:00' }
  ],
  consultationFee: 500000,
  profilePicture: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg'
};

const DoctorProfile = () => {
  const { currentUser } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [availabilityInputs, setAvailabilityInputs] = useState([]);
  
  const weekdays = [
    { value: 'monday', label: 'Thứ 2' },
    { value: 'tuesday', label: 'Thứ 3' },
    { value: 'wednesday', label: 'Thứ 4' },
    { value: 'thursday', label: 'Thứ 5' },
    { value: 'friday', label: 'Thứ 6' },
    { value: 'saturday', label: 'Thứ 7' },
    { value: 'sunday', label: 'Chủ nhật' }
  ];
  
  useEffect(() => {
    // Giả lập API call để lấy thông tin bác sĩ
    setLoading(true);
    setTimeout(() => {
      setDoctor(mockDoctor);
      setFormData({
        firstName: mockDoctor.firstName,
        lastName: mockDoctor.lastName,
        title: mockDoctor.title,
        email: mockDoctor.email,
        phone: mockDoctor.phone,
        specialties: mockDoctor.specialties.join(', '),
        hospital: mockDoctor.hospital,
        address: mockDoctor.address,
        experience: mockDoctor.experience,
        bio: mockDoctor.bio,
        consultationFee: mockDoctor.consultationFee
      });
      setAvailabilityInputs(mockDoctor.availability);
      setLoading(false);
    }, 800);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAvailabilityChange = (index, field, value) => {
    const newAvailability = [...availabilityInputs];
    newAvailability[index] = {
      ...newAvailability[index],
      [field]: value
    };
    setAvailabilityInputs(newAvailability);
  };
  
  const addAvailabilitySlot = () => {
    setAvailabilityInputs([
      ...availabilityInputs,
      { day: 'monday', start: '08:00', end: '12:00' }
    ]);
  };
  
  const removeAvailabilitySlot = (index) => {
    const newAvailability = availabilityInputs.filter((_, i) => i !== index);
    setAvailabilityInputs(newAvailability);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    // Giả lập API call để cập nhật thông tin
    try {
      // Trong thực tế, chúng ta sẽ gửi formData và availabilityInputs đến API
      console.log('Updating doctor profile with data:', { ...formData, availability: availabilityInputs });
      
      // Giả lập thành công
      setTimeout(() => {
        const updatedDoctor = {
          ...doctor,
          firstName: formData.firstName,
          lastName: formData.lastName,
          title: formData.title,
          email: formData.email,
          phone: formData.phone,
          specialties: formData.specialties.split(',').map(s => s.trim()),
          hospital: formData.hospital,
          address: formData.address,
          experience: formData.experience,
          bio: formData.bio,
          consultationFee: formData.consultationFee,
          availability: availabilityInputs
        };
        
        setDoctor(updatedDoctor);
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
  
  const translateDay = (day) => {
    const dayMap = {
      'monday': 'Thứ 2',
      'tuesday': 'Thứ 3',
      'wednesday': 'Thứ 4',
      'thursday': 'Thứ 5',
      'friday': 'Thứ 6',
      'saturday': 'Thứ 7',
      'sunday': 'Chủ nhật'
    };
    return dayMap[day] || day;
  };
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2">Đang tải thông tin bác sĩ...</p>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <h2 className="mb-4">Hồ sơ bác sĩ</h2>
      
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
      
      <Row className="mb-4">
        <Col md={3} className="text-center mb-3 mb-md-0">
          <Card className="border-0">
            <Card.Body>
              <img 
                src={doctor.profilePicture} 
                alt={`${doctor.firstName} ${doctor.lastName}`}
                className="rounded-circle img-thumbnail"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <div className="mt-3">
                <h4>{doctor.title} {doctor.firstName} {doctor.lastName}</h4>
                <div className="mb-2">
                  {doctor.specialties.map((specialty, index) => (
                    <Badge bg="info" className="me-1" key={index}>{specialty}</Badge>
                  ))}
                </div>
                <p className="mb-1"><i className="bi bi-hospital me-2"></i>{doctor.hospital}</p>
                <p className="mb-1"><i className="bi bi-star-fill text-warning me-2"></i>{doctor.rating}/5.0</p>
                <p><i className="bi bi-calendar-check me-2"></i>{doctor.experience} năm kinh nghiệm</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={9}>
          <Tabs defaultActiveKey="personal" className="mb-3">
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
                        <Col md={3} className="fw-bold">Học hàm/học vị:</Col>
                        <Col md={9}>{doctor.title}</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Họ và tên:</Col>
                        <Col md={9}>{doctor.lastName} {doctor.firstName}</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Chuyên khoa:</Col>
                        <Col md={9}>
                          {doctor.specialties.join(', ')}
                        </Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Email:</Col>
                        <Col md={9}>{doctor.email}</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Số điện thoại:</Col>
                        <Col md={9}>{doctor.phone}</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Bệnh viện/Phòng khám:</Col>
                        <Col md={9}>{doctor.hospital}</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Địa chỉ:</Col>
                        <Col md={9}>{doctor.address}</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Số năm kinh nghiệm:</Col>
                        <Col md={9}>{doctor.experience} năm</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Phí tư vấn:</Col>
                        <Col md={9}>{doctor.consultationFee.toLocaleString('vi-VN')}đ</Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={3} className="fw-bold">Giới thiệu:</Col>
                        <Col md={9}>{doctor.bio}</Col>
                      </Row>
                    </>
                  ) : (
                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="title">
                            <Form.Label>Học hàm/học vị</Form.Label>
                            <Form.Select 
                              name="title" 
                              value={formData.title}
                              onChange={handleChange}
                              required
                            >
                              <option value="BS">BS</option>
                              <option value="ThS.BS">ThS.BS</option>
                              <option value="TS.BS">TS.BS</option>
                              <option value="PGS.TS.BS">PGS.TS.BS</option>
                              <option value="GS.TS.BS">GS.TS.BS</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      
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
                      
                      <Form.Group className="mb-3" controlId="specialties">
                        <Form.Label>Chuyên khoa (ngăn cách bởi dấu phẩy)</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="specialties" 
                          value={formData.specialties}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      
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
                      
                      <Form.Group className="mb-3" controlId="hospital">
                        <Form.Label>Bệnh viện/Phòng khám</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="hospital" 
                          value={formData.hospital}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="address" 
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="experience">
                            <Form.Label>Số năm kinh nghiệm</Form.Label>
                            <Form.Control 
                              type="number" 
                              name="experience" 
                              value={formData.experience}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="consultationFee">
                            <Form.Label>Phí tư vấn (VND)</Form.Label>
                            <Form.Control 
                              type="number" 
                              name="consultationFee" 
                              value={formData.consultationFee}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3" controlId="bio">
                        <Form.Label>Giới thiệu</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={3}
                          name="bio" 
                          value={formData.bio}
                          onChange={handleChange}
                          required
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
            
            {/* Tab lịch làm việc */}
            <Tab eventKey="availability" title={<span><i className="bi bi-calendar3 me-2"></i>Lịch khám bệnh</span>}>
              <Card className="shadow-sm">
                <Card.Body>
                  {!editMode ? (
                    <>
                      <div className="d-flex justify-content-end mb-3">
                        <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                          <i className="bi bi-pencil me-2"></i> Chỉnh sửa
                        </Button>
                      </div>
                      
                      <h5 className="mb-3">Lịch khám bệnh hiện tại</h5>
                      
                      <ListGroup className="mb-4">
                        {doctor.availability.map((slot, index) => (
                          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bi bi-calendar-day me-2"></i>
                              <strong>{translateDay(slot.day)}</strong>: {slot.start} - {slot.end}
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </>
                  ) : (
                    <Form onSubmit={handleSubmit}>
                      <h5 className="mb-3">Lịch khám bệnh</h5>
                      
                      {availabilityInputs.map((slot, index) => (
                        <Row key={index} className="mb-3 align-items-end">
                          <Col md={4}>
                            <Form.Group controlId={`day-${index}`}>
                              <Form.Label>Ngày trong tuần</Form.Label>
                              <Form.Select
                                value={slot.day}
                                onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                              >
                                {weekdays.map((day) => (
                                  <option key={day.value} value={day.value}>
                                    {day.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group controlId={`start-${index}`}>
                              <Form.Label>Giờ bắt đầu</Form.Label>
                              <Form.Control
                                type="time"
                                value={slot.start}
                                onChange={(e) => handleAvailabilityChange(index, 'start', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group controlId={`end-${index}`}>
                              <Form.Label>Giờ kết thúc</Form.Label>
                              <Form.Control
                                type="time"
                                value={slot.end}
                                onChange={(e) => handleAvailabilityChange(index, 'end', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <Button 
                              variant="outline-danger"
                              onClick={() => removeAvailabilitySlot(index)}
                              className="w-100"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      
                      <div className="mb-4">
                        <Button 
                          variant="outline-success" 
                          onClick={addAvailabilitySlot}
                          className="w-100"
                        >
                          <i className="bi bi-plus-circle me-2"></i> Thêm khung giờ
                        </Button>
                      </div>
                      
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
            
            {/* Tab học vấn và chứng chỉ */}
            <Tab eventKey="education" title={<span><i className="bi bi-mortarboard me-2"></i>Học vấn & Chứng chỉ</span>}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Học vấn</h5>
                  
                  <ListGroup className="mb-4">
                    {doctor.education.map((edu, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>{edu.degree}</strong>
                            <p className="text-muted mb-0">{edu.institution}</p>
                          </div>
                          <Badge bg="secondary">{edu.year}</Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  
                  <h5 className="mb-3">Chứng chỉ</h5>
                  
                  <ListGroup>
                    {doctor.certifications.map((cert, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>{cert.name}</strong>
                            <p className="text-muted mb-0">{cert.institution}</p>
                          </div>
                          <Badge bg="info">{cert.year}</Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
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
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorProfile;