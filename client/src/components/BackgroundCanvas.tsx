import { useEffect, useRef } from "react";
import * as THREE from "three";

export const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const timeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;
    
    // Initialize renderer with better quality but still optimized
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Device pixel ratio but capped for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    
    // Create main particle field - balanced for visual quality and performance
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300; // Good balance of particles
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a spherical distribution with random radius
      const radius = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i+2] = radius * Math.cos(phi);
      
      // Random sizes for particles
      scaleArray[i/3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create visually appealing material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x9B5CF6, // new purple color
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;
    
    // Create secondary smaller particles - for visual depth
    const smallParticlesGeometry = new THREE.BufferGeometry();
    const smallParticlesCount = 200;
    
    const smallPosArray = new Float32Array(smallParticlesCount * 3);
    
    for (let i = 0; i < smallParticlesCount * 3; i += 3) {
      smallPosArray[i] = (Math.random() - 0.5) * 10;
      smallPosArray[i+1] = (Math.random() - 0.5) * 10;
      smallPosArray[i+2] = (Math.random() - 0.5) * 10;
    }
    
    smallParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(smallPosArray, 3));
    
    const smallParticlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    
    const smallParticlesMesh = new THREE.Points(smallParticlesGeometry, smallParticlesMaterial);
    scene.add(smallParticlesMesh);
    particlesMeshRef.current = smallParticlesMesh;
    
    // Mouse tracking variables 
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop - balanced for performance
    const animate = () => {
      frameCountRef.current++;
      timeRef.current += 0.005;
      
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      // Smooth camera movement - optimized
      targetX = mouseX * 0.0005;
      targetY = mouseY * 0.0005;
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        
        // Update every 2 frames to reduce CPU usage but keep smooth appearance
        if (frameCountRef.current % 2 === 0) {
          const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
          const scales = particlesRef.current.geometry.attributes.scale.array as Float32Array;
          
          // Update only a subset of particles each frame
          for (let i = 0; i < positions.length; i += 9) {
            const ix = i / 3;
            const sinWave = Math.sin(timeRef.current + ix * 0.1) * 0.05;
            positions[i+1] += sinWave * 0.02;
            if (ix < scales.length) {
              scales[ix] = Math.max(0.5, Math.sin(timeRef.current + ix * 0.5) * 0.3 + 0.8);
            }
          }
          
          particlesRef.current.geometry.attributes.position.needsUpdate = true;
          particlesRef.current.geometry.attributes.scale.needsUpdate = true;
        }
      }
      
      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.x += 0.0005;
        particlesMeshRef.current.rotation.y += 0.001;
      }
      
      // Camera follows mouse with damping
      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (-targetY - cameraRef.current.position.y) * 0.05;
      cameraRef.current.lookAt(scene.position);
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize with slight debounce
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      
      resizeTimer = window.setTimeout(() => {
        if (!cameraRef.current || !rendererRef.current) return;
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        resizeTimer = null;
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      
      if (particlesRef.current) {
        scene.remove(particlesRef.current);
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
      
      if (particlesMeshRef.current) {
        scene.remove(particlesMeshRef.current);
        particlesMeshRef.current.geometry.dispose();
        (particlesMeshRef.current.material as THREE.Material).dispose();
      }
      
      rendererRef.current?.dispose();
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-[-1]" 
      id="bg-canvas"
    />
  );
};
