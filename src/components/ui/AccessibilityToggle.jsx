import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ACCESSIBILITY TOGGLE
 * 
 * Toggle for reduced motion and high contrast modes
 * Saves preferences to localStorage
 * 
 * To customize:
 * - Add more accessibility options
 * - Modify styling
 */

export default function AccessibilityToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        // Load saved preferences
        const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
        const savedHighContrast = localStorage.getItem('highContrast') === 'true';

        setReducedMotion(savedReducedMotion);
        setHighContrast(savedHighContrast);

        applyPreferences(savedReducedMotion, savedHighContrast);
    }, []);

    const applyPreferences = (motion, contrast) => {
        if (motion) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
        } else {
            document.documentElement.style.setProperty('--animation-duration', '0.6s');
        }

        if (contrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    };

    const toggleReducedMotion = () => {
        const newValue = !reducedMotion;
        setReducedMotion(newValue);
        localStorage.setItem('reducedMotion', newValue.toString());
        applyPreferences(newValue, highContrast);
    };

    const toggleHighContrast = () => {
        const newValue = !highContrast;
        setHighContrast(newValue);
        localStorage.setItem('highContrast', newValue.toString());
        applyPreferences(reducedMotion, newValue);
    };

    return (
        <div className="fixed top-24 right-6 z-50">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                {/* Options panel */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-3 bg-black/90 backdrop-blur-md border border-accent-purple/30 rounded-lg p-4 space-y-3 min-w-[200px]"
                        >
                            <p className="text-xs text-accent-purple font-mono uppercase tracking-wider mb-2">
                                Accessibility
                            </p>

                            {/* Reduced Motion */}
                            <button
                                onClick={toggleReducedMotion}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
                            >
                                <span className="text-sm text-primary-text">Reduced Motion</span>
                                <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${reducedMotion ? 'bg-accent-purple' : 'bg-white/20'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform duration-200 ${reducedMotion ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                                </div>
                            </button>

                            {/* High Contrast */}
                            <button
                                onClick={toggleHighContrast}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
                            >
                                <span className="text-sm text-primary-text">High Contrast</span>
                                <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${highContrast ? 'bg-accent-purple' : 'bg-white/20'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform duration-200 ${highContrast ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                                </div>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 rounded-full bg-black/90 backdrop-blur-md border-2 border-accent-purple/50 flex items-center justify-center hover:border-accent-purple transition-all duration-200 glow-purple-sm"
                    aria-label="Accessibility options"
                >
                    <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>
            </motion.div>
        </div>
    );
}
