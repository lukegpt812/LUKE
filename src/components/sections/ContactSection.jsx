import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useState } from 'react';

/**
 * CONTACT SECTION - Stronger Finale
 * 
 * High-impact closing with enhanced form and social links
 * - Purple radial glow behind heading
 * - Form with inner glows and purple focus states
 * - Social icons below form
 * 
 * To customize:
 * - Update email and social links
 * - Add backend integration for form submission
 * - Modify social platforms
 */

const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/lukeabad', icon: '𝕏' },
    { name: 'Instagram', url: 'https://instagram.com/lukeabad', icon: 'IG' },
    { name: 'Vimeo', url: 'https://vimeo.com/lukeabad', icon: 'VI' },
    { name: 'GitHub', url: 'https://github.com/lukeabad', icon: 'GH' },
];

export default function ContactSection() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // TODO: Add backend integration here
        console.log('Form submitted:', formData);
        alert('Message sent! (Form submission not yet connected to backend)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="py-24 px-6 lg:px-12 relative overflow-hidden"
        >
            {/* Purple radial glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-3xl"></div>
            </div>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-accent-purple/10"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-primary-text mb-6 leading-tight">
                        Let's build what doesn't exist yet
                    </h2>
                    <p className="text-lg text-secondary-text max-w-2xl mx-auto">
                        Interested in collaborating on AI-native films, agentic systems, or AGI-facing experiments? Let's talk about pushing the boundaries.
                    </p>
                </motion.div>

                {/* Contact form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 mb-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-primary-text mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-lg text-primary-text placeholder-secondary-text/50 transition-all duration-200 ${errors.name
                                        ? 'border-red-500'
                                        : focusedField === 'name'
                                            ? 'border-accent-purple glow-purple-sm'
                                            : 'border-white/10 focus:border-accent-purple'
                                    } focus:outline-none`}
                                placeholder="Your name"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-lg text-primary-text placeholder-secondary-text/50 transition-all duration-200 ${errors.email
                                        ? 'border-red-500'
                                        : focusedField === 'email'
                                            ? 'border-accent-purple glow-purple-sm'
                                            : 'border-white/10 focus:border-accent-purple'
                                    } focus:outline-none`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-primary-text mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows={6}
                            className={`w-full px-4 py-3 bg-black/40 border-2 rounded-lg text-primary-text placeholder-secondary-text/50 transition-all duration-200 resize-none ${errors.message
                                    ? 'border-red-500'
                                    : focusedField === 'message'
                                        ? 'border-accent-purple glow-purple-sm'
                                        : 'border-white/10 focus:border-accent-purple'
                                } focus:outline-none`}
                            placeholder="Tell me about your project..."
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-8 py-4 bg-accent-purple text-white font-medium rounded-lg transition-all duration-200 group relative overflow-hidden hover:glow-purple"
                    >
                        <span className="relative z-10">Send Message</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-purple-dark bg-200 bg-left group-hover:bg-right transition-all duration-500"></div>
                    </button>
                </motion.form>

                {/* Email and social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center space-y-6"
                >
                    <p className="text-sm text-secondary-text">Or reach out directly:</p>

                    {/* Email */}
                    <div>
                        <a
                            href="mailto:hello@lukeabad.com"
                            className="text-accent-purple hover:text-accent-purple-light transition-colors duration-200 font-medium text-lg inline-block relative group"
                        >
                            hello@lukeabad.com
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-purple group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>

                    {/* Social icons */}
                    <div className="flex justify-center items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:border-accent-purple/50 hover:bg-accent-purple/10 flex items-center justify-center text-secondary-text hover:text-accent-purple transition-all duration-200 font-mono text-xs font-bold"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
