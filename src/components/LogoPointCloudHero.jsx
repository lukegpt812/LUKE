import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Tunable constants - ENHANCED VIBRANT STYLE
const PARTICLE_SIZE = 0.025; // Balanced size for dense look
const SAMPLING_STEP = 2; // MAXIMUM density
const MOUSE_INFLUENCE_RADIUS = 8; // Larger ripple radius
const MOUSE_FORCE = 2.5; // Stronger ripple force
const RETURN_SPEED = 0.04; // Moderate return
const DAMPING = 0.85; // Lower damping for more movement
const NOISE_SCALE = 0.4; // Medium noise for flow
const NOISE_SPEED = 0.15; // Faster, more dynamic flow
const SPREAD_SCALE = 20; // Large logo
const FLOW_STRENGTH = 0.012; // Stronger continuous flow
const RIPPLE_SPEED = 3.0; // Speed of ripple waves
const RIPPLE_DECAY = 0.95; // How fast ripples fade

// 3D noise function
function noise(x, y, z) {
    return Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453 % 1;
}

// HSL to RGB conversion for smooth rainbow gradient
function hslToRgb(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    return [(r + m), (g + m), (b + m)];
}

const LogoParticles = ({ image }) => {
    const pointsRef = useRef();
    const [particles, setParticles] = useState(null);
    const { viewport, mouse } = useThree();

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            const positions = [];
            const basePositions = [];
            const velocities = [];
            const colors = [];

            for (let y = 0; y < canvas.height; y += SAMPLING_STEP) {
                for (let x = 0; x < canvas.width; x += SAMPLING_STEP) {
                    const i = (y * canvas.width + x) * 4;
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const a = data[i + 3];

                    const isWhite = r > 200 && g > 200 && b > 200;

                    if (isWhite && a > 128) {
                        const px = (x / canvas.width - 0.5) * SPREAD_SCALE;
                        const py = -(y / canvas.height - 0.5) * SPREAD_SCALE * (canvas.height / canvas.width);
                        const pz = (Math.random() - 0.5) * 2.0; // More Z-depth

                        positions.push(px, py, pz);
                        basePositions.push(px, py, pz);
                        velocities.push(0, 0, 0);

                        // VIBRANT RAINBOW GRADIENT with higher saturation
                        const nY = (y / canvas.height);
                        const nX = (x / canvas.width);

                        const t = (nY + nX) * 0.5;

                        // Enhanced rainbow with more saturation
                        const hue = 60 - (t * 60) + (t > 0.5 ? (t - 0.5) * 240 : 0);
                        const [rVal, gVal, bVal] = hslToRgb(hue, 1.0, 0.65); // Max saturation, brighter

                        colors.push(rVal, gVal, bVal);
                    }
                }
            }

            setParticles({
                positions: new Float32Array(positions),
                basePositions: new Float32Array(basePositions),
                velocities: new Float32Array(velocities),
                colors: new Float32Array(colors),
                count: positions.length / 3
            });
        };
    }, [image]);

    useFrame((state) => {
        if (!pointsRef.current || !particles) return;

        const positions = pointsRef.current.geometry.attributes.position.array;
        const count = particles.count;
        const time = state.clock.getElapsedTime();

        const mx = (mouse.x * viewport.width) / 2;
        const my = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            let px = positions[i3];
            let py = positions[i3 + 1];
            let pz = positions[i3 + 2];

            const bx = particles.basePositions[i3];
            const by = particles.basePositions[i3 + 1];
            const bz = particles.basePositions[i3 + 2];

            let vx = particles.velocities[i3];
            let vy = particles.velocities[i3 + 1];
            let vz = particles.velocities[i3 + 2];

            // 1. Enhanced Flow (more dynamic)
            const n = noise(bx * NOISE_SCALE, by * NOISE_SCALE, time * NOISE_SPEED);
            const flowAngle = n * Math.PI * 2;
            vx += Math.cos(flowAngle) * FLOW_STRENGTH;
            vy += Math.sin(flowAngle) * FLOW_STRENGTH;

            // Edge dispersion
            const distFromCenter = Math.sqrt(bx * bx + by * by);
            if (distFromCenter > SPREAD_SCALE * 0.3) {
                const edgeFactor = (distFromCenter - SPREAD_SCALE * 0.3) / (SPREAD_SCALE * 0.2);
                vx += (bx / distFromCenter) * FLOW_STRENGTH * edgeFactor * 3;
                vy += (by / distFromCenter) * FLOW_STRENGTH * edgeFactor * 3;
            }

            // 2. RIPPLE PHYSICS - Wave emanating from mouse
            const dx = mx - px;
            const dy = my - py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0.1) {
                // Ripple wave effect
                const ripplePhase = (dist / MOUSE_INFLUENCE_RADIUS) * Math.PI * 2 - time * RIPPLE_SPEED;
                const rippleStrength = Math.sin(ripplePhase) * RIPPLE_DECAY;
                const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_FORCE;

                // Radial push with ripple
                vx -= (dx / dist) * force * (1 + rippleStrength * 0.5) * 0.02;
                vy -= (dy / dist) * force * (1 + rippleStrength * 0.5) * 0.02;

                // Swirl with ripple modulation
                vx += -dy * force * rippleStrength * 0.03;
                vy += dx * force * rippleStrength * 0.03;

                // Z displacement creates 3D wave
                vz += force * rippleStrength * 0.05;
            }

            // 3. Return to base
            vx += (bx - px) * RETURN_SPEED;
            vy += (by - py) * RETURN_SPEED;
            vz += (bz - pz) * RETURN_SPEED;

            // 4. Apply Velocity & Damping
            vx *= DAMPING;
            vy *= DAMPING;
            vz *= DAMPING;

            px += vx;
            py += vy;
            pz += vz;

            positions[i3] = px;
            positions[i3 + 1] = py;
            positions[i3 + 2] = pz;

            particles.velocities[i3] = vx;
            particles.velocities[i3 + 1] = vy;
            particles.velocities[i3 + 2] = vz;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    if (!particles) return null;

    return (
        <points ref={pointsRef} rotation={[0, 0, THREE.MathUtils.degToRad(25)]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={PARTICLE_SIZE}
                vertexColors
                transparent
                opacity={0.95}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const LogoPointCloudHero = () => {
    return (
        <div className="w-full h-[60vh] md:h-[80vh] relative bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <LogoParticles image="https://placehold.co/400x400/1a1a1a/ffffff?text=Logo" />
                </Canvas>
            </div>
            {/* Gradient overlay for smooth transition to content */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
    );
};

export default LogoPointCloudHero;
