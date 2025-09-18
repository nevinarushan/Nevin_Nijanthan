import React, { memo, useState, useCallback } from 'react';

const ExtracurricularCard = memo(({ title, organization, duration, location, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div className="extracurricular-card">
      <div className="extracurricular-card-header">
        <h3 className="extracurricular-title">{title}</h3>
        {organization && (
          <p className="extracurricular-organization">{organization}</p>
        )}
        <div className="extracurricular-meta">
          <span className="extracurricular-duration">{duration}</span>
          {location && (
            <span className="extracurricular-location">{location}</span>
          )}
        </div>
      </div>

      {description && (
        <div className="extracurricular-description-section">
          <button 
            className={`description-toggle ${isExpanded ? 'expanded' : ''}`}
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
          >
            <span className="toggle-text">View Details</span>
            <span className="toggle-icon">
              {isExpanded ? '▼' : '▶'}
            </span>
          </button>
          
          <div className={`description-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <p className="description-text">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
});

ExtracurricularCard.displayName = 'ExtracurricularCard';

export default ExtracurricularCard;
