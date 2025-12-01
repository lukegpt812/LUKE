import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeInUp, staggerContainer } from '../../config/motion';
import EnhancedProjectCard from '../ui/EnhancedProjectCard';

/**
 * SELECTED WORK SECTION
 * 
 * Cinematic project cards with rich interactions
 * + Horizontal scroll strip for "Other Experiments"
 * 
 * To customize:
 * - Update projectsData array with real projects
 * - Replace gradient placeholders with actual images
 * - Modify otherExperiments array
 */

const projectsData = [
    {
        id: 1,
        category: 'MUSIC VIDEO',
        title: 'Don Toliver — No Comments',
        description: 'Official music video for Don Toliver\'s No Comments — a surreal fusion of AI-distorted atmospheres, and dreamlike motion states that expand the visual universe of modern rap aesthetics.',
        cloudflareId: 'e26deddee598800b086c788c3d6265d9', // NOCOMMENTS_DON.mp4
        tags: ['Music Video', 'AI', 'Official'],
        role: 'Director',
        year: '2025'
    },
    {
        id: 2,
        category: 'EXPERIMENTAL',
        title: 'WAKE UP F1LTHY — Carti × Travis (AI Concept)',
        description: 'A high-energy conceptual piece reimagining Playboi Carti and Travis Scott through AI built scenes and outfits.',
        cloudflareId: '22777ece6ae5576875e3c086ad86db5a', // final.mp4
        tags: ['Experimental', 'AI', 'Concept'],
        role: 'Creative Technologist',
        year: '2025'
    },
    {
        id: 3,
        category: 'FILM / AI VISUAL',
        title: 'Breaking the Ice — Batman Concept',
        description: 'A cinematic short of Batman vs. Mr. Freeze reinterpreted through AI-driven environments, stylized augmentation, and atmospheric world design — merging Gotham\'s cold mythology with next-gen visual tools.',
        cloudflareId: 'fe75828b8e176d7e9cdd0c859279d420', // BATMAN2222222.mp4
        tags: ['Film', 'AI', 'Cinematic'],
        isVertical: true,
        role: 'Creative Technologist',
        year: '2025'
    },
    {
        id: 4,
        category: 'COMMERCIAL',
        title: 'TAG Heuer — F1 Concept Campaign',
        description: 'A conceptual brand film exploring TAG Heuer\'s racing heritage through gritty motion, track-level texture, and AI-accelerated commercial storytelling for a modern Formula 1 identity.',
        cloudflareId: '03eef269edbb1b91a160638fd11c0ab2', // F1_TAG.mp4
        tags: ['Commercial', 'Brand', 'F1'],
        isVertical: true,
        role: 'Editor',
        year: '2025'
    },
];

export default function SelectedWork() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="work" ref={ref} className="py-24 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-xs text-accent-purple font-mono mb-2 tracking-wider uppercase">WORK</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-text">Selected Work</h2>
                </motion.div>

                {/* Project grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectsData.map((project, index) => (
                        <EnhancedProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
