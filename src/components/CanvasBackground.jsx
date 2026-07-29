import { useEffect, useRef } from 'react';
import WebGLFluid from 'webgl-fluid';

export default function CanvasBackground({ isDarkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL Fluid simulation on the canvas element
    WebGLFluid(canvas, {
      TRIGGER: 'hover',
      IMMEDIATE: true,
      TRANSPARENT: true,
      SHADING: false, // Flat shading matches aaabadcode's vector/watercolor ink feel
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 8,
      DENSITY_DISSIPATION: 2.2, // Fades swirls smoothly after a few seconds
      VELOCITY_DISSIPATION: 0.98, // Retains smooth momentum
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30, // Fluid vorticity (adds organic twists)
      SPLAT_RADIUS: 0.25, // Splat radius relative to screen
      SPLAT_FORCE: 6000,
      PAUSED: false
    });

    // Create a helper to forward window mouse/touch inputs to the canvas.
    // This allows the canvas to remain 'pointer-events-none' (so elements on the page can be clicked)
    // while still capturing user movements for the fluid simulation.
    const forwardEvent = (e, eventType, clientX, clientY) => {
      // Use native MouseEvent initialization. The browser automatically calculates 
      // offsetX and offsetY relative to the target element based on clientX and clientY.
      const fakeEvent = new MouseEvent(eventType, {
        clientX,
        clientY,
        bubbles: true
      });

      canvas.dispatchEvent(fakeEvent);
    };

    const handleMouseMove = (e) => {
      forwardEvent(e, 'mousemove', e.clientX, e.clientY);
    };

    const handleMouseDown = (e) => {
      forwardEvent(e, 'mousedown', e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        forwardEvent(e, 'mousedown', touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        forwardEvent(e, 'mousemove', touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none select-none bg-white dark:bg-slate-950 transition-colors duration-700">
      {/* 
        The canvas opacity is lowered (0.5 in light, 0.45 in dark) to keep the liquid swirls 
        as a subtle, premium background that never interferes with text readability.
      */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-[0.5] dark:opacity-[0.45] transition-opacity duration-1000"
      />
      {/* Noise Texture Overlay - breaks up WebGL color banding and adds a frosted tactile quality */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
