import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../config/motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * STAGGERED GRID COMPONENT
 * 
 * Grid wrapper that staggers children entrance animations
 * 
 * Usage:
 * <StaggeredGrid>
 *   <Card />
 *   <Card />
 *   <Card />
 * </StaggeredGrid>
 */

export default function StaggeredGrid({ children, className = '', threshold = 0.1 }) {
    const [ref, isVisible] = useScrollReveal({ threshold });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className={className}
        >
            {Array.isArray(children) ? (
                children.map((child, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                        {child}
                    </motion.div>
                ))
            ) : (
                <motion.div variants={fadeInUp}>{children}</motion.div>
            )}
        </motion.div>
    );
}
