import { motion } from 'framer-motion';

/**
 * LABS SECTION
 * 
 * Focus: Director's Statement and R&D Experiments.
 * Style: Editorial layout, manifesto style text.
 * 
 * Maintenance:
 * - Update `experiments` array to add new R&D projects.
 * - Edit the "Manifesto" text to reflect current vision.
 */

const experiments = [
    {
        id: '01',
        title: 'AI MEMORY LAYER',
        status: 'PROTOTYPE',
        description: 'Persistent context for long-form narrative generation. Solving the consistency problem.'
    },
    {
        id: '02',
        title: 'AGENTIC PIPELINES',
        status: 'ACTIVE',
        description: 'Autonomous multi-agent systems for VFX workflows. From script to rough cut.'
    },
    {
        id: '03',
        title: 'REAL-TIME STYLE TRANSFER',
        status: 'BETA',
        description: 'Low-latency style injection for live broadcast and performance.'
    }
];

export default function Labs() {
    return (
        <section id="labs" className="py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Director's Statement */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[10px] font-bold tracking-[0.2em] text-accent-purple uppercase mb-6 block">
                                MANIFESTO
                            </span>
                            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-8">
                                We are entering the era of <span className="text-white/60">infinite cinema</span>.
                            </h2>
                            <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
                                <p>
                                    AI is not just a tool; it is a new medium. It allows us to collapse the distance between imagination and realization. My work focuses on building the infrastructure that enables this shift—moving from traditional production pipelines to fluid, generative workflows.
                                </p>
                                <p>
                                    I believe the next generation of filmmakers will be systems architects. We are no longer just directing actors and cameras; we are directing intelligence. By designing custom models and agentic workflows, we can tell stories that were previously impossible to produce.
                                </p>
                                <p>
                                    The goal is not automation, but amplification. To give artists the ability to explore vast narrative spaces and execute complex visual ideas with the speed of thought.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Experiments / R&D */}
                    <div className="lg:col-span-5">
                        <div className="border-l border-white/10 pl-8 md:pl-12 py-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-8 block">
                                STUDIO R&D
                            </span>
                            <div className="space-y-12">
                                {experiments.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.2 }}
                                        className="group"
                                    >
                                        <div className="flex items-baseline justify-between mb-2">
                                            <h3 className="text-lg font-medium text-white group-hover:text-accent-purple transition-colors">
                                                {exp.title}
                                            </h3>
                                            <span className="text-[10px] font-mono text-accent-purple border border-accent-purple/30 px-2 py-0.5 rounded-full">
                                                {exp.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/50 font-light">
                                            {exp.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
