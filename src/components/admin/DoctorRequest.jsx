import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { doctorService } from '../../services/api';

const DoctorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Lấy tất cả các yêu cầu
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await doctorService.getAllDoctorRequests();
      setRequests(response.data);
    } catch (err) {
      console.error("Error fetching doctor requests:", err);
      setError('Không thể lấy danh sách yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Mở modal xem chi tiết
  const handleViewRequest = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  // Phê duyệt yêu cầu
  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await doctorService.approveDoctorRequest(currentRequest.id);
      // Cập nhật lại danh sách
      await fetchRequests();
      setShowModal(false);
    } catch (err) {
      console.error("Error approving doctor request:", err);
      setError('Không thể phê duyệt yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setActionLoading(false);
    }
  };

  // Từ chối yêu cầu
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Vui lòng nhập lý do từ chối.');
      return;
    }

    try {
      setActionLoading(true);
      await doctorService.rejectDoctorRequest(currentRequest.id, { rejectionReason });
      // Cập nhật lại danh sách
      await fetchRequests();
      setShowModal(false);
      setRejectionReason('');
    } catch (err) {
      console.error("Error rejecting doctor request:", err);
      setError('Không thể từ chối yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setActionLoading(false);
    }
  };

  // Hiển thị trạng thái
  const renderStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return <Badge bg="warning">Đang chờ phê duyệt</Badge>;
      case 'APPROVED':
        return <Badge bg="success">Đã phê duyệt</Badge>;
      case 'REJECTED':
        return <Badge bg="danger">Đã từ chối</Badge>;
      default:
        return <Badge bg="secondary">Không xác định</Badge>;
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Yêu cầu đăng ký Bác sĩ</h4>
          <Button variant="outline-primary" size="sm" onClick={fetchRequests} disabled={loading}>
            <i className="bi bi-arrow-clockwise me-1"></i> Làm mới
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Đang tải danh sách yêu cầu...</p>
            </div>
          ) : (
            <>
              {requests.length === 0 ? (
                <Alert variant="info">Không có yêu cầu đăng ký bác sĩ nào.</Alert>
              ) : (
                <div className="table-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Mã</th>
                        <th>Họ tên</th>
                        <th>Chuyên khoa</th>
                        <th>Email</th>
                        <th>Ngày đăng ký</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => (
                        <tr key={request.id}>
                          <td>#{request.id}</td>
                          <td>{request.fullName}</td>
                          <td>{request.specialization}</td>
                          <td>{request.email}</td>
                          <td>{new Date(request.createdAt).toLocaleString()}</td>
                          <td>{renderStatus(request.status)}</td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => handleViewRequest(request)}
                            >
                              <i className="bi bi-eye-fill"></i> Xem
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal xem chi tiết yêu cầu */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Chi tiết yêu cầu đăng ký Bác sĩ #{currentRequest?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRequest && (
            <div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="mb-1"><strong>Họ tên:</strong> {currentRequest.fullName}</p>
                  <p className="mb-1"><strong>Email:</strong> {currentRequest.email}</p>
                  <p className="mb-1"><strong>Số điện thoại:</strong> {currentRequest.phone}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1"><strong>Chuyên khoa:</strong> {currentRequest.specialization}</p>
                  <p className="mb-1"><strong>Bằng cấp:</strong> {currentRequest.qualification}</p>
                  <p className="mb-1"><strong>Số giấy phép:</strong> {currentRequest.licenseNumber}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <h6>Kinh nghiệm:</h6>
                <p>{currentRequest.experience}</p>
              </div>
              
              <div className="mb-3">
                <h6>Giới thiệu:</h6>
                <p>{currentRequest.bio}</p>
              </div>
              
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1"><strong>Ngày đăng ký:</strong> {new Date(currentRequest.createdAt).toLocaleString()}</p>
                  <p className="mb-0"><strong>Trạng thái:</strong> {renderStatus(currentRequest.status)}</p>
                </div>
                <div>
                  {currentRequest.status === 'PENDING' && (
                    <Badge bg="warning" className="fs-6">Đang chờ xử lý</Badge>
                  )}
                </div>
              </div>

              {/* Form lý do từ chối - chỉ hiển thị khi yêu cầu đang ở trạng thái chờ xử lý */}
              {currentRequest.status === 'PENDING' && (
                <div className="mt-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Lý do từ chối (nếu từ chối yêu cầu)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Nhập lý do từ chối yêu cầu đăng ký bác sĩ..."
                    />
                  </Form.Group>
                </div>
              )}
              
              {/* Nếu đã từ chối, hiển thị lý do */}
              {currentRequest.status === 'REJECTED' && currentRequest.rejectionReason && (
                <Alert variant="danger" className="mt-3">
                  <strong>Lý do từ chối:</strong> {currentRequest.rejectionReason}
                </Alert>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          
          {currentRequest && currentRequest.status === 'PENDING' && (
            <>
              <Button 
                variant="danger" 
                onClick={handleReject}
                disabled={actionLoading}
              >
                {actionLoading ? 'Đang xử lý...' : 'Từ chối'}
              </Button>
              <Button 
                variant="success" 
                onClick={handleApprove}
                disabled={actionLoading}
              >
                {actionLoading ? 'Đang xử lý...' : 'Phê duyệt'}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorRequests;