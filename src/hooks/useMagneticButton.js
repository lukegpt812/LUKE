import { useEffect, useRef, useState } from 'react';

/**
 * USE MAGNETIC BUTTON HOOK
 * 
 * Creates magnetic effect where button "pulls" cursor toward it
 * 
 * Usage:
 * const magneticRef = useMagneticButton();
 * <button ref={magneticRef}>Click me</button>
 */

export function useMagneticButton(strength = 0.3) {
    const ref = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
            element.style.transition = 'transform 0.2s ease-out';
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            element.style.transform = 'translate(0, 0)';
            element.style.transition = 'transform 0.4s ease-out';
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
        };
    }, [strength]);

    return ref;
}
