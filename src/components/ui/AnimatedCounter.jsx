import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useState, useEffect } from 'react';

/**
 * ANIMATED COUNTER
 * 
 * Counts up from 0 to target value when scrolled into view
 * 
 * Usage:
 * <AnimatedCounter end={150} duration={2} suffix="+" />
 */

export default function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }) {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isVisible && !hasAnimated) {
            setHasAnimated(true);
            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000);

                if (progress < 1) {
                    setCount(Math.floor(end * progress));
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isVisible, end, duration, hasAnimated]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count}{suffix}
        </span>
    );
}
