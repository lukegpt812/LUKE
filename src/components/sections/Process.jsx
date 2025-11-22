import { motion } from 'framer-motion';

/**
 * PROCESS SECTION
 * 
 * Style: Storyboard / Production Pipeline.
 * 
 * Maintenance:
 * - Update `steps` to reflect current workflow.
 */

const steps = [
    {
        id: '01',
        title: 'Vision & World Design',
        description: 'Defining the narrative spine, visual language, and aesthetic rules that guide every creative decision.'
    },
    {
        id: '02',
        title: 'Pipeline Engineering',
        description: 'Architecting the custom workflow—blending AI models, motion systems, and VFX into a unified production engine.'
    },
    {
        id: '03',
        title: 'Shoot, Capture & Generation',
        description: 'Combining principal photography with synthetic asset generation to build the raw ingredients of the world.'
    },
    {
        id: '04',
        title: 'Assembly, Enhancement & Deployment',
        description: 'Editing, compositing, and refining the final look for multi-platform distribution and long-term brand impact.'
    }
];

export default function Process() {
    return (
        <section id="process" className="py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16 md:mb-24">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-accent-purple uppercase mb-2 block">
                        WORKFLOW
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Production Pipeline
                    </h2>
                </div>

                <div className="relative">
                    {/* Animated Timeline Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-[1px] bg-white/20 origin-left hidden md:block"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pt-8 md:pt-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="group relative"
                            >
                                {/* Step Number/Icon */}
                                <div className={`text-4xl font-light mb-6 font-mono transition-colors duration-500 ${step.highlight ? 'text-accent-purple' : 'text-white/20 group-hover:text-accent-purple'
                                    }`}>
                                    {step.id}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-sm text-white/50 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
