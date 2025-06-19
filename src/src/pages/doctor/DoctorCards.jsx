import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import './DoctorCard.css';

const DoctorCard = ({ doctor, isSelected, onSelect }) => {
  return (
    <Card 
      className={`doctor-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="doctor-img-container">
        <Card.Img 
          variant="top" 
          src={doctor.imageUrl || 'https://via.placeholder.com/150?text=Doctor'} 
          className="doctor-img"
        />
        {doctor.rating && (
          <div className="doctor-rating">
            <span>⭐ {doctor.rating}</span>
          </div>
        )}
      </div>
      
      <Card.Body>
        <Card.Title className="doctor-name">
          {doctor.fullName}
        </Card.Title>
        
        <div className="specialties">
          {doctor.specialty && (
            <Badge bg="info" className="me-1 mb-1">{doctor.specialty}</Badge>
          )}
        </div>
        
        <div className="doctor-info mt-2">
          <div className="info-item">
            <i className="bi bi-hospital"></i>
            <span>{doctor.department?.name || 'Không rõ'}</span>
          </div>
          
          <div className="info-item">
            <i className="bi bi-calendar-check"></i>
            <span>{doctor.experience || 0} năm kinh nghiệm</span>
          </div>
          
          {doctor.fee && (
            <div className="info-item price">
              <i className="bi bi-cash"></i>
              <span>{doctor.fee.toLocaleString('vi-VN')}đ / lần khám</span>
            </div>
          )}
        </div>

        {isSelected && <div className="selected-mark">✓</div>}
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
