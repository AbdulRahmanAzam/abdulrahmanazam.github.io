import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralNetworkBackgroundProps {
  className?: string;
}

export function NeuralNetworkBackground({ className = '' }: NeuralNetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    nodes: THREE.Mesh[];
    lines: THREE.Line[];
    animationId: number | null;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create neural network nodes
    const nodeCount = 40; // Optimized count
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    
    // Get primary color from CSS variables
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();
    const [h, s, l] = primaryColor.split(' ').map(v => parseFloat(v));
    const color = new THREE.Color().setHSL(h / 360, s / 100, l / 100);

    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: color,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );
      nodes.push(node);
      scene.add(node);
    }

    // Create connections between nearby nodes
    const lines: THREE.Line[] = [];
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: color,
      transparent: true,
      opacity: 0.15,
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 15) {
          const points = [nodes[i].position, nodes[j].position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          lines.push(line);
          scene.add(line);
        }
      }
    }

    // Store refs first
    const sceneData = {
      scene,
      camera,
      renderer,
      nodes,
      lines,
      animationId: null as number | null,
    };
    sceneRef.current = sceneData;

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.001;

      // Gentle rotation and floating animation
      nodes.forEach((node, i) => {
        node.position.y += Math.sin(time * 2 + i * 0.1) * 0.01;
        node.rotation.x += 0.001;
        node.rotation.y += 0.001;
      });

      // Update line positions
      lines.forEach((line) => {
        const positions = line.geometry.attributes.position;
        positions.needsUpdate = true;
      });

      // Gentle camera rotation
      camera.position.x = Math.sin(time * 0.2) * 2;
      camera.position.y = Math.cos(time * 0.3) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      if (sceneRef.current) {
        sceneRef.current.animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      // Dispose geometries and materials
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      lines.forEach(line => line.geometry.dispose());
      
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}