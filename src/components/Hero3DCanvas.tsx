import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- WebGL Helper Component: Particle Brain ---
const NeuralBrain: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 800 particles in a spherical brain structure
  const [positions] = useState(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      // Create a double hemisphere shape with a connecting bridge (resembling a brain)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Radius with perturbations to make it look organic
      const radius = 1.6 + Math.sin(theta * 4) * 0.2 + Math.cos(phi * 4) * 0.15;
      
      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      let z = radius * Math.cos(phi);

      // Squeeze the center to make a left/right hemisphere separation
      if (Math.abs(x) < 0.3) {
        x *= 0.7;
      }
      
      arr[i * 3] = x;
      arr[i * 3 + 1] = y * 0.9; // Flatten slightly
      arr[i * 3 + 2] = z * 1.1; // Stretch vertically
    }
    return arr;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
      
      // Gentle breathing scale
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// --- WebGL Helper Component: Floating Nodes ---
interface NodeProps {
  position: [number, number, number];
  label: string;
  subLabel: string;
  color: string;
  delay: number;
}

const FloatingNode: React.FC<NodeProps> = ({ position, label, subLabel, color, delay }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      const yOffset = Math.sin(state.clock.getElapsedTime() * 0.8 + delay) * 0.15;
      groupRef.current.position.y = position[1] + yOffset;
      // Slight rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Central sphere node */}
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? '#ffffff' : color} 
          wireframe={!hovered}
        />
      </mesh>

      {/* Halo glow */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={hovered ? 0.3 : 0.1} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* HTML Label overlay */}
      <Html distanceFactor={6} center>
        <div 
          className={`px-3 py-1.5 rounded-lg border text-center whitespace-nowrap select-none transition-all duration-300 pointer-events-none ${
            hovered 
              ? 'bg-slate-900 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105' 
              : 'bg-slate-950/80 border-cyan-500/30 text-cyan-400 shadow-lg'
          }`}
          style={{ transform: 'translateY(-35px)' }}
        >
          <div className="text-[10px] font-bold tracking-wide">{label}</div>
          <div className="text-[8px] text-slate-400 mt-0.5">{subLabel}</div>
        </div>
      </Html>
    </group>
  );
};

// --- WebGL Helper Component: Neural Connections ---
const NeuralConnections: React.FC = () => {
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);

  // Set up connection lines between central nodes
  const points = [
    new THREE.Vector3(-2.2, 1.2, 0.5), // AI
    new THREE.Vector3(2.2, 1.2, -0.5), // DS
    new THREE.Vector3(-2.0, -1.2, -0.5), // ML
    new THREE.Vector3(2.0, -1.2, 0.5), // DA
  ];

  const linePositions = new Float32Array(points.flatMap(p => [
    0, 0, 0, // Central Brain
    p.x, p.y, p.z
  ]));

  return (
    <lineSegments>
      <bufferGeometry ref={lineGeometryRef}>
        <bufferAttribute 
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#a855f7" 
        transparent 
        opacity={0.25} 
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

// --- Mouse Parallax Handler ---
const CameraController: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;
      
      // Gently ease the camera towards the target position based on mouse position
      gsap.to(camera.position, {
        x: mouseX * 2,
        y: mouseY * 2 + 0.2,
        duration: 1.5,
        ease: 'power2.out'
      });
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera]);

  return null;
};

// Import GSAP inside component dynamically to prevent errors
import { gsap } from 'gsap';

// --- Fallback Canvas (2D HTML Canvas) ---
const Fallback2DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Node setup
    const brainCenter = { x: width / 2, y: height / 2 };
    const nodes = [
      { x: brainCenter.x - 140, y: brainCenter.y - 100, label: "AI Engineer", sub: "94% Match", color: "#06b6d4" },
      { x: brainCenter.x + 140, y: brainCenter.y - 100, label: "Data Scientist", sub: "91% Match", color: "#a855f7" },
      { x: brainCenter.x - 130, y: brainCenter.y + 100, label: "ML Engineer", sub: "89% Match", color: "#ec4899" },
      { x: brainCenter.x + 130, y: brainCenter.y + 100, label: "Data Analyst", sub: "82% Match", color: "#eab308" }
    ];

    // Brain points
    const pointsCount = 120;
    const points: { x: number; y: number; r: number; speed: number; angle: number; rad: number }[] = [];
    for (let i = 0; i < pointsCount; i++) {
      points.push({
        x: 0,
        y: 0,
        r: Math.random() * 65 + 10,
        speed: 0.005 + Math.random() * 0.01,
        angle: Math.random() * Math.PI * 2,
        rad: 1 + Math.random() * 2
      });
    }

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Draw background cyber grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connections (lines from nodes to brain center)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.lineWidth = 1.5;
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y + Math.sin(time + node.x) * 8);
        ctx.lineTo(width / 2, height / 2);
        ctx.stroke();
      });

      // Draw Brain structure
      ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
      points.forEach(p => {
        p.angle += p.speed;
        // Map to brain shape
        const wFactor = Math.abs(Math.sin(p.angle * 2)) < 0.3 ? 0.7 : 1;
        const px = width / 2 + Math.cos(p.angle) * p.r * wFactor * (1 + Math.sin(time) * 0.02);
        const py = height / 2 + Math.sin(p.angle) * p.r * 0.9 * (1 + Math.sin(time) * 0.02);
        
        ctx.beginPath();
        ctx.arc(px, py, p.rad, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach(node => {
        const floatY = Math.sin(time * 2 + node.x) * 6;
        const nx = node.x;
        const ny = node.y + floatY;

        // Draw outer glowing halo
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.08;
        ctx.beginPath();
        ctx.arc(nx, ny, 25, 0, Math.PI * 2);
        ctx.fill();

        // Draw inner dot
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.stroke();

        // Label box
        ctx.fillStyle = 'rgba(3, 7, 18, 0.85)';
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1;
        
        const labelW = 90;
        const labelH = 34;
        const lx = nx - labelW / 2;
        const ly = ny - 45;

        // Round rect
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(lx, ly, labelW, labelH, 6) : ctx.rect(lx, ly, labelW, labelH);
        ctx.fill();
        ctx.stroke();

        // Label texts
        ctx.fillStyle = node.color;
        ctx.font = 'bold 9px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ly + 14);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px Inter, sans-serif';
        ctx.fillText(node.sub, nx, ly + 26);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full bg-slate-950/20" />;
};

// --- Main Hero3DCanvas Component ---
export const Hero3DCanvas: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglSupported(supported);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center">
        <Fallback2DCanvas />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing">
      {/* Absolute overlay for ambient cyber grids */}
      <div className="absolute inset-0 cyber-grid cyber-grid-radial pointer-events-none"></div>

      <Canvas 
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        
        {/* Core brain nodes */}
        <NeuralBrain />
        
        {/* Connection lines */}
        <NeuralConnections />

        {/* Floating Careers Nodes */}
        <FloatingNode position={[-2.2, 1.2, 0.5]} label="AI Engineer" subLabel="94% Match Score" color="#06b6d4" delay={0} />
        <FloatingNode position={[2.2, 1.2, -0.5]} label="Data Scientist" subLabel="91% Match Score" color="#a855f7" delay={Math.PI / 2} />
        <FloatingNode position={[-2.0, -1.2, -0.5]} label="ML Engineer" subLabel="89% Match Score" color="#ec4899" delay={Math.PI} />
        <FloatingNode position={[2.0, -1.2, 0.5]} label="Data Analyst" subLabel="82% Match Score" color="#eab308" delay={Math.PI * 1.5} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
        <CameraController />
      </Canvas>
    </div>
  );
};
