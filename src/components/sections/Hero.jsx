import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import MagneticButton from '../ui/MagneticButton';


/**
 * HERO SECTION - "LUKE OS BOOT SCREEN" -> "CINEMATIC OPENING"
 * 
 * Full viewport immersive video experience.
 * Style: Key Art / Title Sequence.
 * 
 * Maintenance:
 * - Update `showreelVideos` (in parent or context) to change background footage.
 * - Update `creditsItems` to change the "film credits" text.
 * - Adjust animation delays in `motion.div` props for timing.
 */

const creditsItems = [
    { label: 'DIRECTOR', value: 'LUKE ABAD' },
    { label: 'LOCATION', value: 'LOS ANGELES' },
    { label: 'FOCUS', value: 'NARRATIVE & SYSTEMS' },
];

// Consolidated Hero Video (Master Montage)
const HERO_VIDEO_ID = '392db2abc5f0d8c40bbc46b0c207fa03';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    const scrollToSection = (id) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Robust scaling style to ensure coverage
    const iframeStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        pointerEvents: 'none',
        objectFit: 'cover',
        zIndex: -1
    };

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
            {/* Master Video Layer */}
            <div className="absolute inset-0 z-0">
                <iframe
                    src={`https://iframe.videodelivery.net/${HERO_VIDEO_ID}?background=1&autoplay=true&loop=true&muted=true&preload=true&responsive=false&fit=cover&playsinline=true&controls=false`}
                    style={iframeStyle}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen={true}
                    title="Hero Master Video"
                />
            </div>

            {/* Cinematic Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10 pointer-events-none" />

            {/* Content Overlay - Key Art Layout */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-16">
                {/* Bottom Bar: Credits & CTA */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
                    {/* Credits - Film Slate Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="flex self-start md:self-auto gap-4 md:gap-12"
                    >
                        {creditsItems.map((item, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{item.label}</span>
                                <span className="text-xs md:text-sm font-medium tracking-widest text-white/90">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 2.0 }}
                        className="flex flex-col items-end gap-4 md:gap-6"
                    >
                        <p className="text-right max-w-md text-white/80 text-sm md:text-xl font-light leading-relaxed mix-blend-difference tracking-wide">
                            Building the next generation of visual storytelling.
                        </p>
                        <MagneticButton onClick={() => scrollToSection('#work')}>
                            <span className="relative z-10 flex items-center gap-2 md:gap-3 text-xs md:text-sm tracking-widest uppercase">
                                Initialize
                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </span>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
