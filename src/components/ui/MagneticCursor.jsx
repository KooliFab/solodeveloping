import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Magnetic cursor component
 * Agency-style custom cursor that follows mouse and has magnetic effect on interactive elements
 */
const MagneticCursor = ({ enabled = true }) => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Smooth cursor follow
    const updateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY
      });

      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY
      });

      requestAnimationFrame(updateCursor);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Mouse down/up handlers
    const handleMouseDown = () => {
      setIsClicking(true);
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      gsap.to(cursor, {
        scale: isHovering ? 2 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Magnetic effect on interactive elements
    const magneticElements = document.querySelectorAll(
      'button, a, [data-magnetic], .magnetic'
    );

    const handleMagneticEnter = (e) => {
      setIsHovering(true);
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMagneticLeave = () => {
      setIsHovering(false);
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMagneticMove = (e) => {
      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMagneticLeaveElement = (e) => {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    // Attach event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    magneticElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMagneticEnter);
      element.addEventListener('mouseleave', handleMagneticLeave);
      element.addEventListener('mousemove', handleMagneticMove);
      element.addEventListener('mouseleave', handleMagneticLeaveElement);
    });

    // Start animation loop
    requestAnimationFrame(updateCursor);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      magneticElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMagneticEnter);
        element.removeEventListener('mouseleave', handleMagneticLeave);
        element.removeEventListener('mousemove', handleMagneticMove);
        element.removeEventListener('mouseleave', handleMagneticLeaveElement);
      });

      document.body.style.cursor = 'auto';
    };
  }, [enabled, isHovering]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-colors duration-300 ${
            isHovering
              ? 'border-electric-500'
              : isClicking
              ? 'border-electric-400'
              : 'border-white'
          }`}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-colors duration-300 ${
            isHovering
              ? 'bg-electric-500'
              : isClicking
              ? 'bg-electric-400'
              : 'bg-white'
          }`}
        />
      </div>
    </>
  );
};

export default MagneticCursor;
