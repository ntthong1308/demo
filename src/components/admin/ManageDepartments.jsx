<<<<<<< HEAD
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const ManageDepartments = () => {
  return (
    <Container className="py-4">
      <h2>Manage Departments</h2>
      <Card className="mt-4">
        <Card.Body>
          <p>This feature is under development.</p>
          <p>You will be able to create and manage medical departments here soon.</p>
        </Card.Body>
      </Card>
    </Container>
=======
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { departmentService } from '../../services/api';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE'
  });

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await departmentService.getAll();
      setDepartments(response.data);
      console.log('Departments fetched:', response.data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
      setError('Không thể tải danh sách phòng ban. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: 'ACTIVE'
    });
    setError(null);
    setSuccess(null);
  };

  const handleAddDepartment = () => {
    setModalMode('add');
    resetForm();
    setShowModal(true);
  };

  const handleEditDepartment = (department) => {
    setModalMode('edit');
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
      description: department.description || '',
      status: department.status || 'ACTIVE'
    });
    setShowModal(true);
  };

  const handleDeleteDepartment = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phòng ban này không?')) {
      return;
    }

    try {
      setLoading(true);
      await departmentService.delete(id);
      // Update local state after successful deletion
      setDepartments(departments.filter(dept => dept.id !== id));
      setSuccess('Phòng ban đã được xóa thành công.');
    } catch (err) {
      console.error('Failed to delete department:', err);
      setError('Không thể xóa phòng ban. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setProcessing(true);

    try {
      if (modalMode === 'add') {
        // Create new department
        const response = await departmentService.create(formData);
        setDepartments([...departments, response.data]);
        setSuccess('Phòng ban mới đã được tạo thành công.');
      } else {
        // Update existing department
        const response = await departmentService.update(selectedDepartment.id, formData);
        setDepartments(departments.map(dept => 
          dept.id === selectedDepartment.id ? response.data : dept
        ));
        setSuccess('Phòng ban đã được cập nhật thành công.');
      }

      // Close modal after short delay to show success message
      setTimeout(() => {
        setShowModal(false);
        resetForm();
      }, 1500);
    } catch (err) {
      console.error('Department operation failed:', err);
      setError(`Không thể ${modalMode === 'add' ? 'tạo' : 'cập nhật'} phòng ban. Vui lòng thử lại sau.`);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge bg="success">Hoạt động</Badge>;
      case 'INACTIVE':
        return <Badge bg="secondary">Tạm dừng</Badge>;
      default:
        return <Badge bg="info">{status}</Badge>;
    }
  };

  return (
    <div className="departments-management">
      <h2 className="page-title">Quản lý phòng ban</h2>
      
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
            <h5 className="mb-0">Danh sách phòng ban</h5>
          </div>
          <div>
            <Button 
              variant="outline-secondary" 
              className="me-2"
              onClick={fetchDepartments}
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise"></i> Làm mới
            </Button>
            <Button 
              variant="primary"
              onClick={handleAddDepartment}
            >
              <i className="bi bi-plus-circle me-1"></i> Thêm phòng ban
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body>
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Đang tải dữ liệu...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center p-5">
              <i className="bi bi-folder fs-1 text-muted"></i>
              <p className="mt-3">Chưa có phòng ban nào. Hãy thêm phòng ban mới.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên phòng ban</th>
                    <th>Mô tả</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department) => (
                    <tr key={department.id}>
                      <td>{department.id}</td>
                      <td>{department.name}</td>
                      <td>{department.description || 'Không có mô tả'}</td>
                      <td>{getStatusBadge(department.status)}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEditDepartment(department)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeleteDepartment(department.id)}
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
      </Card>

      {/* Modal for adding/editing department */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'add' ? 'Thêm phòng ban mới' : 'Chỉnh sửa phòng ban'}
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
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên phòng ban</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên phòng ban"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả phòng ban"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Tạm dừng</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={processing}>
            Hủy
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={processing}
          >
            {processing ? (
              <><Spinner animation="border" size="sm" /> Đang xử lý...</>
            ) : (
              modalMode === 'add' ? 'Thêm phòng ban' : 'Cập nhật'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
>>>>>>> 1a644ab (1)
  );
};

export default ManageDepartments;