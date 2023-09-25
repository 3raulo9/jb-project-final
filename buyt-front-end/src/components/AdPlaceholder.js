import React from 'react';

function AdPlaceholder() {
  const adStyle = {
    border: '1px solid #ccc',
    backgroundColor: '#f2f2f2',
    padding: '20px',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '8px',
  };

  const adTextStyle = {
    fontSize: '18px',
    margin: '10px 0',
  };

  return (
    <div style={adStyle} className="ad-column">
      <p style={adTextStyle}>ad</p>
      {/* Add your ad content here */}
    </div>
  );
}

export default AdPlaceholder;
