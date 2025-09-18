import React, { memo } from 'react';

const Modal = memo(({ isOpen, certificate, onClose }) => {
  if (!isOpen || !certificate) return null;

  return (
    <div className="certificate-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <span>&times;</span>
        </button>
        <div className="modal-header">
          <h3 className="modal-title">{certificate.name}</h3>
          <p className="modal-subtitle">{certificate.provider} • ID: {certificate.certificateId}</p>
        </div>
        <div className="modal-image-container">
          <img 
            src={certificate.image}
            alt={certificate.alt}
            className="modal-image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

export default Modal;
