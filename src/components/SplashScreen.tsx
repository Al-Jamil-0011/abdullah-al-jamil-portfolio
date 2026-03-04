import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'initial' | 'reveal' | 'exit'>('initial');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Faster timings: 200ms → reveal, 600ms → exit, 900ms → complete
    const revealTimer = setTimeout(() => setPhase('reveal'), 200);
    const exitTimer = setTimeout(() => setPhase('exit'), 600);
    const completeTimer = setTimeout(() => onComplete(), 900);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' || phase === 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, hsl(var(--accent) / 0.05) 0%, transparent 50%)
            `,
          }}
        >
          <div className="relative z-10 text-center">
            <AnimatePresence>
              {phase === 'reveal' && (
                <>
                  <motion.h1
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    Abdullah Al Jamil
                  </motion.h1>
                  <motion.p
                    className="text-muted-foreground text-base md:text-lg lg:text-xl tracking-wide"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <span className="text-primary">Product Designer</span>
                    <span className="mx-2 text-muted-foreground/50">•</span>
                    <span>UX/UI Designer</span>
                    <span className="mx-2 text-muted-foreground/50">•</span>
                    <span>Software Developer</span>
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
