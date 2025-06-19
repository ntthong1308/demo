"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button } from "react-bootstrap"
import { doctorAPI } from "../../services/api"

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await doctorAPI.getAppointments()
        setAppointments(response.data || [])
      } catch (error) {
        console.error("Error fetching appointments:", error)
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { variant: "warning", text: "Chờ xác nhận" },
      CONFIRMED: { variant: "success", text: "Đã xác nhận" },
      COMPLETED: { variant: "info", text: "Hoàn thành" },
      CANCELLED: { variant: "danger", text: "Đã hủy" },
    }

    const statusInfo = statusMap[status] || { variant: "secondary", text: status }
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Lịch khám của tôi</h4>
            </Card.Header>
            <Card.Body>
              {appointments.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">Chưa có lịch khám nào.</p>
                </div>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Bệnh nhân</th>
                      <th>Ngày khám</th>
                      <th>Giờ khám</th>
                      <th>Trạng thái</th>
                      <th>Ghi chú</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{new Date(appointment.appointmentDate).toLocaleDateString("vi-VN")}</td>
                        <td>{appointment.appointmentTime}</td>
                        <td>{getStatusBadge(appointment.status)}</td>
                        <td>{appointment.notes || "-"}</td>
                        <td>
                          <Button size="sm" variant="outline-primary">
                            Chi tiết
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DoctorAppointment
