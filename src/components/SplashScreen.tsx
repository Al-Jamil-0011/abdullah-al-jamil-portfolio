import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'initial' | 'reveal' | 'exit'>('initial');

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation entirely for reduced motion
      onComplete();
      return;
    }

    // Phase 1 → Phase 2 (400ms)
    const revealTimer = setTimeout(() => setPhase('reveal'), 400);
    
    // Phase 2 → Phase 3 (900ms)
    const exitTimer = setTimeout(() => setPhase('exit'), 900);
    
    // Complete (1400ms)
    const completeTimer = setTimeout(() => onComplete(), 1400);

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
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, hsl(var(--accent) / 0.05) 0%, transparent 50%)
            `,
          }}
        >
          {/* Subtle noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="relative z-10 text-center">
            <AnimatePresence>
              {phase === 'reveal' && (
                <>
                  {/* Name */}
                  <motion.h1
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94] // Custom ease-out
                    }}
                  >
                    Abdullah Al Jamil
                  </motion.h1>
                  
                  {/* Role */}
                  <motion.p
                    className="text-muted-foreground text-base md:text-lg lg:text-xl tracking-wide"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
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
