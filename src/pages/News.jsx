import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsCategories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'medical', name: 'Y học' },
    { id: 'technology', name: 'Công nghệ' },
    { id: 'health-tips', name: 'Mẹo sức khỏe' },
    { id: 'hospital-news', name: 'Tin bệnh viện' }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'Breakthrough in Heart Surgery: New Minimally Invasive Technique',
      excerpt: 'Bệnh viện MediSched đã thành công trong việc áp dụng kỹ thuật phẫu thuật tim ít xâm lấn mới, giúp bệnh nhân hồi phục nhanh chóng và giảm thiểu biến chứng.',
      content: 'Chi tiết về kỹ thuật phẫu thuật tim mới...',
      category: 'medical',
      categoryName: 'Y học',
      author: 'BS. Nguyễn Văn Minh',
      publishDate: '2025-06-10',
      readTime: '5 phút đọc',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
      featured: true
    },
    {
      id: 2,
      title: 'AI-Powered Diagnostic System Improves Cancer Detection',
      excerpt: 'Hệ thống chẩn đoán hỗ trợ bởi AI mới tại MediSched đã cải thiện đáng kể khả năng phát hiện sớm ung thư, với độ chính xác lên đến 95%.',
      content: 'Thông tin chi tiết về hệ thống AI...',
      category: 'technology',
      categoryName: 'Công nghệ',
      author: 'TS. Trần Thị Hương',
      publishDate: '2025-06-08',
      readTime: '7 phút đọc',
      image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg',
      featured: true
    },
    {
      id: 3,
      title: '10 Tips for Maintaining Heart Health',
      excerpt: 'Các chuyên gia tim mạch của MediSched chia sẻ 10 mẹo đơn giản nhưng hiệu quả để duy trì sức khỏe tim mạch tốt.',
      content: 'Danh sách 10 mẹo bảo vệ tim mạch...',
      category: 'health-tips',
      categoryName: 'Mẹo sức khỏe',
      author: 'BS. Lê Văn Hoàng',
      publishDate: '2025-06-05',
      readTime: '4 phút đọc',
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
      featured: false
    },
    {
      id: 4,
      title: 'MediSched Opens New Pediatric Wing',
      excerpt: 'Bệnh viện MediSched chính thức khai trương khoa Nhi mới với trang thiết bị hiện đại và đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm.',
      content: 'Thông tin về khoa Nhi mới...',
      category: 'hospital-news',
      categoryName: 'Tin bệnh viện',
      author: 'Phòng Truyền thông',
      publishDate: '2025-06-03',
      readTime: '3 phút đọc',
      image: 'https://images.pexels.com/photos/4021773/pexels-photo-4021773.jpeg',
      featured: false
    },
    {
      id: 5,
      title: 'Understanding Diabetes: Prevention and Management',
      excerpt: 'Hướng dẫn toàn diện về bệnh tiểu đường: cách phòng ngừa, quản lý và điều trị hiệu quả từ các chuyên gia nội tiết.',
      content: 'Thông tin chi tiết về tiểu đường...',
      category: 'health-tips',
      categoryName: 'Mẹo sức khỏe',
      author: 'BS. Phạm Thị Linh',
      publishDate: '2025-06-01',
      readTime: '8 phút đọc',
      image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg',
      featured: false
    },
    {
      id: 6,
      title: 'New MRI Technology Reduces Scan Time by 50%',
      excerpt: 'Công nghệ MRI mới tại MediSched giúp giảm thời gian chụp xuống còn một nửa, mang lại sự thoải mái hơn cho bệnh nhân.',
      content: 'Chi tiết về công nghệ MRI mới...',
      category: 'technology',
      categoryName: 'Công nghệ',
      author: 'Kỹ thuật viên trưởng',
      publishDate: '2025-05-28',
      readTime: '6 phút đọc',
      image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg',
      featured: false
    }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = newsArticles.filter(article => article.featured);
  const regularNews = filteredNews.filter(article => !article.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="hero-title">TIN TỨC Y TẾ</h1>
              <p className="hero-subtitle">
                Cập nhật những tin tức mới nhất về y học, công nghệ y tế và các mẹo chăm sóc sức khỏe 
                từ đội ngũ chuyên gia của MediSched.
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
                  placeholder="Tìm kiếm tin tức..."
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
                {newsCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="feature-section">
          <Container>
            <h2 className="section-title">TIN NỔI BẬT</h2>
            
            <Row>
              {featuredNews.map((article) => (
                <Col lg={6} className="mb-4" key={article.id}>
                  <Card className="h-100 shadow border-0 featured-news-card">
                    <Card.Img 
                      variant="top" 
                      src={article.image} 
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div className="mb-2">
                        <Badge bg="primary" className="me-2">{article.categoryName}</Badge>
                        <small className="text-muted">{article.readTime}</small>
                      </div>
                      
                      <Card.Title className="h4 mb-3">{article.title}</Card.Title>
                      <Card.Text className="flex-grow-1">{article.excerpt}</Card.Text>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <small className="text-muted">
                            <i className="bi bi-person me-1"></i>
                            {article.author}
                          </small>
                          <small className="text-muted">
                            <i className="bi bi-calendar me-1"></i>
                            {formatDate(article.publishDate)}
                          </small>
                        </div>
                        <Button variant="primary" as={Link} to={`/news/${article.id}`}>
                          Đọc thêm <i className="bi bi-arrow-right ms-1"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Regular News */}
      <section className="py-5">
        <Container>
          <h2 className="section-title">TIN TỨC MỚI NHẤT</h2>
          
          <Row>
            {regularNews.map((article) => (
              <Col lg={4} md={6} className="mb-4" key={article.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img 
                    variant="top" 
                    src={article.image} 
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <Badge bg="outline-primary" className="me-2">{article.categoryName}</Badge>
                      <small className="text-muted">{article.readTime}</small>
                    </div>
                    
                    <Card.Title className="h5 mb-3">{article.title}</Card.Title>
                    <Card.Text className="flex-grow-1">{article.excerpt}</Card.Text>
                    
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                          <i className="bi bi-person me-1"></i>
                          {article.author}
                        </small>
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          {formatDate(article.publishDate)}
                        </small>
                      </div>
                      <Button variant="outline-primary" size="sm" as={Link} to={`/news/${article.id}`}>
                        Đọc thêm
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {filteredNews.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-search" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <p className="mt-3">Không tìm thấy tin tức phù hợp với từ khóa tìm kiếm.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter Subscription */}
      <section className="stats-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h3>ĐĂNG KÝ NHẬN TIN TỨC</h3>
              <p className="lead mt-3 mb-4">
                Đăng ký để nhận những tin tức y tế mới nhất và các mẹo chăm sóc sức khỏe từ MediSched
              </p>
              
              <Form className="d-flex justify-content-center">
                <InputGroup style={{ maxWidth: '400px' }}>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email của bạn"
                  />
                  <Button variant="primary">
                    Đăng ký
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default News;