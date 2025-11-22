import { motion } from 'framer-motion';

/**
 * SERVICES SECTION
 * 
 * Focus: Creative outcomes for artists, brands, and founders.
 * Style: Film slate aesthetic, clean typography, subtle interactions.
 * 
 * Maintenance:
 * - Update `services` array to change offerings.
 * - Adjust `features` list for specific capabilities.
 */

const services = [
    {
        title: "AI-Native Filmmaking",
        description: "Cinematic music videos, experimental films, and advanced visual narratives powered by custom generative pipelines. Blending live-action direction, worldbuilding, and AI-driven imagery to create visuals that feel impossible anywhere else.",
        clients: "Artists, Labels, Studios",
        features: [
            "Generative Cinematography",
            "AI-Enhanced VFX & Compositing",
            "Narrative Worldbuilding",
            "Experimental Music Visuals"
        ]
    },
    {
        title: "Brand Worlds & Creative Direction",
        description: "Campaigns, identities, and high-impact visuals for next-gen brands. Designing worlds, looks, and launch moments that define culture, connect with audiences, and establish long-term creative value.",
        clients: "Founders, Tech Brands, Fashion, Entertainment",
        features: [
            "Campaign & Launch Strategy",
            "Aesthetic Identity Systems",
            "Brand Films & Concept Spots",
            "Social & Editorial Assets"
        ]
    },
    {
        title: "Future Pipelines & Creative Infrastructure",
        description: "Building the workflows, models, and hybrid pipelines behind next-generation creative production. Custom tools, fine-tuned models, and AGI-adjacent systems that merge production with emergent intelligence.",
        clients: "Internal R&D, Tech Partners, Creative Labs",
        features: [
            "Custom Workflow Architecture",
            "Model Training & Fine-Tuning",
            "Experimental Tooling & Automation",
            "AGI-Facing Pipeline R&D"
        ]
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header - Film Slate Style */}
                <div className="mb-16 md:mb-24 border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-accent-purple uppercase mb-2 block">
                            WHAT I DO
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                            Creative Services
                        </h2>
                    </div>
                    <p className="text-white/60 max-w-md text-right mt-4 md:mt-0 font-light">
                        Partnering with visionaries to build the impossible.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors duration-300">
                                {service.title}
                            </h3>

                            <p className="text-white/60 font-light leading-relaxed mb-8 min-h-[80px]">
                                {service.description}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                                        Focus
                                    </span>
                                    <p className="text-sm text-white/80 font-medium">
                                        {service.clients}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                                                <span className="w-1 h-1 bg-accent-purple rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
