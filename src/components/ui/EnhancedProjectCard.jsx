import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

/**
 * ENHANCED PROJECT CARD
 * 
 * Style: Film Slate / Keyframe.
 * Behavior: Always shows video, clickable to view full project.
 * 
 * Maintenance:
 * - Adjust `aspect-video` if different card ratio is needed.
 */

export default function EnhancedProjectCard({ project, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/project/${project.id}`);
    };

    // Format index as 01, 02, etc.
    const formattedIndex = (index + 1).toString().padStart(2, '0');

    return (
        <div
            className="group relative w-full cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {/* Main Card Container - Film Slate Aspect Ratio */}
            <div className="relative aspect-video overflow-hidden bg-black rounded-sm border border-white/5 group-hover:border-accent-purple/50 transition-colors duration-500">
                {/* Video - Always Playing */}
                {/* Video - Conditional Render for Cloudflare or Standard */}
                {project.cloudflareId ? (
                    <iframe
                        src={`https://iframe.videodelivery.net/${project.cloudflareId}?background=1&autoplay=true&loop=true&muted=true&preload=true&responsive=false&fit=cover`}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={true}
                        title={project.title}
                    />
                ) : (
                    <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                )}

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10" />

                {/* Content - Premium Layout */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
                    {/* Top Row: Index & Category */}
                    <div className="flex justify-between items-start">
                        <span className="text-4xl md:text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500 font-['Space_Grotesk']">
                            {formattedIndex}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase border border-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                                {project.category}
                            </span>
                        </div>
                    </div>

                    {/* Bottom Row: Title & Details */}
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-none font-['Space_Grotesk']">
                            {project.title}
                        </h3>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            <div>
                                <span className="block text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">Role</span>
                                <span className="text-sm text-white font-medium">{project.role}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">Year</span>
                                <span className="text-sm text-white font-medium">{project.year}</span>
                            </div>
                        </div>

                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm text-white/60 font-light leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
