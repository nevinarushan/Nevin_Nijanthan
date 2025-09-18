// Performance Testing Script
// Run this in browser console to measure performance

console.log('🚀 Portfolio Performance Test Starting...');

// Measure page load performance
const perfData = performance.getEntriesByType('navigation')[0];
console.log('📊 Page Load Metrics:');
console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
console.log(`Full Page Load: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
console.log(`Total Load Time: ${perfData.loadEventEnd - perfData.navigationStart}ms`);

// Measure React component render times
let renderCount = 0;
let totalRenderTime = 0;

// Override console.time for React DevTools
const originalTime = console.time;
const originalTimeEnd = console.timeEnd;

console.time = function(label) {
  if (label && label.includes('React')) {
    renderCount++;
    return originalTime.call(this, label);
  }
  return originalTime.call(this, label);
};

console.timeEnd = function(label) {
  if (label && label.includes('React')) {
    const result = originalTimeEnd.call(this, label);
    totalRenderTime += performance.now();
    return result;
  }
  return originalTimeEnd.call(this, label);
};

// Memory usage
const memInfo = performance.memory;
if (memInfo) {
  console.log('💾 Memory Usage:');
  console.log(`Used: ${(memInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total: ${(memInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Limit: ${(memInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
}

// FPS monitoring
let fps = 0;
let lastTime = performance.now();

function measureFPS() {
  const currentTime = performance.now();
  fps = 1000 / (currentTime - lastTime);
  lastTime = currentTime;
  
  if (fps < 30) {
    console.warn(`⚠️ Low FPS detected: ${fps.toFixed(1)} fps`);
  }
  
  requestAnimationFrame(measureFPS);
}

measureFPS();

// Scroll performance test
let scrollCount = 0;
let scrollStartTime = 0;

window.addEventListener('scroll', function() {
  if (scrollCount === 0) {
    scrollStartTime = performance.now();
  }
  scrollCount++;
  
  // Log scroll performance every 50 scroll events
  if (scrollCount % 50 === 0) {
    const scrollTime = performance.now() - scrollStartTime;
    const avgScrollTime = scrollTime / scrollCount;
    console.log(`📜 Scroll Performance: ${avgScrollTime.toFixed(2)}ms average per scroll event`);
  }
});

// Image loading performance
const images = document.querySelectorAll('img');
let imagesLoaded = 0;
const imageLoadStart = performance.now();

images.forEach(img => {
  if (img.complete) {
    imagesLoaded++;
  } else {
    img.addEventListener('load', () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        const imageLoadTime = performance.now() - imageLoadStart;
        console.log(`🖼️ All images loaded in: ${imageLoadTime.toFixed(2)}ms`);
      }
    });
  }
});

// Performance recommendations
setTimeout(() => {
  console.log('\n🎯 Performance Recommendations:');
  
  if (perfData.loadEventEnd - perfData.navigationStart > 3000) {
    console.log('❌ Page load time > 3s - Consider optimizing assets');
  } else {
    console.log('✅ Good page load time');
  }
  
  if (memInfo && memInfo.usedJSHeapSize > 50 * 1024 * 1024) {
    console.log('❌ High memory usage - Check for memory leaks');
  } else {
    console.log('✅ Good memory usage');
  }
  
  console.log('\n📋 To further optimize:');
  console.log('1. Run: npm run build && npm run preview');
  console.log('2. Use browser DevTools Performance tab');
  console.log('3. Check Network tab for large assets');
  console.log('4. Consider removing unused dependencies');
  
}, 5000);

console.log('✅ Performance monitoring active. Check console for updates.');
