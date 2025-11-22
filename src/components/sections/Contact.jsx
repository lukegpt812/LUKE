import { motion } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from '../ui/MagneticButton';

/**
 * CONTACT SECTION
 * 
 * Focus: Studio inquiry form.
 * Style: Clean, minimal, premium.
 * 
 * Maintenance:
 * - Update email address and social links.
 * - Add/remove form fields as needed.
 * - Form submits to management@lukeabad.us via FormSubmit.co
 */

export default function Contact() {
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = new FormData(e.target);

        try {
            const response = await fetch('https://formsubmit.co/management@lukeabad.us', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('success');
                e.target.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 5000);
            }
        } catch (error) {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Left Column: CTA */}
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-accent-purple uppercase mb-6 block">
                            CONTACT
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                            Let's build the <br /> next thing.
                        </h2>
                        <p className="text-lg text-white/60 font-light mb-12 max-w-md">
                            Open for collaborations with artists, labels, brands, and founders who are ready to define the future.
                        </p>

                        <div className="space-y-4">
                            <a
                                href="mailto:management@lukeabad.us"
                                className="text-white hover:text-accent-purple transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] text-lg font-medium block"
                            >
                                management@lukeabad.us
                            </a>
                            <div className="flex gap-6 text-sm text-white/40 uppercase tracking-widest">
                                <a
                                    href="https://www.instagram.com/lukeabad/?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/luke-abad-bb7b1b2b0?trk=people-guest_people_search-card"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Hidden fields for FormSubmit configuration */}
                            <input type="hidden" name="_subject" value="New inquiry from Luke Abad Portfolio" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />

                            <div>
                                <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-accent-purple focus:outline-none transition-all duration-300 focus:shadow-[0_2px_8px_rgba(139,92,246,0.3)]"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-accent-purple focus:outline-none transition-all duration-300 focus:shadow-[0_2px_8px_rgba(139,92,246,0.3)]"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-accent-purple focus:outline-none transition-all duration-300 focus:shadow-[0_2px_8px_rgba(139,92,246,0.3)] resize-none"
                                    placeholder="Tell me about your project"
                                />
                            </div>

                            {/* Status Messages */}
                            {formStatus === 'success' && (
                                <div className="text-green-400 text-sm">
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}
                            {formStatus === 'error' && (
                                <div className="text-red-400 text-sm">
                                    Something went wrong. Please try again or email directly.
                                </div>
                            )}

                            <div className="pt-4">
                                <MagneticButton type="submit" disabled={formStatus === 'sending'}>
                                    <span className="relative z-10 text-sm tracking-widest uppercase">
                                        {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                    </span>
                                </MagneticButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
