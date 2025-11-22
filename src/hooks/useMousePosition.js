import { useState, useEffect } from 'react';

/**
 * USE MOUSE POSITION HOOK
 * 
 * Tracks mouse position for reactive effects
 * Returns normalized coordinates (0-1) relative to viewport
 */

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
}
