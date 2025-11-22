import { useState, useEffect } from 'react';

/**
 * Custom hook for scroll-reveal animations using IntersectionObserver
 * Returns a ref to attach to elements and an isVisible state
 */
export const useScrollReveal = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optionally unobserve after first reveal
                    if (options.once !== false) {
                        observer.unobserve(ref);
                    }
                } else if (options.once === false) {
                    setIsVisible(false);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px',
            }
        );

        observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [ref, options.threshold, options.rootMargin, options.once]);

    return [setRef, isVisible];
};
