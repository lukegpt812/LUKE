import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeInUp } from '../../config/motion';
import { useState, useRef } from 'react';

/**
 * PROCESS SECTION - Animated Timeline
 * 
 * 4-step process with animated purple progress line
 * - Expandable cards on click
 * - Purple dots and connecting line
 * - Micro-examples for each step
 * 
 * To customize:
 * - Update stepsData with your process
 * - Modify examples and details
 */

const stepsData = [
    {
        number: '01',
        title: 'Discovery & Worldbuilding',
        detail: 'Deep dive into your vision, constraints, and possibilities. We map the creative and technical landscape together.',
        example: 'e.g., Mapping out an AI-driven music video concept with real-time generative visuals',
    },
    {
        number: '02',
        title: 'System & Pipeline Design',
        description: 'Architect the AI infrastructure and workflows that will bring your project to life at scale.',
        detail: 'Design custom agentic pipelines, memory systems, and multi-model workflows tailored to your specific creative and technical requirements.',
        example: 'e.g., Building an agent-based pipeline for automated scene generation and composition',
    },
    {
        number: '03',
        title: 'Production & Iteration',
        detail: 'Rapid prototyping and refinement using multi-model pipelines and agentic workflows with continuous feedback loops.',
        example: 'e.g., Iterating on visual styles through AI-assisted exploration and human-guided refinement',
    },
    {
        number: '04',
        title: 'Delivery & Expansion',
        detail: 'Ship the work and build systems for ongoing iteration, evolution, and scaling to future projects.',
        example: 'e.g., Deploying production-ready pipelines with documentation and training for your team',
    },
];

function ProcessStep({ step, index, isLast, isExpanded, onClick, progress }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <div className="flex-1 relative">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                onClick={onClick}
                className="cursor-pointer group"
            >
                {/* Step content */}
                <div className={`relative bg-white/5 backdrop-blur-sm rounded-lg p-6 border-2 transition-all duration-300 ${isExpanded ? 'border-accent-purple/50 glow-purple-sm' : 'border-white/10 hover:border-accent-purple/30'
                    }`}>
                    <div className="text-4xl font-bold text-accent-purple/30 mb-2">{step.number}</div>
                    <h3 className="text-lg font-bold text-primary-text mb-2 group-hover:text-accent-purple transition-colors duration-200">
                        {step.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed mb-3">
                        {step.detail}
                    </p>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 border-t border-white/10 mt-3">
                            <p className="text-xs text-accent-purple-light italic">
                                {step.example}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Dot marker */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-purple border-2 border-dark-bg z-10"></div>
            </motion.div>

            {/* Connecting line (desktop only) */}
            {!isLast && (
                <div className="hidden lg:block absolute -bottom-8 left-1/2 w-full h-0.5 bg-white/10">
                    <motion.div
                        className="h-full bg-accent-purple"
                        initial={{ width: '0%' }}
                        animate={{ width: progress > (index + 1) / stepsData.length ? '100%' : '0%' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                </div>
            )}
        </div>
    );
}

export default function ProcessSection() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
    const [expandedStep, setExpandedStep] = useState(null);
    const sectionRef = useRef(null);

    // Animated progress line
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start center', 'end center'],
    });

    return (
        <section id="process" ref={sectionRef} className="py-24 px-6 lg:px-12 bg-black/20">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-text">Process</h2>
                    <p className="text-lg text-secondary-text mt-4">
                        From concept to production-ready systems
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="flex flex-col lg:flex-row gap-6 relative pb-12">
                    {stepsData.map((step, index) => (
                        <ProcessStep
                            key={step.number}
                            step={step}
                            index={index}
                            isLast={index === stepsData.length - 1}
                            isExpanded={expandedStep === index}
                            onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                            progress={scrollYProgress.get()}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
