import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const rafRef = useRef(null);
    const lastTimeRef = useRef(Date.now());

    // Smooth cursor following with lerp
    useEffect(() => {
        const lerp = (start, end, factor) => start + (end - start) * factor;

        const animate = () => {
            const now = Date.now();
            const delta = (now - lastTimeRef.current) / 16.67; // Normalize to 60fps
            lastTimeRef.current = now;

            setPosition(prev => ({
                x: lerp(prev.x, targetPosition.x, 0.15 * delta),
                y: lerp(prev.y, targetPosition.y, 0.15 * delta),
            }));

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [targetPosition]);

    // Update target position on mouse move
    useEffect(() => {
        const updateTarget = (e) => {
            setTargetPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer');
            setIsHovering(isInteractive);
        };

        window.addEventListener('mousemove', updateTarget);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateTarget);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Hide on mobile/touch devices
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window);
    }, []);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Main cursor ring */}
            <div
                className="fixed pointer-events-none z-[9999] rounded-full border border-white/40"
                style={{
                    left: position.x,
                    top: position.y,
                    width: isHovering ? '40px' : '20px',
                    height: isHovering ? '40px' : '20px',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                    borderColor: isHovering ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                    transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s',
                }}
            />

            {/* Inner dot */}
            <div
                className="fixed pointer-events-none z-[9999] rounded-full bg-white"
                style={{
                    left: position.x,
                    top: position.y,
                    width: '4px',
                    height: '4px',
                    transform: 'translate(-50%, -50%)',
                    opacity: isHovering ? 0 : 0.8,
                    transition: 'opacity 0.2s ease-out',
                }}
            />
        </>
    );
}
