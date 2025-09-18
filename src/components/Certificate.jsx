import React, { memo } from 'react';

const Certificate = memo(({ certificate, onClick }) => {
  return (
    <div className="certificate-card" onClick={() => onClick(certificate)}>
      <div className="certificate-image-container">
        <img 
          src={certificate.image}
          alt={certificate.alt}
          className="certificate-image"
          loading="lazy"
        />
        <div className="certificate-overlay">
          <div className="certificate-info">
            <h4 className="certificate-name">{certificate.name}</h4>
            <p className="certificate-provider">{certificate.provider}</p>
            <div className="certificate-id">ID: {certificate.certificateId}</div>
            <div className="view-full-text">
              <span className="view-icon">🔍</span>
              Click to view full certificate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Certificate.displayName = 'Certificate';

export default Certificate;
