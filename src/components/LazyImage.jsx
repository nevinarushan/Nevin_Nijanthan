import React, { memo, useState, useCallback } from 'react';

const LazyImage = memo(({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  if (hasError) {
    return (
      <div className={`${className} image-placeholder`} {...props}>
        <span>Image failed to load</span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div className={`${className} image-loading`} {...props}>
          <span>Loading...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        style={{ display: isLoaded ? 'block' : 'none' }}
        {...props}
      />
    </>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
