import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * CLIENTS SECTION
 * 
 * Displays trusted partners and clients.
 * Styling: Clean, minimal, with specific logo treatments.
 */

const clientsData = [
    {
        id: 1,
        name: 'Don Toliver',
        logo: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/86660d4c-724c-4efc-7d59-a46aa4cbb100/public',
        width: 160,
        filterClass: 'brightness-0 invert opacity-60 group-hover:opacity-100',
    },
    {
        id: 2,
        name: 'NASCAR',
        logo: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/220025de-cf62-48f4-9ed6-ba214f92a800/public',
        width: 140,
        filterClass: 'brightness-0 invert opacity-60 group-hover:opacity-100',
    },
    {
        id: 3,
        name: 'SLAM',
        logo: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/e198692e-5ea7-44b1-100d-33de98745f00/public',
        width: 130,
        // Fixed white box issue: Invert (White text on Black bg) -> Screen (Black bg transparent)
        filterClass: 'invert mix-blend-screen opacity-60 group-hover:opacity-100',
    },
    {
        id: 4,
        name: 'TONE',
        logo: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/f64e937b-bc4a-4e9d-3fe4-ef2be50e5f00/public',
        width: 120,
        filterClass: 'brightness-0 invert opacity-60 group-hover:opacity-100',
    },
    {
        id: 5,
        name: 'Wieden+Kennedy',
        logo: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/7d5f3bd4-d8e2-4c9b-d426-e4f9f7b03300/public',
        filterClass: 'brightness-0 invert opacity-60 group-hover:opacity-100',
        scale: 1.4
    },
    {
        id: 6,
        name: 'Wonder Studios',
        logo: 'https://imagedelivery.net/nNcXF1Rmo2BLAhLpEz0bOw/0fe039e9-86fd-4cc9-003e-d31ee4767f00/public',
        // Black background fix: Screen (black bg->transparent, white text stays white)
        filterClass: 'mix-blend-screen opacity-80 group-hover:opacity-100',
        scale: 1.4
    },
];

export default function Clients() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="clients" ref={ref} className="py-24 px-6 lg:px-12 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <p className="text-[10px] font-bold tracking-[0.2em] text-accent-purple uppercase mb-4">
                        PARTNERS
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Trusted by artists, founders, and brands exploring what's next
                    </h2>
                </motion.div>

                {/* Logo grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center justify-items-center">
                    {clientsData.map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full h-24 flex items-center justify-center relative group"
                        >
                            <img
                                src={client.logo}
                                alt={`${client.name} logo`}
                                style={{ transform: `scale(${client.scale || 1})` }}
                                className={`max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-110 ${client.filterClass}`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
