'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store/useAppStore';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursorType = useAppStore((s) => s.cursorType);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      raf = requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => useAppStore.getState().setCursorType('hover');
    const onMouseLeaveInteractive = () => useAppStore.getState().setCursorType('default');
    const onMouseEnterButton = () => useAppStore.getState().setCursorType('button');

    // Attach to interactive elements
    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
      document.querySelectorAll('.btn-primary, .btn-outline, [data-cursor="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterButton);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    // Use MutationObserver to handle dynamic elements
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${
          cursorType === 'hover' ? 'cursor-hover' : ''
        } ${cursorType === 'button' ? 'cursor-button' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
