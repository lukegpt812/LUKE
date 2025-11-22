import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { useMousePosition } from '../../hooks/useMousePosition';

/**
 * 3D FLOATING LOGO
 * 
 * Lightweight 3D "LA" text that rotates and responds to mouse
 * Uses Three.js via React Three Fiber
 * 
 * To customize:
 * - Change text content
 * - Adjust rotation speed
 * - Modify colors and materials
 */

function RotatingText({ mousePosition }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;

        // Gentle rotation
        meshRef.current.rotation.y += 0.005;

        // Mouse-reactive tilt
        const targetRotationX = (mousePosition.y - 0.5) * 0.3;
        const targetRotationZ = (mousePosition.x - 0.5) * 0.3;

        meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * 0.05;
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.5}
        >
            <Center ref={meshRef}>
                <Text3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={1.5}
                    height={0.3}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    LA
                    <meshStandardMaterial
                        color="#8A5BFF"
                        emissive="#8A5BFF"
                        emissiveIntensity={0.5}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Text3D>
            </Center>
        </Float>
    );
}

export default function FloatingLogo3D({ className = '' }) {
    const mousePosition = useMousePosition();

    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8A5BFF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A78BFA" />
                <RotatingText mousePosition={mousePosition} />
            </Canvas>
        </div>
    );
}
