import { motion } from 'framer-motion';
import { useMagneticButton } from '../../hooks/useMagneticButton';

/**
 * MAGNETIC BUTTON
 * 
 * Style: Premium, subtle interaction.
 */

export default function MagneticButton({
    children,
    onClick,
    variant = 'primary',
    className = '',
    ...props
}) {
    const magneticRef = useMagneticButton(0.4);

    const variants = {
        primary: 'px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-white/90 transition-all duration-300 relative overflow-hidden group',
        secondary: 'px-8 py-4 bg-transparent text-white font-medium rounded-sm border border-white/20 hover:border-white/50 transition-all duration-300',
        ghost: 'px-6 py-3 text-white/60 font-medium hover:text-white transition-all duration-300',
    };

    return (
        <motion.button
            ref={magneticRef}
            onClick={onClick}
            className={`${variants[variant]} ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
}
