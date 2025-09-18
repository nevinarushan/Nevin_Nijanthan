import React, { memo } from 'react';
import Certificate from './Certificate';

const CertificatesSection = memo(({ certificates, onCertificateClick }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-11 col-xl-10">
          <div className="floating-certificates-box">
            <div className="certificates-header text-center mb-4">
              <h2 className="certificates-title">Certifications</h2>
              <p className="certificates-subtitle">Professional Development & Learning Achievements</p>
            </div>

            <div className="certificates-grid">
              {certificates.map((certificate) => (
                <Certificate
                  key={certificate.id}
                  certificate={certificate}
                  onClick={onCertificateClick}
                />
              ))}
            </div>

            <div className="certificates-footer text-center mt-4">
              <p className="certificates-note">
                <span className="emoji">🎓</span>
                Continuously expanding knowledge through professional development courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CertificatesSection.displayName = 'CertificatesSection';

export default CertificatesSection;
