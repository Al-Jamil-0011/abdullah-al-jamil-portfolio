import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import abdullahPortrait from "@/assets/abdullah-portrait.png";

export const EditorialHero = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Copy & Positioning */}
          <div className="lg:col-span-7 space-y-8">
            {/* Availability & Role Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="swiss-badge">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Selected Opportunities
              </span>
              <span className="text-xs font-mono text-muted-foreground hidden sm:inline-block">
                • Sr. UX/UI Designer at BDCalling IT Ltd.
              </span>
            </motion.div>

            {/* Primary Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.12]">
                I design digital products that make{" "}
                <span className="text-accent underline decoration-accent/30 underline-offset-8">
                  complex things
                </span>{" "}
                feel simple.
              </h1>

              {/* Supporting Copy */}
              <p className="editorial-lead max-w-xl">
                Product Designer focused on UX, UI, user research, and product thinking — turning complex requirements into clear, useful, and intuitive digital experiences.
              </p>
            </motion.div>

            {/* Primary & Secondary Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#work"
                className="btn-editorial-primary text-sm !px-7 !py-3.5"
              >
                Explore Selected Work
                <ArrowDown className="w-4 h-4 ml-1" />
              </a>

              <a
                href="/about"
                className="btn-editorial-outline text-sm !px-6 !py-3.5"
              >
                About My Background
              </a>
            </motion.div>

            {/* Quick Credentials / Verification Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8 border-t border-border/80 grid grid-cols-3 gap-4"
            >
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  30+
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Completed Projects
                </p>
              </div>

              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  B.Sc. CSE
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Computer Science Foundation
                </p>
              </div>

              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  100%
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Dev-Ready Systems
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Restrained Editorial Portrait & Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Outer Swiss Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-card p-2 sm:p-3 shadow-xl">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={abdullahPortrait}
                    alt="Abdullah Al Jamil — Product Designer"
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                  {/* Corner Index Label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-foreground/90 bg-card/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-border/60">
                    <span className="font-semibold">Abdullah Al Jamil</span>
                    <span className="text-muted-foreground">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Verified Practice Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-4 items-center gap-2.5 bg-card/95 backdrop-blur-md border border-border px-4 py-2.5 rounded-2xl shadow-lg">
                <div className="p-1.5 rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">Enterprise UX/UI</p>
                  <p className="text-[10px] text-muted-foreground font-mono">BDCalling IT Ltd.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
