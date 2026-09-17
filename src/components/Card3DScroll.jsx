import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Card3DScroll({
  children,
  className = '',
  rotateXAmount = 20,
  translateZAmount = 60
}) {
  const ref = useRef(null);

  // Track scroll position of element relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Map scroll progress to 3D rotation, translation, scale, and opacity
  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [rotateXAmount, 0, 0, -rotateXAmount]
  );

  const rawTranslateZ = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [-translateZAmount, 0, 0, -translateZAmount]
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.92, 1, 1, 0.92]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.4, 1, 1, 0.4]
  );

  // Apply physics spring for ultra smooth 60fps rendering
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 25 });
  const translateZ = useSpring(rawTranslateZ, { stiffness: 180, damping: 25 });
  const scale = useSpring(rawScale, { stiffness: 180, damping: 25 });

  return (
    <div ref={ref} className={`perspective-1000 ${className}`}>
      <motion.div
        style={{
          rotateX,
          translateZ,
          scale,
          opacity,
          transformStyle: 'preserve-3d'
        }}
        className="transition-transform duration-75"
      >
        {children}
      </motion.div>
    </div>
  );
}
