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

// Showreel videos - cycling background footage
const videoSources = [
    '624e8c9a7dd7903f36233955514cf603', // BATMANFINAL1.mp4
    'fe75828b8e176d7e9cdd0c859279d420', // BATMAN2222222.mp4
    '03eef269edbb1b91a160638fd11c0ab2', // F1_TAG.mp4
    '11ce7714c7145cf8de1ea4ec4bd12529', // STORY.mp4
    '8ca5f98ce4b8d5c4feb6c31bb25bc07d', // Don Bape Revision.mp4
    '157b1d1d084c6792d579493bf1d1d5da', // Don Rolling Loud 2.mp4
    '931e264955f0b02b5012e68b83d11334', // Noah Lyles Olympic Promo.mp4
    '1a2fb74818e37ae33f0d9b03e65de40d', // Bike.mp4
    '78a754c1d7e4a9dda0172e07abbeef47', // letsgo.mp4
    '41e970ca49041730ee7667e06d91bbb2', // rrrrrrr.mp4
    '22777ece6ae5576875e3c086ad86db5a', // final.mp4
    '12c3701a35b8557bbbde1d379c8184ef', // MCDAAG.mp4
    '5b4a22ef3695e1d3efa83959e6e37e32', // Nascar Austin.mp4
    'e26deddee598800b086c788c3d6265d9', // NOCOMMENTS_DON.mp4
    '100023835f44a31dc7f93a3497648c1d', // Vehicle.mp4
    '115b2592db0b3716c559ed95bf446dde', // complex.mp4
];

export default function Hero() {
    // Video Source Management (Shuffle Deck)
    const [videoDeck, setVideoDeck] = useState([]);
    const [currentDeckIndex, setCurrentDeckIndex] = useState(0);

    // Initialize/Shuffle Deck
    useEffect(() => {
        const shuffle = (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };
        setVideoDeck(shuffle(videoSources));
    }, []);

    // Double Buffer State
    const [frontVideo, setFrontVideo] = useState(null);
    const [backVideo, setBackVideo] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const frontRef = useRef(null);
    const backRef = useRef(null);
    const containerRef = useRef(null);

    // Initialize First Video
    useEffect(() => {
        if (videoDeck.length > 0 && !frontVideo) {
            setFrontVideo(videoDeck[0]);
            setBackVideo(videoDeck[1] || videoDeck[0]);
            setCurrentDeckIndex(1);
        }
    }, [videoDeck]);

    // Cycle Logic
    useEffect(() => {
        if (videoDeck.length === 0) return;

        const cycleInterval = setInterval(() => {
            setIsTransitioning(true);

            // Prepare next video index
            let nextIndex = currentDeckIndex + 1;
            if (nextIndex >= videoDeck.length) {
                nextIndex = 0;
                // Optional: Reshuffle here if desired, but simple loop is safer for now
            }

            setTimeout(() => {
                // Swap Back to Front
                setFrontVideo(backVideo);
                setIsTransitioning(false);

                // Load New Back
                setBackVideo(videoDeck[nextIndex]);
                setCurrentDeckIndex(nextIndex);
            }, 2000); // Transition duration

        }, 5000); // 3s play + 2s transition = 5s total interval

        return () => clearInterval(cycleInterval);
    }, [videoDeck, currentDeckIndex, backVideo]);

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
            {/* Back Layer (Next Video) */}
            <div className="absolute inset-0 z-0">
                {backVideo && (
                    <iframe
                        key={backVideo}
                        src={`https://iframe.videodelivery.net/${backVideo}?background=1&autoplay=true&loop=true&muted=true&preload=true&responsive=false&fit=cover`}
                        style={iframeStyle}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={true}
                        title="Background Video"
                    />
                )}
            </div>

            {/* Front Layer (Current Video) */}
            <motion.div
                className="absolute inset-0 z-1"
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 2.0, ease: "linear" }}
            >
                {frontVideo && (
                    <iframe
                        key={frontVideo}
                        src={`https://iframe.videodelivery.net/${frontVideo}?background=1&autoplay=true&loop=true&muted=true&preload=true&responsive=false&fit=cover`}
                        style={iframeStyle}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={true}
                        title="Foreground Video"
                    />
                )}
            </motion.div>

            {/* Cinematic Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10 pointer-events-none" />

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
