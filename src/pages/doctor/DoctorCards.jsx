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
          src={doctor.image || 'https://via.placeholder.com/150?text=Doctor'} 
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
          {doctor.title} {doctor.firstName} {doctor.lastName}
        </Card.Title>
        
        <div className="specialties">
          {doctor.specialtyNames.map((specialty, index) => (
            <Badge key={index} bg="info" className="me-1 mb-1">{specialty}</Badge>
          ))}
        </div>
        
        <div className="doctor-info mt-2">
          <div className="info-item">
            <i className="bi bi-hospital"></i>
            <span>{doctor.hospital}</span>
          </div>
          
          <div className="info-item">
            <i className="bi bi-calendar-check"></i>
            <span>{doctor.experience} năm kinh nghiệm</span>
          </div>
          
          {doctor.price && (
            <div className="info-item price">
              <i className="bi bi-cash"></i>
              <span>{doctor.price.toLocaleString('vi-VN')}đ / lần khám</span>
            </div>
          )}
        </div>

        {isSelected && <div className="selected-mark">✓</div>}
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;