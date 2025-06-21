<<<<<<< HEAD
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const DoctorRequests = () => {
  return (
    <Container className="py-4">
      <h2>Doctor Applications</h2>
      <Card className="mt-4">
        <Card.Body>
          <p>This feature is under development.</p>
          <p>You will be able to review and approve doctor applications here soon.</p>
        </Card.Body>
      </Card>
    </Container>
=======
import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Form, Spinner, Card, Alert } from 'react-bootstrap';
import { doctorService } from '../../services/api';

const DoctorRequests = () => {
  const [doctorRequests, setDoctorRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [processingAction, setProcessingAction] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Fetch doctor requests when component mounts
  useEffect(() => {
    fetchDoctorRequests();
  }, []);

  const fetchDoctorRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await doctorService.getAllRequests();
      setDoctorRequests(response.data);
      console.log('Doctor requests fetched:', response.data);
    } catch (err) {
      console.error('Failed to fetch doctor requests:', err);
      setError('Không thể tải danh sách yêu cầu bác sĩ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
    setRejectReason('');
  };

  const handleApproveRequest = async () => {
    if (!selectedRequest) return;
    
    setProcessingAction(true);
    setActionSuccess(null);
    
    try {
      await doctorService.decideRequest(selectedRequest.id, 'APPROVED');
      
      // Update local state to reflect the change
      setDoctorRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === selectedRequest.id ? { ...req, status: 'APPROVED' } : req
        )
      );
      
      setActionSuccess('Yêu cầu bác sĩ đã được phê duyệt thành công!');
      setTimeout(() => handleCloseModal(), 1500);
    } catch (err) {
      console.error('Failed to approve doctor request:', err);
      setError('Không thể phê duyệt yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setProcessingAction(false);
    }
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest || !rejectReason.trim()) {
      setError('Vui lòng nhập lý do từ chối.');
      return;
    }
    
    setProcessingAction(true);
    setActionSuccess(null);
    setError(null);
    
    try {
      await doctorService.decideRequest(
        selectedRequest.id, 
        'REJECTED', 
        rejectReason
      );
      
      // Update local state
      setDoctorRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === selectedRequest.id ? { ...req, status: 'REJECTED' } : req
        )
      );
      
      setActionSuccess('Yêu cầu bác sĩ đã bị từ chối.');
      setTimeout(() => handleCloseModal(), 1500);
    } catch (err) {
      console.error('Failed to reject doctor request:', err);
      setError('Không thể từ chối yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setProcessingAction(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setRejectReason('');
    setActionSuccess(null);
    setError(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <Badge bg="warning">Chờ duyệt</Badge>;
      case 'APPROVED':
        return <Badge bg="success">Đã duyệt</Badge>;
      case 'REJECTED':
        return <Badge bg="danger">Từ chối</Badge>;
      default:
        return <Badge bg="secondary">Không xác định</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="doctor-requests">
      <h2 className="page-title">Quản lý yêu cầu bác sĩ</h2>
      
      {error && !loading && (
        <Alert variant="danger" className="mt-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
        </Alert>
      )}
      
      <Card className="shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">Danh sách yêu cầu</h5>
          </div>
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={fetchDoctorRequests}
            disabled={loading}
          >
            {loading ? (
              <><Spinner animation="border" size="sm" /> Đang tải...</>
            ) : (
              <><i className="bi bi-arrow-clockwise"></i> Làm mới</>
            )}
          </Button>
        </Card.Header>
        
        <Card.Body>
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Đang tải dữ liệu...</p>
            </div>
          ) : doctorRequests.length === 0 ? (
            <div className="text-center p-5">
              <i className="bi bi-inbox fs-1 text-muted"></i>
              <p className="mt-3">Không có yêu cầu bác sĩ nào.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Chuyên khoa</th>
                    <th>Kinh nghiệm</th>
                    <th>Ngày yêu cầu</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.fullName || `${request.firstName || ''} ${request.lastName || ''}`}</td>
                      <td>{request.email}</td>
                      <td>{request.specialty || request.speciality}</td>
                      <td>{request.experience} năm</td>
                      <td>{formatDate(request.createdAt)}</td>
                      <td>{getStatusBadge(request.status)}</td>
                      <td>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleViewRequest(request)}
                        >
                          <i className="bi bi-eye me-1"></i> Chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal for viewing and approving/rejecting requests */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết yêu cầu bác sĩ</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {selectedRequest && (
            <>
              {actionSuccess && (
                <Alert variant="success" className="mb-4">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {actionSuccess}
                </Alert>
              )}
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </Alert>
              )}
              
              <div className="row mb-4">
                <div className="col-md-3 text-center">
                  {selectedRequest.avatar ? (
                    <img 
                      src={selectedRequest.avatar} 
                      alt="Doctor" 
                      className="rounded-circle img-thumbnail" 
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div 
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                      style={{ width: '120px', height: '120px' }}
                    >
                      <i className="bi bi-person-circle text-secondary" style={{ fontSize: '3rem' }}></i>
                    </div>
                  )}
                </div>
                
                <div className="col-md-9">
                  <h4>{selectedRequest.fullName || `${selectedRequest.firstName || ''} ${selectedRequest.lastName || ''}`}</h4>
                  <p className="mb-1">
                    <i className="bi bi-envelope-fill me-2 text-primary"></i>
                    {selectedRequest.email}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-telephone-fill me-2 text-primary"></i>
                    {selectedRequest.phoneNumber}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-briefcase-fill me-2 text-primary"></i>
                    {selectedRequest.specialty || selectedRequest.speciality}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-calendar me-2 text-primary"></i>
                    {selectedRequest.experience} năm kinh nghiệm
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-clock-history me-2 text-primary"></i>
                    Yêu cầu ngày: {formatDate(selectedRequest.createdAt)}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-tag-fill me-2 text-primary"></i>
                    Trạng thái: {getStatusBadge(selectedRequest.status)}
                  </p>
                </div>
              </div>

              {/* Additional information */}
              <h5 className="border-bottom pb-2 mb-3">Thông tin chi tiết</h5>
              <p className="mb-4">{selectedRequest.description || selectedRequest.bio || 'Không có thông tin chi tiết.'}</p>

              {/* Education & Certifications */}
              <h5 className="border-bottom pb-2 mb-3">Bằng cấp & Chứng chỉ</h5>
              {selectedRequest.certificates && selectedRequest.certificates.length > 0 ? (
                <ul className="list-unstyled">
                  {selectedRequest.certificates.map((cert, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-award me-2 text-primary"></i>
                      {cert.name || cert}
                      {cert.year && <span className="text-muted ms-2">({cert.year})</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Không có thông tin về bằng cấp và chứng chỉ.</p>
              )}

              {/* Rejection reason field - only visible for PENDING requests */}
              {selectedRequest.status === 'PENDING' && (
                <div className="mt-4">
                  <Form.Group>
                    <Form.Label>Lý do từ chối (bắt buộc nếu từ chối)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Nhập lý do từ chối yêu cầu..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                  </Form.Group>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={processingAction}>
            Đóng
          </Button>
          
          {selectedRequest && selectedRequest.status === 'PENDING' && (
            <>
              <Button 
                variant="danger" 
                onClick={handleRejectRequest} 
                disabled={processingAction}
              >
                {processingAction ? (
                  <><Spinner animation="border" size="sm" /> Đang xử lý...</>
                ) : (
                  <><i className="bi bi-x-circle me-1"></i> Từ chối</>
                )}
              </Button>
              
              <Button 
                variant="success" 
                onClick={handleApproveRequest} 
                disabled={processingAction}
              >
                {processingAction ? (
                  <><Spinner animation="border" size="sm" /> Đang xử lý...</>
                ) : (
                  <><i className="bi bi-check-circle me-1"></i> Phê duyệt</>
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

export default DoctorRequests;