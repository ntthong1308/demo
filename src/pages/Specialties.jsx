import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Specialties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const specialtyCategories = [
    { id: 'all', name: 'Tất cả chuyên khoa' },
    { id: 'internal', name: 'Nội khoa' },
    { id: 'surgical', name: 'Ngoại khoa' },
    { id: 'diagnostic', name: 'Chẩn đoán' },
    { id: 'specialized', name: 'Chuyên khoa đặc biệt' }
  ];

  const medicalSpecialties = [
    {
      id: 1,
      name: 'Đa khoa',
      category: 'internal',
      description: 'Khám và điều trị tổng quát các bệnh lý thông thường, tư vấn sức khỏe toàn diện cho mọi lứa tuổi.',
      services: [
        'Khám sức khỏe tổng quát',
        'Tư vấn dinh dưỡng',
        'Theo dõi sức khỏe định kỳ',
        'Chăm sóc sức khỏe gia đình'
      ],
      doctors: 15,
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
      icon: 'bi bi-hospital',
      color: 'primary'
    },
    {
      id: 2,
      name: 'Tim mạch',
      category: 'internal',
      description: 'Chẩn đoán và điều trị các bệnh lý tim mạch, huyết áp, rối loạn nhịp tim và các bệnh mạch máu.',
      services: [
        'Siêu âm tim',
        'Điện tim',
        'Holter 24h',
        'Can thiệp tim mạch',
        'Phẫu thuật tim'
      ],
      doctors: 8,
      image: 'https://tamanhhospital.vn/wp-content/uploads/2021/03/benh-tim-mach-1.jpg',
      icon: 'bi bi-heart-pulse',
      color: 'danger'
    },
    {
      id: 3,
      name: 'Da liễu',
      category: 'specialized',
      description: 'Điều trị các bệnh lý về da, tóc, móng và các vấn đề thẩm mỹ da.',
      services: [
        'Điều trị mụn trứng cá',
        'Điều trị viêm da',
        'Laser điều trị',
        'Thẩm mỹ da',
        'Phẫu thuật da'
      ],
      doctors: 6,
      image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg',
      icon: 'bi bi-bandaid',
      color: 'warning'
    },
    {
      id: 4,
      name: 'Thần kinh',
      category: 'internal',
      description: 'Chẩn đoán và điều trị các bệnh lý thần kinh, não bộ, tủy sống và hệ thần kinh ngoại biên.',
      services: [
        'MRI não',
        'Điện não đồ',
        'Điều trị đột quỵ',
        'Điều trị động kinh',
        'Phục hồi chức năng'
      ],
      doctors: 7,
      image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg',
      icon: 'bi bi-activity',
      color: 'info'
    },
    {
      id: 5,
      name: 'Nhi khoa',
      category: 'specialized',
      description: 'Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 18 tuổi.',
      services: [
        'Khám sức khỏe định kỳ',
        'Tiêm chủng',
        'Điều trị bệnh nhiễm trùng',
        'Tư vấn dinh dưỡng trẻ em',
        'Phát triển tâm lý trẻ em'
      ],
      doctors: 10,
      image: 'https://www.benhvientwg.vn/Data/Sites/1/News/236/fotolia_49195925_subscription_monthly_xl,640,0,0,0.jpg',
      icon: 'bi bi-emoji-smile',
      color: 'success'
    },
    {
      id: 6,
      name: 'Chấn thương chỉnh hình',
      category: 'surgical',
      description: 'Điều trị các chấn thương và bệnh lý về xương, khớp, cơ, gân và dây chằng.',
      services: [
        'Phẫu thuật xương khớp',
        'Điều trị gãy xương',
        'Thay khớp nhân tạo',
        'Phục hồi chức năng',
        'Điều trị thoái hóa khớp'
      ],
      doctors: 9,
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
      icon: 'bi bi-bandaid-fill',
      color: 'secondary'
    },
    {
      id: 7,
      name: 'Tâm thần học',
      category: 'specialized',
      description: 'Chẩn đoán và điều trị các rối loạn tâm thần, tâm lý và hành vi.',
      services: [
        'Tư vấn tâm lý',
        'Điều trị trầm cảm',
        'Điều trị lo âu',
        'Trị liệu tâm lý',
        'Điều trị nghiện'
      ],
      doctors: 5,
      image: 'https://bvtt-tphcm.org.vn/wp-content/uploads/2017/07/bo-nao-1488160500546-534x369.jpeg',
      icon: 'bi bi-brain',
      color: 'purple'
    },
    {
      id: 8,
      name: 'Ung bướu',
      category: 'specialized',
      description: 'Chẩn đoán, điều trị và theo dõi các bệnh lý ung thư và khối u.',
      services: [
        'Tầm soát ung thư',
        'Hóa trị',
        'Xạ trị',
        'Phẫu thuật ung thư',
        'Chăm sóc giảm nhẹ'
      ],
      doctors: 6,
      image: 'https://bvxuyena.com.vn/wp-content/uploads/2025/04/thumbnail-6x4-khoa-ung-buou-scaled.jpg',
      icon: 'bi bi-shield-plus',
      color: 'dark'
    },
    {
      id: 9,
      name: 'Chẩn đoán hình ảnh',
      category: 'diagnostic',
      description: 'Thực hiện các xét nghiệm hình ảnh để chẩn đoán bệnh lý.',
      services: [
        'Chụp X-quang',
        'Siêu âm',
        'CT Scanner',
        'MRI',
        'PET-CT'
      ],
      doctors: 8,
      image: 'https://benhvienbinhthuan.vn/Uploads/images/KhoaPhong/khoa-chandoanhinhanh.jpg',
      icon: 'bi bi-camera',
      color: 'info'
    },
    {
      id: 10,
      name: 'Phụ khoa',
      category: 'specialized',
      description: 'Chăm sóc sức khỏe sinh sản và điều trị các bệnh lý phụ khoa.',
      services: [
        'Khám phụ khoa định kỳ',
        'Siêu âm thai',
        'Theo dõi thai kỳ',
        'Điều trị vô sinh',
        'Phẫu thuật phụ khoa'
      ],
      doctors: 7,
      image: 'https://bvdkgiadinh.com/wp-content/uploads/2023/11/ai-co-nguy-co-mac-cac-benh-phu-khoa-isofhcare-jpg_e2229860_efda_4642_95f7_0cce48b8f67c.jpg',
      icon: 'bi bi-gender-female',
      color: 'pink'
    },
    {
      id: 11,
      name: 'Mắt',
      category: 'specialized',
      description: 'Chẩn đoán và điều trị các bệnh lý về mắt và thị lực.',
      services: [
        'Khám mắt tổng quát',
        'Đo thị lực',
        'Điều trị cận thị',
        'Phẫu thuật mắt',
        'Điều trị glaucoma'
      ],
      doctors: 5,
      image: 'https://ykhoahopnhan.vn/wp-content/uploads/2019/05/examen-vista-1-1600x800.jpg',
      icon: 'bi bi-eye',
      color: 'primary'
    },
    {
      id: 12,
      name: 'Tai-Mũi-Họng',
      category: 'specialized',
      description: 'Điều trị các bệnh lý về tai, mũi, họng và đường hô hấp trên.',
      services: [
        'Điều trị viêm tai',
        'Phẫu thuật mũi',
        'Điều trị viêm họng',
        'Nội soi tai mũi họng',
        'Điều trị ngáy'
      ],
      doctors: 6,
      image: 'https://aih.com.vn/storage/chuyen-khoa/tai-mui-hong.jpg',
      icon: 'bi bi-ear',
      color: 'warning'
    },
    {
      id: 13,
      name: 'Nha khoa',
      category: 'specialized',
      description: 'Chăm sóc và điều trị các vấn đề về răng miệng.',
      services: [
        'Khám răng định kỳ',
        'Trám răng',
        'Nhổ răng',
        'Niềng răng',
        'Cấy ghép implant'
      ],
      doctors: 8,
      image: 'https://career.gpo.vn/uploads/images/237684310/images/gpo-bac-si-nha-khoa-nha-si-1.jpg',
      icon: 'bi bi-emoji-smile-fill',
      color: 'success'
    },
    {
      id: 14,
      name: 'Gây mê hồi sức',
      category: 'surgical',
      description: 'Gây mê và hồi sức trong các ca phẫu thuật và cấp cứu.',
      services: [
        'Gây mê phẫu thuật',
        'Hồi sức cấp cứu',
        'Điều trị đau',
        'Theo dõi hậu phẫu',
        'Chăm sóc tích cực'
      ],
      doctors: 4,
      image: 'https://benhvienphusanmekong.com/wp-content/uploads/2022/09/khoa-gay-me-hoi-suc.png',
      icon: 'bi bi-heart-pulse-fill',
      color: 'danger'
    }
  ];

  const filteredSpecialties = medicalSpecialties.filter(specialty => {
    const matchesSearch = specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         specialty.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || specialty.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalDoctors = medicalSpecialties.reduce((sum, specialty) => sum + specialty.doctors, 0);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="hero-title">CHUYÊN KHOA Y TẾ</h1>
              <p className="hero-subtitle">
                MediSched cung cấp đầy đủ các chuyên khoa y tế với đội ngũ bác sĩ chuyên môn cao, 
                trang thiết bị hiện đại và dịch vụ chăm sóc sức khỏe toàn diện.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Search and Filter */}
      <section className="py-4 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm chuyên khoa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-primary">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {specialtyCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </section>



      {/* Specialties Grid */}
      <section className="feature-section">
        <Container>

          
          <Row>
            {filteredSpecialties.map((specialty) => (
              <Col lg={4} md={6} className="mb-4" key={specialty.id}>
                <Card className="h-100 shadow-sm border-0 specialty-card">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={specialty.image} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="specialty-icon-overlay">
                      <i className={`${specialty.icon} text-${specialty.color}`}></i>
                    </div>
                  </div>
                  
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-3">
                      <Card.Title className="h5 mb-2">{specialty.name}</Card.Title>
                    </div>
                    
                    <Card.Text className="flex-grow-1 mb-3">
                      {specialty.description}
                    </Card.Text>
                    
                    <div className="mb-3">
                      <h6 className="mb-2">Dịch vụ chính:</h6>
                      <ul className="list-unstyled">
                        {specialty.services.slice(0, 3).map((service, index) => (
                          <li key={index} className="mb-1">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            <small>{service}</small>
                          </li>
                        ))}
                        {specialty.services.length > 3 && (
                          <li className="mb-1">
                            <small className="text-muted">
                              +{specialty.services.length - 3} dịch vụ khác
                            </small>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <Row>
                        <Col>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            as={Link} 
                            to={`/doctors?specialty=${specialty.name}`}
                            className="w-100 mb-2"
                          >
                            <i className="bi bi-people me-1"></i>
                            Xem bác sĩ
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {filteredSpecialties.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-search" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Không tìm thấy chuyên khoa phù hợp với từ khóa tìm kiếm.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="section-title">TẠI SAO CHỌN MEDISCHED?</h2>
          
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <i className="bi bi-award-fill"></i>
                </div>
                <h5>Bác sĩ giỏi</h5>
                <p>Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm, được đào tạo bài bản</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <i className="bi bi-gear-fill"></i>
                </div>
                <h5>Trang thiết bị hiện đại</h5>
                <p>Đầu tư trang thiết bị y tế hiện đại, công nghệ tiên tiến</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <i className="bi bi-clock-fill"></i>
                </div>
                <h5>Dịch vụ 24/7</h5>
                <p>Sẵn sàng phục vụ bệnh nhân 24/7, kể cả ngày lễ và cuối tuần</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h5>Chăm sóc tận tâm</h5>
                <p>Đặt sức khỏe bệnh nhân lên hàng đầu với dịch vụ chăm sóc tận tâm</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="feature-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h3>SẴN SÀNG CHĂM SÓC SỨC KHỎE CỦA BẠN</h3>
              <p className="lead mt-3 mb-4">
                Đặt lịch khám với các chuyên gia hàng đầu tại MediSched để được tư vấn 
                và điều trị chuyên nghiệp
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/book-appointment" className="btn btn-primary btn-lg">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Đặt lịch khám ngay
                </Link>
                <Link to="/doctors" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-people me-2"></i>
                  Tìm bác sĩ
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Specialties;