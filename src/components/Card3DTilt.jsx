import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Card3DTilt({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.02,
  glare = true
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 300,
    damping: 25
  });

  const rotateYSpring = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 300,
    damping: 25
  });

  const scaleSpring = useSpring(isHovered ? scale : 1, {
    stiffness: 300,
    damping: 25
  });

  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          scale: scaleSpring,
          transformStyle: 'preserve-3d'
        }}
        className="relative transition-all duration-100 rounded-2xl"
      >
        {children}

        {/* Dynamic Glare Specular Highlight */}
        {glare && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 dark:opacity-30 transition-opacity duration-300 z-30 overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)`
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
