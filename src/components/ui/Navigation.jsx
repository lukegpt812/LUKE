import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NAVIGATION COMPONENT
 * 
 * Style: Minimal, cinematic, sticky.
 * Behavior: Smooth scroll, active state tracking.
 */

const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Determine active section based on scroll position
            const sections = navLinks.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 100; // Offset for better UX

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="relative group"
                    >
                        <motion.img
                            src="https://placehold.co/100x100/1a1a1a/ffffff?text=L"
                            alt="Luke Abad"
                            className="h-32 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            animate={{
                                opacity: [0.8, 1, 0.8],
                                filter: ['drop-shadow(0 0 0px rgba(255,255,255,0))', 'drop-shadow(0 0 8px rgba(255,255,255,0.3))', 'drop-shadow(0 0 0px rgba(255,255,255,0))']
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-10">
                        {navLinks.map((link) => {
                            const sectionId = link.href.substring(1);
                            const isActive = activeSection === sectionId;

                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`text-xs font-medium uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white z-50 relative focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`w-full h-[1px] bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            ></span>
                            <span
                                className={`w-full h-[1px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                                    }`}
                            ></span>
                            <span
                                className={`w-full h-[1px] bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black z-40 md:hidden flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="flex flex-col space-y-8 text-center"
                        >
                            {navLinks.map((link, index) => {
                                const sectionId = link.href.substring(1);
                                const isActive = activeSection === sectionId;

                                return (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        className={`text-2xl font-light uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-accent-purple' : 'text-white/60 hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
