import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LOADING SCREEN
 * 
 * "Luke OS booting..." animation on first visit
 * Shows system initialization sequence
 * 
 * To customize:
 * - Adjust boot sequence messages
 * - Modify animation timing
 * - Change logo/branding
 */

const bootSequence = [
    'Initializing Luke OS...',
    'Loading AI modules...',
    'Connecting to creative systems...',
    'Booting interface...',
];

export default function LoadingScreen({ onComplete }) {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if user has visited before
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (hasVisited) {
            setIsLoading(false);
            onComplete?.();
            return;
        }

        // Boot sequence
        const messageInterval = setInterval(() => {
            setCurrentMessage(prev => {
                if (prev < bootSequence.length - 1) {
                    return prev + 1;
                }
                clearInterval(messageInterval);
                return prev;
            });
        }, 600);

        // Progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setIsLoading(false);
                        sessionStorage.setItem('hasVisited', 'true');
                        onComplete?.();
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 bg-dark-bg z-[9999] flex items-center justify-center"
                >
                    <div className="text-center space-y-8 max-w-md px-6">
                        {/* Logo/Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-2">
                                LUKE OS
                            </h1>
                            <p className="text-sm text-accent-purple font-mono">v2.0.24</p>
                        </motion.div>

                        {/* Boot messages */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="h-6"
                        >
                            <p className="text-sm text-secondary-text font-mono">
                                {bootSequence[currentMessage]}
                            </p>
                        </motion.div>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-2"
                        >
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent-purple"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                            <p className="text-xs text-secondary-text/50 font-mono">
                                {Math.round(progress)}%
                            </p>
                        </motion.div>

                        {/* Scan line effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-30">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/10 to-transparent h-32 animate-scan-line"></div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
