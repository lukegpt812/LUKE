import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeInUp } from '../../config/motion';

/**
 * CONCEPTS SECTION
 * 
 * Gallery showcasing concept art and design explorations
 * - Tabbed interface
 * - Masonry-style grid layout
 * - Hover effects
 */

const conceptsData = [
    {
        id: 1,
        title: 'Sculptural Armor Studies',
        category: 'CONCEPT DESIGN',
        image: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/96b455bf-9c3c-4fff-ecff-ec421c841600/public',
        description: 'Explorations in form-driven fashion, inspired by industrial materials, character design, and worldbuilding silhouettes.',
    },
    {
        id: 2,
        title: 'Jewelry & Artifact Systems',
        category: 'PRODUCT DESIGN',
        cloudflareId: 'a133a210bee40136a1372dd946cd594d', // letsgo.mp4
        description: 'High-fidelity object studies for cinematic assets, blending luxury materials with post-apocalyptic motifs.',
    },
    {
        id: 3,
        title: 'Prop and Material Design',
        category: 'DESIGN LANGUAGE',
        image: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/4a1f3184-8d3e-40b7-9350-472a72c6dd00/public',
        description: 'Comprehensive study of props and materials, exploring distressed surfaces and industrial textures to define the physical language of the world.',
    },
    {
        id: 4,
        title: 'Material & Surface Research',
        category: 'TEXTURE + DETAILING',
        image: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/95cfa9cc-d40a-45d3-a0da-fc132332d100/public',
        description: 'Close-range studies of wear, heat, metal, and industrial decay for use in worldbuilding and prop design.',
    },
    {
        id: 5,
        title: 'Graphic Identity Experiments',
        category: 'DESIGN LANGUAGE',
        image: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/27ba8221-4bcd-4b49-9e26-0219b65f1f00/public',
        description: 'Visual identity explorations combining poster design, color theory, and AI-enhanced composition.',
    },
    {
        id: 6,
        title: 'Stage Architecture & Spatial Systems',
        category: 'SET + ARCHITECTURE',
        image: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/c746e984-1aed-4c35-3b9e-01c12db9f300/public',
        description: 'Blueprint-driven explorations of stage design, spatial rhythm, and modular performance environments.',
    },
];

const tabs = [
    { id: 'octane', label: 'OCTANE ROLLOUT' },
    { id: 'batman', label: 'BATMAN' },
    { id: 'archive', label: 'ARCHIVE' },
];

const batmanData = [
    {
        id: 'b1',
        title: 'Freeze Lair Environment',
        category: 'ENVIRONMENT DESIGN',
        image: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Freeze+Lair', // PLACEHOLDER
        description: 'A visceral study of cryogenic atmospheres, exploring sub-zero lighting dynamics and industrial frost textures for Mr. Freeze’s sanctuary.',
    },
    {
        id: 'b2',
        title: 'Batpod Tech Demo',
        category: 'VEHICLE DESIGN',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'High-octane technical demonstration of the Batpod, focusing on suspension kinematics, tire deformation, and volumetric lighting integration.',
    },
    {
        id: 'b3',
        title: 'Alley Confrontation',
        category: 'KEYFRAME ART',
        image: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Alley+Confrontation', // PLACEHOLDER
        description: 'Noir-inspired atmospheric keyframe establishing the gritty, rain-slicked tonal palette of a high-stakes street confrontation.',
    },
    {
        id: 'b4',
        title: 'Suit Interface Schematics',
        category: 'UI DESIGN',
        image: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Suit+Schematics', // PLACEHOLDER
        description: 'Schematic breakdown of the tactical suit interface, detailing HUD overlays, biometric telemetry, and armor integrity systems.',
    },
    {
        id: 'b5',
        title: 'Complex Character Animation',
        category: 'CHARACTER ANIMATION',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'Advanced locomotion study analyzing weight distribution, cloth simulation, and combat fluidity in complex character animation.',
    },
    {
        id: 'b6',
        title: 'Suit Silhouette',
        category: 'COSTUME DESIGN',
        image: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Suit+Silhouette', // PLACEHOLDER
        description: 'Iconographic silhouette exploration emphasizing the cowl geometry, cape physics, and the symbolic weight of the insignia.',
    },
];

