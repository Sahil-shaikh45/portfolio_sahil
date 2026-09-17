import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3DCanvas({ isDarkMode }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Group for 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating 3D Wireframe Geometries
    const geometries = [
      new THREE.IcosahedronGeometry(3.5, 1),
      new THREE.OctahedronGeometry(2.5, 0),
      new THREE.TorusGeometry(3, 0.8, 16, 100),
      new THREE.BoxGeometry(3, 3, 3)
    ];

    const tealColor = isDarkMode ? 0x2dd4bf : 0x0d9488;
    const goldColor = isDarkMode ? 0xfbbf24 : 0xd97706;

    const items = [];

    const numObjects = 10;
    for (let i = 0; i < numObjects; i++) {
      const geom = geometries[i % geometries.length];
      const isTeal = i % 2 === 0;

      const wireframeMat = new THREE.MeshBasicMaterial({
        color: isTeal ? tealColor : goldColor,
        wireframe: true,
        transparent: true,
        opacity: isDarkMode ? 0.25 : 0.18
      });

      const mesh = new THREE.Mesh(geom, wireframeMat);

      mesh.position.x = (Math.random() - 0.5) * 65;
      mesh.position.y = (Math.random() - 0.5) * 55;
      mesh.position.z = (Math.random() - 0.5) * 35 - 10;

      const scale = 0.6 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);

      items.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        floatOffsetY: Math.random() * Math.PI * 2,
        baseY: mesh.position.y
      });

      mainGroup.add(mesh);
    }

    // 2. 3D Particle Wave Cloud
    const particleCount = 250;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 85;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 85;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: tealColor,
      size: 0.25,
      transparent: true,
      opacity: isDarkMode ? 0.35 : 0.25,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 3. Dynamic 3D Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.4 : 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(tealColor, 2, 50);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    // Mouse & Scroll Parallax Physics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    let targetScrollY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse & scroll for silky smooth motion
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.05;

      const scrollFactor = scrollY * 0.002;

      // Rotate group with mouse AND scroll position
      mainGroup.rotation.y = mouseX * 0.3 + scrollFactor * 0.5;
      mainGroup.rotation.x = -mouseY * 0.3 + Math.sin(scrollFactor) * 0.2;
      mainGroup.position.y = scrollY * 0.005;

      // Animate individual mesh items
      items.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.position.y =
          item.baseY + Math.sin(elapsedTime * 1.5 + item.floatOffsetY) * 1.2;
      });

      // Animate particle wave rotation driven by scroll
      particleSystem.rotation.y = elapsedTime * 0.02 + mouseX * 0.1 + scrollFactor * 0.3;
      particleSystem.rotation.x = elapsedTime * 0.01 - mouseY * 0.1;

      // Point light tracking
      pointLight.position.x = mouseX * 25;
      pointLight.position.y = -mouseY * 25 - scrollY * 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometries.forEach((g) => g.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none select-none bg-slate-50 dark:bg-slate-950 transition-colors duration-700"
    />
  );
}
