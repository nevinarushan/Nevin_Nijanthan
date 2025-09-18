import React, { memo, useCallback } from 'react';

const ProjectCard = memo(({ title, description, githubUrl }) => {
  const handleGithubClick = useCallback(() => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  }, [githubUrl]);

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-title">{title}</h3>
      </div>
      
      <div className="project-description">
        <p className="project-desc-text">{description}</p>
      </div>
      
      <div className="project-footer">
        <button 
          className="github-button"
          onClick={handleGithubClick}
          aria-label={`View ${title} on GitHub`}
        >
          <span className="github-icon">📂</span>
          <span className="github-text">View on GitHub</span>
        </button>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