const archiveData = [
    {
        id: 'a1',
        title: 'Don Toliver - Austin Show',
        category: 'SHOW RECAP',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'Immersive recap of the Austin performance, blending raw handheld energy with surreal, custom-rendered 3d worlds.',
    },
    {
        id: 'a2',
        title: 'Don Toliver - Rolling Loud',
        category: 'EVENT RECAP',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'Definitive festival coverage featuring analog CRT processing, datamosh transitions, and high-fidelity 3D integration.',
    },
    {
        id: 'a3',
        title: 'Noah Lyles Olympic Promo',
        category: 'CONCEPTUAL',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'Kinetic promotional campaign for Olympic champion Noah Lyles, visualizing raw speed through motion blur and dynamic camera work.',
    },
    {
        id: 'a4',
        title: 'MCDAAG',
        category: 'EVENT',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'Highlight reel for the McDonald’s All American Games, capturing the explosive athleticism of the next generation of basketball stars.',
    },
    {
        id: 'a5',
        title: 'Saudi Bustan',
        category: 'FESTIVAL RECAP',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'Cinematic journey through the MDL BEAST festival in Riyadh, juxtaposing vast desert landscapes with the electric pulse of live performance.',
    },
    {
        id: 'a6',
        title: 'Braman Ad Campaign',
        category: 'COMMERCIAL',
        image: 'https://example.com/placeholder.mp4', // PLACEHOLDER
        isVideo: true,
        description: 'Avant-garde commercial campaign utilizing generative AI to create surreal, impossible imagery for a luxury automotive brand.',
    },
];

export default function Concepts() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
    const [activeTab, setActiveTab] = useState('octane');

    const getActiveData = () => {
        switch (activeTab) {
            case 'octane': return conceptsData;
            case 'batman': return batmanData;
            case 'archive': return archiveData;
            default: return [];
        }
    };

    const activeData = getActiveData();

    return (
        <section
            id="concepts"
            ref={ref}
            className="py-24 px-6 lg:px-12 relative overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="mb-12 text-center"
                >
                    <p className="text-accent-purple font-mono text-sm uppercase tracking-wider mb-4">
                        Visual Explorations
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-8">
                        Concepts
                    </h2>

                    {/* Tabs */}
                    <div className="flex justify-center gap-8 border-b border-white/10 pb-4 mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm font-mono uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${activeTab === tab.id
                                    ? 'text-accent-purple'
                                    : 'text-secondary-text hover:text-primary-text'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-purple"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {activeData.map((concept, index) => (
                            <motion.div
                                key={concept.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer bg-white/5"
                            >
                                {/* Media (Image, Video, or Cloudflare Stream) */}
                                {concept.cloudflareId ? (
                                    <iframe
                                        src={`https://iframe.videodelivery.net/${concept.cloudflareId}?background=1&autoplay=true&loop=true&muted=true&preload=true&responsive=false&fit=cover`}
                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                        title={concept.title}
                                    />
                                ) : concept.isVideo ? (
                                    <video
                                        src={concept.image}
                                        muted
                                        loop
                                        autoPlay
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <img
                                        src={concept.image}
                                        alt={concept.title}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                {/* Border on hover */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-purple/50 transition-colors duration-300 rounded-lg"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-accent-purple text-xs font-mono uppercase tracking-wider mb-2">
                                        {concept.category}
                                    </p>
                                    <h3 className="text-xl font-bold text-primary-text mb-2">
                                        {concept.title}
                                    </h3>
                                    <p className="text-secondary-text text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {concept.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
