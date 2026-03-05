"use client";

import React, { useEffect, useRef } from 'react';

const ThreeScene = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const rendererRef = useRef<any>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });
    const scriptLoaded = useRef(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        if (!scriptLoaded.current) {
            const script = document.createElement('script');
            script.src = "https://unpkg.com/three@0.160.0/build/three.min.js";
            script.async = true;
            script.onload = () => {
                checkVideoAndInit();
            };
            document.head.appendChild(script);
            scriptLoaded.current = true;
        } else if ((window as any).THREE) {
            checkVideoAndInit();
        }

        function checkVideoAndInit() {
            const video = videoRef.current;
            if (!video) return;

            if (video.readyState >= 1) { // HAVE_METADATA
                initThree();
            } else {
                video.addEventListener('loadedmetadata', initThree, { once: true });
            }
        }

        function initThree() {
            if (!containerRef.current || !videoRef.current || typeof window === 'undefined' || !(window as any).THREE) return;

            const THREE = (window as any).THREE;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            // 1. Scene & Camera Setup
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.z = 6;

            // 2. Renderer Setup
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.0;

            if (containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            // 3. Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 15);
            pointLight.position.set(2, 4, 6);
            scene.add(pointLight);

            // 4. Texture Logic
            const textureLoader = new THREE.TextureLoader();
            const logoTexture = textureLoader.load('/sigma.png');
            logoTexture.colorSpace = THREE.SRGBColorSpace;

            // 5. Digital Monolith Mesh
            const geometry = new THREE.BoxGeometry(2.2, 3.4, 0.4);

            // Material for textured faces
            const logoMaterial = new THREE.MeshStandardMaterial({
                map: logoTexture,
                emissiveMap: logoTexture,
                emissive: 0xffffff,
                emissiveIntensity: 0.2,
                roughness: 0.1,
                metalness: 0.8,
                transparent: true
            });

            // Material for side faces (matte Brand Blue/Gold hybrid)
            const sideMaterial = new THREE.MeshStandardMaterial({
                color: 0x1E293B,
                roughness: 0.3,
                metalness: 0.2
            });

            const materials = [
                sideMaterial,  // px
                sideMaterial,  // nx
                sideMaterial,  // py
                sideMaterial,  // ny
                logoMaterial, // pz (FRONT)
                logoMaterial  // nz (BACK)
            ];

            const monolith = new THREE.Mesh(geometry, materials);
            scene.add(monolith);

            // 6. Edge Highlights (Industrial Gold Glow)
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({
                color: 0xFFCC00,  // INDUSTRIAL GOLD
                transparent: true,
                opacity: 0.9
            });
            const lines = new THREE.LineSegments(edges, edgeMaterial);
            monolith.add(lines);

            // 7. Animation Loop
            let frame = 0;
            const animate = () => {
                if (!rendererRef.current) return;
                requestAnimationFrame(animate);

                frame += 0.01;

                // Interpolated Mouse Influence
                targetRotation.current.y = mouse.current.x * 0.5;
                targetRotation.current.x = -mouse.current.y * 0.3;

                monolith.rotation.y = (frame * 0.2) + targetRotation.current.y;
                monolith.rotation.x = targetRotation.current.x;

                monolith.position.y = Math.sin(frame * 0.5) * 0.1;

                renderer.render(scene, camera);
            };

            animate();

            const handleResize = () => {
                if (!containerRef.current || !rendererRef.current) return;
                const newWidth = containerRef.current.clientWidth;
                const newHeight = containerRef.current.clientHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            };

            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rendererRef.current) {
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full h-full min-h-[500px] relative">
            <div ref={containerRef} className="w-full h-full absolute inset-0" />

            {/* Decorative Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 bg-[#FFCC00]/10 blur-[120px] -z-10 rounded-full" />
        </div>
    );
};

export default ThreeScene;
