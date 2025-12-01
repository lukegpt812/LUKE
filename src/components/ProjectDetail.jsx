import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Project data - should match the data in SelectedWork.jsx
// Project data - synced with SelectedWork.jsx
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

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-accent-purple hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Portfolio
                    </button>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-accent-purple uppercase">
                        {project.category}
                    </span>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Project Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-white/70 font-light max-w-3xl leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex gap-3 mt-6">
                            {project.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs font-medium tracking-wider text-white/40 uppercase px-3 py-1 border border-white/10 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Video Player */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`relative bg-black rounded-sm overflow-hidden border border-white/10 ${project.isVertical
                            ? 'aspect-[9/16] max-w-sm mx-auto'
                            : 'aspect-video w-full'
                            }`}
                    >
                        {project.cloudflareId ? (
                            <iframe
                                src={`https://iframe.videodelivery.net/${project.cloudflareId}?background=1&autoplay=true&loop=true&muted=false&preload=true&responsive=true`}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                allowFullScreen={true}
                                title={project.title}
                            />
                        ) : (
                            <video
                                src={project.video}
                                controls
                                autoPlay
                                loop
                                className="w-full h-full object-cover"
                            />
                        )}
                    </motion.div>

                    {/* Project Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        <div>
                            <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Category</h3>
                            <p className="text-lg text-white font-medium">{project.category}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Type</h3>
                            <p className="text-lg text-white font-medium">{project.tags.join(', ')}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Year</h3>
                            <p className="text-lg text-white font-medium">2025</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
