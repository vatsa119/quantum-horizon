'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

// Constants
const RADIUS = 2
const GLOBE_CONFIG = {
  rotationSpeed: 0.005,
  friction: 0.05,
  minZoom: 1.5,
  maxZoom: 4
}

// Marker Data
const MARKERS = [
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Houston', lat: 29.7604, lng: -95.3698 },
  { name: 'Moscow', lat: 55.7558, lng: 37.6173 }
]

// Math: Lat/Lng to Vector3
function getCoordinates(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  const y = (radius * Math.cos(phi))

  return new THREE.Vector3(x, y, z)
}

function Marker({ data, isHovered, setHovered }: any) {
  const pos = useMemo(() => getCoordinates(data.lat, data.lng, RADIUS + 0.01), [data.lat, data.lng])
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime()
      // Pulse animation: expand scale and fade out
      const scale = 1 + (t % 2) * 2
      const opacity = Math.max(0, 1 - (t % 2))
      ringRef.current.scale.set(scale, scale, scale)
      ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity = opacity
    }
  })

  return (
    <group 
      position={pos} 
      // Marker faces outward from the origin
      quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize())}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Core Dot */}
      <mesh>
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.9} />
      </mesh>
      
      {/* Expanding Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.03, 0.04, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.5} depthWrite={false} />
      </mesh>

      {/* HTML Label */}
      <Html distanceFactor={10} zIndexRange={[100, 0]} className="pointer-events-none">
        <div 
          className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-[4px] border border-white/10 flex items-center gap-2 transition-all duration-300"
          style={{ transform: 'translate3d(15px, -50%, 0)', opacity: isHovered ? 1 : 0.7 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white font-mono text-[10px] uppercase tracking-wider whitespace-nowrap">
            {data.name}
          </span>
        </div>
      </Html>
    </group>
  )
}

function EarthPointGrid() {
  // Generate halftone grid (latitude/longitude procedural projection)
  const { positions, uvs } = useMemo(() => {
    const pos = []
    const uvCoord = []
    const rows = 120 // Density
    
    for (let lat = -90; lat <= 90; lat += 180 / rows) {
      const r = Math.cos(lat * (Math.PI / 180))
      const circumference = 2 * Math.PI * r
      const numCols = Math.max(1, Math.floor(circumference * rows * 1.5))
      
      for (let i = 0; i < numCols; i++) {
        const lon = (i / numCols) * 360 - 180
        const p = getCoordinates(lat, lon, RADIUS)
        pos.push(p.x, p.y, p.z)
        // Normalized UV for mapping to texture
        uvCoord.push((lon + 180) / 360, (lat + 90) / 180)
      }
    }
    
    return {
      positions: new Float32Array(pos),
      uvs: new Float32Array(uvCoord)
    }
  }, [])

  // Create a high-performance shader material that samples an earth texture
  // and discards points over the ocean to create the \"landmass\" effect.
  const pointMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color('#e5e7eb') },
        // Fallback to procedural discard if map fails
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (1.5 / -mvPosition.z) * 15.0; // Base size with perspective
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        
        // Simplex noise function for procedural landmass if no map is loaded
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute( permute( permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          // Circular points
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          
          // Generate pseudo-continents using 3D noise mapped from spherical UVs
          float lat = (vUv.y - 0.5) * 3.14159;
          float lon = (vUv.x - 0.5) * 6.28318;
          vec3 spherePos = vec3(cos(lat)*cos(lon), sin(lat), cos(lat)*sin(lon));
          
          // Multi-octave noise to simulate landmass
          float n = snoise(spherePos * 2.0) * 0.5 + 0.5;
          n += snoise(spherePos * 4.0) * 0.25;
          
          // Discard points to create \"oceans\"
          if (n < 0.45) discard;

          // Soften edges
          float alpha = smoothstep(0.45, 0.5, n);
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false
    })
  }, [])

  return (
    <points material={pointMaterial}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={positions.length / 3} 
          array={positions} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-uv" 
          count={uvs.length / 2} 
          array={uvs} 
          itemSize={2} 
        />
      </bufferGeometry>
    </points>
  )
}

function Atmosphere() {
  const shader = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        // Fresnel glow
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
        gl_FragColor = vec4(0.1, 0.4, 0.8, 1.0) * intensity;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  }), [])

  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <primitive object={shader} attach="material" />
    </mesh>
  )
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Dynamic rotation logic: slows down dramatically when hovering a marker
      const speed = hoveredMarker ? GLOBE_CONFIG.rotationSpeed * 0.2 : GLOBE_CONFIG.rotationSpeed;
      // Interpolate for smooth transition
      groupRef.current.rotation.y += speed;
    }
  })

  // Determine an invisible interaction sphere for raycasting
  return (
    <>
      <group ref={groupRef}>
        {/* Core Halftone Point Cloud */}
        <EarthPointGrid />
        
        {/* Atmosphere Glow */}
        <Atmosphere />
        
        {/* Invisible sphere to block raycasts intersecting back-face markers */}
        <mesh>
          <sphereGeometry args={[RADIUS - 0.05, 32, 32]} />
          <meshBasicMaterial color="#0a0f18" />
        </mesh>

        {/* Global Hub Markers */}
        {MARKERS.map((m) => (
          <Marker 
            key={m.name} 
            data={m} 
            isHovered={hoveredMarker === m.name} 
            setHovered={(val: boolean) => setHoveredMarker(val ? m.name : null)} 
          />
        ))}
      </group>

      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={GLOBE_CONFIG.minZoom * RADIUS}
        maxDistance={GLOBE_CONFIG.maxZoom * RADIUS}
        enableDamping={true}
        dampingFactor={GLOBE_CONFIG.friction}
        autoRotate={false} /* Custom logic handled in useFrame */
      />
    </>
  )
}

export default function InteractiveGlobe() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [0, 0, RADIUS * 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0a0f18']} />
        <ambientLight intensity={0.5} />
        <GlobeScene />
      </Canvas>
    </div>
  )
}
