import React from 'react';

const Logo = ({ width = 100, height = 60 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        backgroundColor: '#fff', 
        borderRadius: '10px',
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#1a46ad',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px' 
      }}>
        MS
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        color: '#ffffff' 
      }}>
        <span style={{ 
          fontSize: '22px', 
          fontWeight: 'bold',
          lineHeight: '1'
        }}>MediSched</span>
        <span style={{ 
          fontSize: '14px'
        }}>Bệnh Viện</span>
      </div>
    </div>
  );
};

export default Logo;