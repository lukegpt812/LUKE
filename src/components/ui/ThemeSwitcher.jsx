import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * THEME SWITCHER
 * 
 * Toggle between purple (default) and alternative accent colors
 * Saves preference to localStorage
 * 
 * To customize:
 * - Add more color themes
 * - Modify theme colors
 * - Adjust transition duration
 */

const themes = {
    purple: {
        name: 'Purple',
        primary: '#8A5BFF',
        dark: '#5B35D6',
        light: '#A78BFA',
    },
    cyan: {
        name: 'Cyan',
        primary: '#00D9FF',
        dark: '#0099CC',
        light: '#66E5FF',
    },
    green: {
        name: 'Green',
        primary: '#00FF88',
        dark: '#00CC6A',
        light: '#66FFB3',
    },
};

export default function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState('purple');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load saved theme
        const saved = localStorage.getItem('theme');
        if (saved && themes[saved]) {
            setCurrentTheme(saved);
            applyTheme(saved);
        }
    }, []);

    const applyTheme = (themeName) => {
        const theme = themes[themeName];
        document.documentElement.style.setProperty('--accent-purple', theme.primary);
        document.documentElement.style.setProperty('--accent-purple-dark', theme.dark);
        document.documentElement.style.setProperty('--accent-purple-light', theme.light);
    };

    const handleThemeChange = (themeName) => {
        setCurrentTheme(themeName);
        applyTheme(themeName);
        localStorage.setItem('theme', themeName);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                {/* Theme options */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mb-3 bg-black/90 backdrop-blur-md border border-accent-purple/30 rounded-lg p-3 space-y-2"
                    >
                        {Object.entries(themes).map(([key, theme]) => (
                            <button
                                key={key}
                                onClick={() => handleThemeChange(key)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${currentTheme === key
                                        ? 'bg-white/10'
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <div
                                    className="w-6 h-6 rounded-full border-2 border-white/20"
                                    style={{ backgroundColor: theme.primary }}
                                />
                                <span className="text-sm text-primary-text font-medium">{theme.name}</span>
                                {currentTheme === key && (
                                    <svg className="w-4 h-4 text-accent-purple ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Toggle button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 rounded-full bg-black/90 backdrop-blur-md border-2 border-accent-purple/50 flex items-center justify-center hover:border-accent-purple transition-all duration-200 glow-purple-sm"
                    aria-label="Theme switcher"
                >
                    <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                </button>
            </motion.div>
        </div>
    );
}
