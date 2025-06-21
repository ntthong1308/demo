<<<<<<< HEAD
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const ManagePatients = () => {
  return (
    <Container className="py-4">
      <h2>Manage Patients</h2>
      <Card className="mt-4">
        <Card.Body>
          <p>This feature is under development.</p>
          <p>You will be able to view and manage patient accounts here soon.</p>
        </Card.Body>
      </Card>
    </Container>
=======
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form, Spinner, Alert, Badge, InputGroup } from 'react-bootstrap';
import { patientService } from '../../services/api';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit'
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, [currentPage]);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real API, you would pass page and size parameters
      const response = await patientService.getAll();
      setPatients(response.data);
      // If your API supports pagination:
      // setTotalPages(response.data.totalPages);
      console.log('Patients fetched:', response.data);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
      setError('Không thể tải danh sách bệnh nhân. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewPatient = async (patientId) => {
    try {
      setLoading(true);
      const response = await patientService.getById(patientId);
      setSelectedPatient(response.data);
      setModalMode('view');
      setShowModal(true);
    } catch (err) {
      console.error('Failed to fetch patient details:', err);
      setError('Không thể tải thông tin bệnh nhân. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await patientService.update(selectedPatient.id, selectedPatient);
      // Update patient in the list
      setPatients(patients.map(p => p.id === selectedPatient.id ? response.data : p));
      setSuccess('Thông tin bệnh nhân đã được cập nhật thành công!');
      
      // Close modal after a delay
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to update patient:', err);
      setError('Không thể cập nhật thông tin bệnh nhân. Vui lòng thử lại sau.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bệnh nhân này không?')) {
      return;
    }

    try {
      await patientService.delete(patientId);
      // Remove patient from the list
      setPatients(patients.filter(p => p.id !== patientId));
      setSuccess('Đã xóa bệnh nhân thành công.');
    } catch (err) {
      console.error('Failed to delete patient:', err);
      setError('Không thể xóa bệnh nhân. Vui lòng thử lại sau.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPatient({
      ...selectedPatient,
      [name]: value
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const searchString = searchTerm.toLowerCase();
    return (
      (patient.fullName && patient.fullName.toLowerCase().includes(searchString)) ||
      (patient.email && patient.email.toLowerCase().includes(searchString)) ||
      (patient.phoneNumber && patient.phoneNumber.includes(searchString))
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge bg="success">Hoạt động</Badge>;
      case 'INACTIVE':
        return <Badge bg="secondary">Không hoạt động</Badge>;
      default:
        return <Badge bg="info">{status || 'Không xác định'}</Badge>;
    }
  };

  return (
    <div className="patients-management">
      <h2 className="page-title">Quản lý bệnh nhân</h2>
      
      {error && !loading && (
        <Alert variant="danger" className="mt-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
        </Alert>
      )}
      
      {success && !loading && (
        <Alert variant="success" className="mt-3">
          <i className="bi bi-check-circle-fill me-2"></i> {success}
        </Alert>
      )}
      
      <Card className="shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">Danh sách bệnh nhân</h5>
          </div>
          <div className="d-flex">
            <InputGroup style={{ width: '300px' }} className="me-2">
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Tìm kiếm bệnh nhân..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
            <Button 
              variant="outline-secondary"
              onClick={fetchPatients}
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise"></i> Làm mới
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body>
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Đang tải dữ liệu...</p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="text-center p-5">
              <i className="bi bi-person-x fs-1 text-muted"></i>
              <p className="mt-3">Không tìm thấy bệnh nhân nào.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Ngày sinh</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.fullName || `${patient.firstName || ''} ${patient.lastName || ''}`}</td>
                      <td>{patient.email}</td>
                      <td>{patient.phoneNumber}</td>
                      <td>{formatDate(patient.dateOfBirth || patient.birthDate)}</td>
                      <td>{getStatusBadge(patient.status)}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-1"
                          onClick={() => handleViewPatient(patient.id)}
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="me-1"
                          onClick={() => handleEditPatient(patient)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
        
        {totalPages > 1 && (
          <Card.Footer>
            <div className="d-flex justify-content-center">
              <Button 
                variant="outline-primary" 
                className="me-2" 
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <i className="bi bi-chevron-left"></i> Trang trước
              </Button>
              <span className="mx-2 align-self-center">
                Trang {currentPage} / {totalPages}
              </span>
              <Button 
                variant="outline-primary" 
                disabled={currentPage === totalPages || loading}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Trang sau <i className="bi bi-chevron-right"></i>
              </Button>
            </div>
          </Card.Footer>
        )}
      </Card>

      {/* Modal for viewing/editing patient */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'view' ? 'Thông tin bệnh nhân' : 'Chỉnh sửa thông tin bệnh nhân'}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {success && (
            <Alert variant="success">
              <i className="bi bi-check-circle-fill me-2"></i>
              {success}
            </Alert>
          )}
          
          {error && (
            <Alert variant="danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}
          
          {selectedPatient && (
            <Form>
              <div className="row mb-4">
                <div className="col-md-3 text-center">
                  {selectedPatient.avatar ? (
                    <img
                      src={selectedPatient.avatar}
                      alt="Patient"
                      className="rounded-circle img-thumbnail mb-2"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-2"
                      style={{ width: '120px', height: '120px' }}
                    >
                      <i className="bi bi-person-circle text-secondary" style={{ fontSize: '3rem' }}></i>
                    </div>
                  )}
                  {modalMode === 'edit' && (
                    <div className="mt-2">
                      <Button variant="outline-secondary" size="sm" disabled={true}>
                        <i className="bi bi-upload"></i> Đổi ảnh
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="col-md-9">
                  <Form.Group className="mb-3">
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={selectedPatient.fullName || `${selectedPatient.firstName || ''} ${selectedPatient.lastName || ''}`}
                      onChange={handleInputChange}
                      disabled={modalMode === 'view'}
                    />
                  </Form.Group>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={selectedPatient.email || ''}
                          onChange={handleInputChange}
                          disabled={modalMode === 'view'}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          value={selectedPatient.phoneNumber || ''}
                          onChange={handleInputChange}
                          disabled={modalMode === 'view'}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={selectedPatient.dateOfBirth || selectedPatient.birthDate || ''}
                      onChange={handleInputChange}
                      disabled={modalMode === 'view'}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Select
                      name="gender"
                      value={selectedPatient.gender || ''}
                      onChange={handleInputChange}
                      disabled={modalMode === 'view'}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                      <option value="OTHER">Khác</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={selectedPatient.address || ''}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  name="status"
                  value={selectedPatient.status || 'ACTIVE'}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                >
                  <option value="ACTIVE">Hoạt động</option>
                  <option value="INACTIVE">Không hoạt động</option>
                </Form.Select>
              </Form.Group>
              
              <h5 className="mt-4 mb-3 border-bottom pb-2">Lịch sử khám bệnh</h5>
              
              {/* This would show the patient's appointment history */}
              {selectedPatient.appointments && selectedPatient.appointments.length > 0 ? (
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ngày khám</th>
                      <th>Bác sĩ</th>
                      <th>Chuyên khoa</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPatient.appointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{formatDate(appointment.appointmentDate)}</td>
                        <td>{appointment.doctorName}</td>
                        <td>{appointment.specialty}</td>
                        <td>{appointment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">Bệnh nhân chưa có lịch sử khám bệnh nào.</p>
              )}
            </Form>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          {modalMode === 'view' ? (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
              <Button variant="primary" onClick={() => setModalMode('edit')}>
                <i className="bi bi-pencil me-1"></i> Chỉnh sửa
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)} disabled={processing}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleUpdatePatient} disabled={processing}>
                {processing ? (
                  <><Spinner animation="border" size="sm" /> Đang xử lý...</>
                ) : (
                  <><i className="bi bi-check-lg me-1"></i> Lưu thay đổi</>
                )}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
>>>>>>> 1a644ab (1)
  );
};

export default ManagePatients;