import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const DoctorRequestStatus = () => {
  const { doctorRequestStatus, updateDoctorRequestStatus, updateUserRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu không có dữ liệu trong context, lấy từ API
    const fetchRequestStatus = async () => {
      try {
        setLoading(true);
        const response = await doctorService.getMyRequestStatus();
        if (response.data) {
          updateDoctorRequestStatus(response.data);
        }
      } catch (err) {
        console.error("Error fetching doctor request status:", err);
        setError('Không thể lấy thông tin trạng thái yêu cầu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (!doctorRequestStatus) {
      fetchRequestStatus();
    } else {
      setLoading(false);
    }
  }, [doctorRequestStatus, updateDoctorRequestStatus]);

  // Xử lý khi yêu cầu được chấp nhận
  useEffect(() => {
    const handleApprovedRequest = async () => {
      if (doctorRequestStatus?.status === 'APPROVED') {
        // Cập nhật vai trò người dùng thành DOCTOR
        await updateUserRole('DOCTOR');
        // Chuyển hướng đến trang Dashboard của bác sĩ
        navigate('/doctor/dashboard');
      }
    };

    if (doctorRequestStatus) {
      handleApprovedRequest();
    }
  }, [doctorRequestStatus, navigate, updateUserRole]);

  const getStatusBadge = () => {
    if (!doctorRequestStatus) return null;

    switch (doctorRequestStatus.status) {
      case 'PENDING':
        return <span className="badge bg-warning">Đang chờ phê duyệt</span>;
      case 'APPROVED':
        return <span className="badge bg-success">Đã phê duyệt</span>;
      case 'REJECTED':
        return <span className="badge bg-danger">Đã từ chối</span>;
      default:
        return <span className="badge bg-secondary">Chưa xác định</span>;
    }
  };

  const getStatusMessage = () => {
    if (!doctorRequestStatus) return null;

    switch (doctorRequestStatus.status) {
      case 'PENDING':
        return 'Yêu cầu đăng ký làm bác sĩ của bạn đang được xem xét. Chúng tôi sẽ thông báo cho bạn khi có kết quả.';
      case 'APPROVED':
        return 'Chúc mừng! Yêu cầu đăng ký làm bác sĩ của bạn đã được phê duyệt. Bạn có thể truy cập vào trang bác sĩ ngay bây giờ.';
      case 'REJECTED':
        return `Rất tiếc, yêu cầu đăng ký làm bác sĩ của bạn đã bị từ chối. Lý do: ${doctorRequestStatus.rejectionReason || 'Không đáp ứng tiêu chuẩn của hệ thống'}`;
      default:
        return 'Không thể xác định trạng thái yêu cầu.';
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-3">Đang tải thông tin trạng thái...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Có lỗi xảy ra!</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => window.location.reload()} variant="outline-danger">
              Thử lại
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!doctorRequestStatus) {
    return (
      <Container className="py-5">
        <Alert variant="info">
          <Alert.Heading>Không có yêu cầu</Alert.Heading>
          <p>Bạn chưa gửi yêu cầu đăng ký làm bác sĩ nào.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => navigate('/select-role')} variant="outline-primary">
              Quay lại trang chọn vai trò
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Trạng thái đăng ký bác sĩ</h3>
        </Card.Header>
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Mã yêu cầu: #{doctorRequestStatus.id}</h5>
            {getStatusBadge()}
          </div>
          
          <Alert variant={doctorRequestStatus.status === 'APPROVED' ? 'success' : 
                        doctorRequestStatus.status === 'REJECTED' ? 'danger' : 'warning'}>
            {getStatusMessage()}
          </Alert>
          
          <div className="mt-4">
            <h6>Thông tin đăng ký:</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Họ và tên:</span>
                <span>{doctorRequestStatus.fullName}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Chuyên khoa:</span>
                <span>{doctorRequestStatus.specialization}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Ngày gửi yêu cầu:</span>
                <span>{new Date(doctorRequestStatus.createdAt).toLocaleString()}</span>
              </li>
              {doctorRequestStatus.updatedAt && (
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Ngày cập nhật:</span>
                  <span>{new Date(doctorRequestStatus.updatedAt).toLocaleString()}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-4 text-end">
            {doctorRequestStatus.status === 'REJECTED' && (
              <Button variant="primary" onClick={() => navigate('/doctor-request')}>
                Đăng ký lại
              </Button>
            )}
            {doctorRequestStatus.status === 'APPROVED' && (
              <Button variant="success" onClick={() => navigate('/doctor/dashboard')}>
                Đi đến trang Bác sĩ
              </Button>
            )}
            {doctorRequestStatus.status === 'PENDING' && (
              <Button variant="outline-secondary" onClick={() => navigate('/')}>
                Quay về trang chủ
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorRequestStatus;