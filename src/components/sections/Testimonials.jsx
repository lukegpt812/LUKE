import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * TESTIMONIALS CAROUSEL
 * 
 * Rotating quotes from clients and collaborators
 * Auto-advances with manual controls
 * 
 * To customize:
 * - Update testimonialsData with real quotes
 * - Adjust auto-advance timing
 * - Modify styling
 */

const testimonialsData = [
    {
        id: 1,
        quote: "Luke's ability to blend AI systems with creative vision is unmatched. He doesn't just use AI—he builds entirely new production paradigms.",
        author: "Sarah Chen",
        role: "Creative Director, Major Label",
    },
    {
        id: 2,
        quote: "Working with Luke transformed our entire approach to content creation. His agentic pipelines cut our production time by 70% while elevating quality.",
        author: "Marcus Rodriguez",
        role: "Founder, Tech Startup",
    },
    {
        id: 3,
        quote: "The infrastructure Luke built for us isn't just a tool—it's a creative collaborator that learns and evolves with our team.",
        author: "Emma Thompson",
        role: "Head of Production, Agency",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    // Auto-advance every 6 seconds
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isVisible]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section id="testimonials" ref={ref} className="py-24 px-6 lg:px-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <p className="text-xs text-accent-purple font-mono mb-2 tracking-wider uppercase">TESTIMONIALS</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-text">What People Say</h2>
                </motion.div>

                {/* Carousel */}
                <div className="relative min-h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center space-y-8"
                        >
                            {/* Quote */}
                            <div className="relative">
                                <svg
                                    className="absolute -top-4 -left-4 w-12 h-12 text-accent-purple/20"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-xl md:text-2xl text-primary-text leading-relaxed italic px-8">
                                    "{testimonialsData[currentIndex].quote}"
                                </p>
                            </div>

                            {/* Author */}
                            <div>
                                <p className="text-lg font-bold text-accent-purple">
                                    {testimonialsData[currentIndex].author}
                                </p>
                                <p className="text-sm text-secondary-text mt-1">
                                    {testimonialsData[currentIndex].role}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots navigation */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-accent-purple w-8'
                                    : 'bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
