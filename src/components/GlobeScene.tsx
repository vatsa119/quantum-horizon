"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Line, Float } from '@react-three/drei';
import * as THREE from 'three';

const PulseLine = ({ start, end, color = "#EE3124" }: { start: [number, number, number], end: [number, number, number], color?: string }) => {
    const lineRef = useRef<THREE.LineSegments>(null);

    // Create a curve for the pulse
    const curve = useMemo(() => {
        const vStart = new THREE.Vector3(...start);
        const vEnd = new THREE.Vector3(...end);
        const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(2.2); // Arc height
        return new THREE.QuadraticBezierCurve3(vStart, vEnd, mid);
    }, [start, end]);

    const points = useMemo(() => curve.getPoints(50), [curve]);

    useFrame(({ clock }) => {
        if (lineRef.current) {
            const material = lineRef.current.material as THREE.LineBasicMaterial;
            material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
        }
    });

    return (
        <group>
            <Line
                points={points}
                color={color}
                lineWidth={1}
                transparent
                opacity={0.2}
            />
            {/* Moving Pulse Element */}
            <MovingDot curve={curve} color={color} />
        </group>
    );
};

const MovingDot = ({ curve, color }: { curve: THREE.QuadraticBezierCurve3, color: string }) => {
    const dotRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (dotRef.current) {
            const t = (clock.getElapsedTime() * 0.2) % 1;
            const pos = curve.getPoint(t);
            dotRef.current.position.copy(pos);
        }
    });

    return (
        <mesh ref={dotRef}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
};

const WireframeGlobe = () => {
    const globeRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
        }
    });

    // Coordinates: Dubai (approx 25, 55), USA (NY approx 40, -74), EU (London approx 51, 0), CN (Shanghai approx 31, 121)
    // Convert lat/long to 3D Cartesian (radius 2)
    const latLongToPos = (lat: number, lon: number, radius: number = 2): [number, number, number] => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        return [
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        ];
    };

    const dubai = useMemo(() => latLongToPos(25, 55), []);
    const usa = useMemo(() => latLongToPos(40, -74), []);
    const eu = useMemo(() => latLongToPos(51, 0), []);
    const cn = useMemo(() => latLongToPos(31, 121), []);

    return (
        <group ref={globeRef}>
            {/* Base Globe */}
            <Sphere args={[2, 64, 64]}>
                <meshBasicMaterial wireframe color="#1E293B" transparent opacity={0.1} />
            </Sphere>
            <Sphere args={[1.98, 64, 64]}>
                <meshBasicMaterial color="#0F172A" transparent opacity={0.4} />
            </Sphere>

            {/* Corridor Pulses */}
            <PulseLine start={dubai} end={usa} />
            <PulseLine start={dubai} end={eu} />
            <PulseLine start={dubai} end={cn} />

            {/* Location Markers */}
            {[dubai, usa, eu, cn].map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color={i === 0 ? "#EE3124" : "#0099CC"} />
                </mesh>
            ))}
        </group>
    );
};

export default function GlobeScene() {
    return (
        <div className="w-full h-full min-h-[500px] bg-[#111827]">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <WireframeGlobe />
                </Float>
            </Canvas>
        </div>
    );
}
