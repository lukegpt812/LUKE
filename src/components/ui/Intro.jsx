import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Intro({ onComplete }) {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('INITIALIZING SYSTEM...');

    useEffect(() => {
        // Counter animation
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment for "realistic" loading feel
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (count < 30) setText('INITIALIZING SYSTEM...');
        else if (count < 70) setText('LOADING ASSETS...');
        else if (count < 90) setText('ESTABLISHING CONNECTION...');
        else setText('READY');
    }, [count]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
            initial={{ y: 0 }}
            animate={{ y: count >= 100 ? '-100%' : 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
            onAnimationComplete={() => {
                if (count >= 100) onComplete();
            }}
        >
            <div className="w-64">
                {/* Progress Bar */}
                <div className="h-1 w-full bg-white/10 mb-4 overflow-hidden">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(count, 100)}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>

                {/* Status Text & Percentage */}
                <div className="flex justify-between items-end">
                    <span className="text-xs font-bold tracking-widest text-white/60 uppercase">
                        {text}
                    </span>
                    <span className="text-4xl font-bold tracking-tighter">
                        {Math.min(count, 100)}%
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
