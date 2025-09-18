import React, { memo, useState, useCallback } from 'react';

const ExperienceCard = memo(({ title, company, type, duration, location, categories }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = useCallback((categoryTitle) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryTitle)) {
        newSet.delete(categoryTitle);
      } else {
        newSet.add(categoryTitle);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="experience-card">
      <div className="experience-card-header">
        <h3 className="experience-title">{title}</h3>
        <div className="experience-meta">
          <div className="company-info">
            <span className="company-name">{company}</span>
            <span className="experience-type">• {type}</span>
          </div>
          <div className="duration-location">
            <span className="duration">{duration}</span>
            <span className="location">{location}</span>
          </div>
        </div>
      </div>

      <div className="experience-categories">
        {categories.map((category, index) => (
          <div key={index} className="category-section">
            <button 
              className={`category-toggle ${expandedCategories.has(category.title) ? 'expanded' : ''}`}
              onClick={() => toggleCategory(category.title)}
              aria-expanded={expandedCategories.has(category.title)}
            >
              <span className="category-title">{category.title}</span>
              <span className="toggle-icon">
                {expandedCategories.has(category.title) ? '▼' : '▶'}
              </span>
            </button>
            
            <div className={`category-content ${expandedCategories.has(category.title) ? 'expanded' : 'collapsed'}`}>
              <ul className="category-items">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="category-item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard;
