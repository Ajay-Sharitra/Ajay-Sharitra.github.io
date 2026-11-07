import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  label?: string;
  isHoveringProject?: boolean;
  active?: boolean;
}

export default function CustomCursor({
  label = 'VIEW CASE',
  isHoveringProject = false,
  active = true,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3.out' });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!active) return;
      if (!hasMoved) {
        hasMoved = true;
        gsap.to(cursor, { opacity: 1, duration: 0.25 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
      hasMoved = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [active]);

  // Synchronize body cursor: standard cursor when overlay is open, custom cursor when viewing portfolio
  useEffect(() => {
    if (isTouchDevice) return;
    if (!active) {
      document.documentElement.style.cursor = 'auto';
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.15 });
      }
    } else {
      document.documentElement.style.cursor = 'none';
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.2 });
      }
    }

    return () => {
      document.documentElement.style.cursor = 'auto';
    };
  }, [active, isTouchDevice]);

  if (isTouchDevice || !active) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-40 pointer-events-none select-none transition-all duration-200 ease-out ${
        isHoveringProject
          ? 'bg-[#cee49f] text-[#0b0b0b] font-mono-medium text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-[2px] shadow-lg scale-100'
          : 'w-2.5 h-2.5 rounded-full bg-[#cee49f] opacity-80 scale-100'
      }`}
      style={{ willChange: 'transform' }}
    >
      {isHoveringProject && <span>{label}</span>}
    </div>
  );
}
