import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * ANIMATED UNDERLINE LINK
 * 
 * Link with purple underline that animates left-to-right on hover
 * 
 * Usage:
 * <AnimatedUnderlineLink href="#section">
 *   Link Text
 * </AnimatedUnderlineLink>
 */

export default function AnimatedUnderlineLink({
    href,
    children,
    onClick,
    className = ''
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={href}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative inline-block ${className}`}
        >
            {children}
            <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-accent-purple"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : 0 }}
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            />
        </a>
    );
}
