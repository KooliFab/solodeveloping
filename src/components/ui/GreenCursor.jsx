import { useEffect, useState } from 'react';

/**
 * Detects if device uses touch as primary input (mobile/tablet)
 */
const isTouchDevice = () => {
  if (typeof window === 'undefined') return true;
  
  // Modern approach: check if primary pointer is coarse (touch)
  if (window.matchMedia?.('(pointer: coarse)').matches) {
    return true;
  }
  
  // Fallback: check user agent + touch capability
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(
    navigator.userAgent
  );
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobileUA && hasTouch;
};

/**
 * Custom animated cursor with ring and dot effect.
 * Automatically hidden on touch devices.
 */
const GreenCursor = () => {
  const [showCursor, setShowCursor] = useState(() => !isTouchDevice());

  useEffect(() => {
    setShowCursor(!isTouchDevice());
  }, []);

  useEffect(() => {
    if (!showCursor) return;

    document.body.classList.add('custom-cursor-active');

    const cursor = document.getElementById('green-cursor');
    const cursorDot = document.getElementById('green-cursor-dot');
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let animationId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      animationId = requestAnimationFrame(animateCursor);
    };

    // Use event delegation for hover detection (works with dynamically added elements)
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';
    
    const handleMouseOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.add('cursor-hover');
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        // Only remove if not moving to another interactive element
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget?.closest?.(interactiveSelector)) {
          document.body.classList.remove('cursor-hover');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    animateCursor();

    return () => {
      document.body.classList.remove('custom-cursor-active', 'cursor-hover');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [showCursor]);

  if (!showCursor) return null;

  return (
    <>
      <div id="green-cursor" />
      <div id="green-cursor-dot" />
    </>
  );
};

export default GreenCursor;
