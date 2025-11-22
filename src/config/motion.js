/**
 * MOTION CONFIGURATION
 * 
 * Central motion system for Luke OS
 * Consistent easing, timing, and variants across all animations
 */

// Custom easing curves for premium feel
export const easing = {
    smooth: [0.25, 0.46, 0.45, 0.94], // Smoother, more natural
    snappy: [0.34, 1.56, 0.64, 1], // Elastic bounce
    gentle: [0.16, 1, 0.3, 1], // Very smooth ease-out
    spring: [0.68, -0.55, 0.265, 1.55], // Spring physics
};

// Duration constants (in seconds)
export const duration = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 0.8,
};

// Stagger timing for lists/grids
export const stagger = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
};

// Common animation variants
export const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration.slow,
            ease: easing.gentle,
        },
    },
};

export const fadeIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: duration.normal,
            ease: easing.gentle,
        },
    },
};

export const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: duration.normal,
            ease: easing.smooth,
        },
    },
};

// Stagger container variants
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger.normal,
            delayChildren: 0.1,
        },
    },
};

// Hover variants for interactive elements
export const hoverLift = {
    rest: {
        y: 0,
        scale: 1,
    },
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            duration: duration.normal,
            ease: easing.spring,
        },
    },
};

export const hoverGlow = {
    rest: {
        boxShadow: '0 0 0 rgba(138, 91, 255, 0)',
    },
    hover: {
        boxShadow: '0 0 20px rgba(138, 91, 255, 0.35)',
        transition: {
            duration: duration.fast,
        },
    },
};
