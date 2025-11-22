import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * SCROLL PROGRESS BAR
 * 
 * Purple progress bar that fills as user scrolls through page
 * Fixed to top of viewport
 * 
 * To customize:
 * - Adjust height and colors
 * - Change position (top/bottom)
 */

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initial calculation

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-accent-purple/20 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <motion.div
                className="h-full bg-gradient-to-r from-accent-purple to-accent-purple-light glow-purple-sm"
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
            />
        </motion.div>
    );
}
