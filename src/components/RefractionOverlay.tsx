"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const RefractionShader = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse / uResolution;
      
      // Calculate distance from mouse
      float dist = distance(uv, mouse);
      
      // Magnifying effect
      float radius = 0.15;
      float strength = 0.3;
      
      if (dist < radius) {
        float factor = 1.0 - (dist / radius);
        uv = mix(uv, mouse, factor * strength);
      }
      
      // Glass look (tint and subtle distortion)
      vec3 color = vec3(0.95, 0.95, 0.98); // Light glass tint
      float alpha = 0.5 + 0.1 * sin(uv.x * 20.0 + uTime) * cos(uv.y * 20.0 + uTime);
      
      // Edge glow
      float edge = 1.0 - smoothstep(0.0, 0.5, dist);
      color += vec3(0.933, 0.122, 0.082) * edge * 0.1; // Safety Red glow
      
      gl_FragColor = vec4(color, alpha * 0.4);
    }
  `
};

const RefractionMesh = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }), [size]);

    useFrame(({ clock, mouse }) => {
        if (meshRef.current) {
            uniforms.uTime.value = clock.getElapsedTime();
            // Map mouse (-1 to 1) to (0 to 1)
            uniforms.uMouse.value.set(
                (mouse.x + 1) / 2 * size.width,
                (mouse.y + 1) / 2 * size.height
            );
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={RefractionShader.vertexShader}
                fragmentShader={RefractionShader.fragmentShader}
                transparent
            />
        </mesh>
    );
};

export default function RefractionOverlay() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 5], fov: 75 }}>
                <RefractionMesh />
            </Canvas>
        </div>
    );
}
