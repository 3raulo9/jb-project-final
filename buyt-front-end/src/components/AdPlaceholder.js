import React from 'react';

function AdPlaceholder({ padding, minHeight }) {
  const adStyle = {
    border: '1px solid #ccc',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '8px',
    padding: padding || '0', // Use the passed padding or default to '0'
    minHeight: minHeight || 'auto', // Use the passed minHeight or default to 'auto'
  };

  const adTextStyle = {
    fontSize: '18px',
    margin: '10px 0',
  };

  return (
    <div style={adStyle} className="ad-column">
      <p style={adTextStyle}>Your ad</p>
    </div>
  );
}

export default AdPlaceholder;
