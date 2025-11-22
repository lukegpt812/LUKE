import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeInUp } from '../../config/motion';

/**
 * FADE IN ON SCROLL COMPONENT
 * 
 * Reusable wrapper for scroll-triggered fade-in animations
 * Uses consistent motion config from central system
 * 
 * Usage:
 * <FadeInOnScroll delay={0.2}>
 *   <YourContent />
 * </FadeInOnScroll>
 */

export default function FadeInOnScroll({ children, delay = 0, threshold = 0.1, className = '' }) {
    const [ref, isVisible] = useScrollReveal({ threshold });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
