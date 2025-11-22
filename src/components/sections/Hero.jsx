import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import MagneticButton from '../ui/MagneticButton';
import { Stream } from '@cloudflare/stream-react';

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

// Showreel videos - cycling background footage
const videoSources = [
    '624e8c9a7dd7903f36233955514cf603', // BATMANFINAL1.mp4 (Cloudflare ID)
    'https://example.com/placeholder.mp4', // BATMAN2222222.mp4
    '03eef269edbb1b91a160638fd11c0ab2', // F1_TAG.mp4 (Cloudflare ID)
    'https://example.com/placeholder.mp4', // STORY.mp4
    '8ca5f98ce4b8d5c4feb6c31bb25bc07d', // Don Bape Revision.mp4 (Cloudflare ID)
    'https://example.com/placeholder.mp4', // Don Rolling Loud 2.mp4
    '931e264955f0b02b5012e68b83d11334', // Noah Lyles Olympic Promo.mp4 (Cloudflare ID)
    '1a2fb74818e37ae33f0d9b03e65de40d', // Bike.mp4 (Cloudflare ID)
    'https://example.com/placeholder.mp4', // letsgo.mp4
    '41e970ca49041730ee7667e06d91bbb2', // rrrrrrr.mp4 (Cloudflare ID)
    'https://example.com/placeholder.mp4', // final.mp4
    'https://example.com/placeholder.mp4', // MCDAAG.mp4
    'https://example.com/placeholder.mp4', // Nascar Austin.mp4
    'https://example.com/placeholder.mp4', // NOCOMMENTS_DON.mp4
];

export default function Hero() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(() =>
        Math.floor(Math.random() * videoSources.length)
    );
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Auto-cycle videos with random selection
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(() => {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * videoSources.length);
                } while (newIndex === currentVideoIndex && videoSources.length > 1);
                return newIndex;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [currentVideoIndex]);

    // Random start time for each video
    useEffect(() => {
        if (videoRef.current) {
            const randomStart = Math.random() * 10;
            if (videoRef.current.duration > 10) {
                videoRef.current.currentTime = randomStart;
            }
        }
    }, [currentVideoIndex]);

    const scrollToSection = (id) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
            {/* Full Screen Video Background */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentVideoIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    {videoSources[currentVideoIndex].includes('.') ? (
                        // Standard Video (Placeholder)
                        <video
                            key={`video-${currentVideoIndex}`}
                            ref={videoRef}
                            src={videoSources[currentVideoIndex]}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                            onLoadedMetadata={(e) => {
                                const randomStart = Math.random() * (e.target.duration * 0.5);
                                e.target.currentTime = randomStart;
                            }}
                        />
                    ) : (
                        // Cloudflare Stream
                        <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
                            <div className="relative w-full h-full">
                                <Stream
                                    src={videoSources[currentVideoIndex]}
                                    autoplay
                                    loop
                                    muted
                                    controls={false}
                                    responsive={false}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {/* Digital Noise Overlay - Removed missing asset */}
                    {/* <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div> */}
                </motion.div>
            </AnimatePresence>

            {/* Cinematic Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10" />

            {/* Content Overlay - Key Art Layout */}
            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-16">
                {/* Bottom Bar: Credits & CTA */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    {/* Credits - Film Slate Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="hidden md:flex gap-12"
                    >
                        {creditsItems.map((item, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{item.label}</span>
                                <span className="text-sm font-medium tracking-widest text-white/90">
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
                        className="flex flex-col items-end gap-6"
                    >
                        <p className="text-right max-w-md text-white/80 text-xl font-light leading-relaxed mix-blend-difference tracking-wide">
                            Building the next generation of visual storytelling.
                        </p>
                        <MagneticButton onClick={() => scrollToSection('#work')}>
                            <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest uppercase">
                                Initialize
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
