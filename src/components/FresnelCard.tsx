"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FresnelShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#EE3124") },
    },
    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      float fresnel = pow(1.0 + dot(vPositionNormal, vNormal), 3.0);
      gl_FragColor = vec4(uColor, fresnel * (0.5 + 0.5 * sin(uTime * 2.0)));
    }
  `
};

const EdgeGlow = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#EE3124") },
    }), []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1.05, 1.05, 0.1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={FresnelShader.vertexShader}
                fragmentShader={FresnelShader.fragmentShader}
                transparent
                side={THREE.BackSide}
            />
        </mesh>
    );
};

export default function FresnelCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative group cursor-pointer">
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
                    <EdgeGlow />
                </Canvas>
            </div>
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                {children}
            </div>
        </div>
    );
}
