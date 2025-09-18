import React, { memo } from 'react';

const CompetencyCard = memo(({ title, skills }) => {
  return (
    <div className="competency-card">
      <div className="competency-header">
        <h3 className="competency-title">{title}</h3>
      </div>
      
      <div className="competency-content">
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index} className="skill-item-text">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

CompetencyCard.displayName = 'CompetencyCard';

export default CompetencyCard;
