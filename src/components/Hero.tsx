import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import abdullahPortrait from "@/assets/abdullah-portrait.png";

const stats = [
  { number: "30+", label: "Projects Completed" },
  { number: "10+", label: "Live Productions" },
  { number: "22+", label: "Happy Clients" },
];

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      <div className="container-wide relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <p className="text-label">Product Designer & Developer</p>
                <div className="accent-line" />
              </div>

              <h1 className="text-foreground">
                Designing products that{" "}
                <span className="text-accent italic">make sense</span> and{" "}
                <span className="text-accent italic">feel right</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                I'm Abdullah Al Jamil — a Product Designer, UX/UI specialist, and 
                developer who bridges the gap between beautiful design and robust 
                technology. I craft digital experiences that solve real problems.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#work" className="btn-primary">
                  View My Work
                </a>
                <a href="#about" className="btn-outline">
                  Get to Know Me
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-border"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="stat-number"
                  >
                    {stat.number}
                  </motion.p>
                  <p className="stat-label mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-accent/20 rounded-full" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              
              <div className="relative w-72 md:w-80 lg:w-96 aspect-square rounded-2xl overflow-hidden">
                <img
                  src={abdullahPortrait}
                  alt="Abdullah Al Jamil - Product Designer"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-4 bottom-12 bg-card p-4 rounded-lg shadow-lg"
              >
                <p className="text-xs text-muted-foreground">Available for</p>
                <p className="text-sm font-medium text-foreground">Freelance Work</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
