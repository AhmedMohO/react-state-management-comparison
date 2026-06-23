import React, { useRef, useEffect } from 'react';

export const RenderVisualizer = ({ name, children, highlightColor = 'rgba(59, 130, 246, 0.8)' }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;
    
    if (container && counter) {
      // Remove classes to reset animations
      container.classList.remove('is-flashing');
      counter.classList.remove('counter-bump');

      // Trigger reflow to restart CSS animations/transitions
      void container.offsetHeight;

      // Add classes back to play flash animations
      container.classList.add('is-flashing');
      counter.classList.add('counter-bump');

      // Clean up classes after animation duration (600ms)
      const timer = setTimeout(() => {
        container.classList.remove('is-flashing');
        counter.classList.remove('counter-bump');
      }, 600);

      return () => clearTimeout(timer);
    }
  }); // Run on every render

  return (
    <div
      ref={containerRef}
      className="render-visualizer"
      style={{
        '--flash-color': highlightColor,
      }}
    >
      <div className="render-meta">
        <span className="component-label">{name}</span>
        <span ref={counterRef} className="render-counter">
          Renders: {renderCount.current}
        </span>
      </div>
      <div className="render-child-container">
        {children}
      </div>
    </div>
  );
};

export default RenderVisualizer;
