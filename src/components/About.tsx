import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Label and heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-label mb-4">About Me</p>
            <div className="accent-line mb-8" />
            
            <h2 className="text-foreground mb-6">
              Passionate about crafting{" "}
              <span className="italic text-accent">meaningful</span> digital experiences
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              I believe in the power of good design to transform businesses and 
              improve lives. Every project is an opportunity to create something 
              that truly matters.
            </p>
          </motion.div>

          {/* Right - Story content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="p-8 bg-card rounded-xl">
              <p className="text-foreground leading-relaxed mb-6">
                I'm Abdullah Al Jamil, a dedicated UX/UI designer and software developer 
                with over a year of hands-on experience. I specialize in creating 
                user-centered designs that not only look beautiful but also solve real 
                problems and deliver exceptional user experiences.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                My approach combines creative design thinking with technical expertise 
                to build digital solutions that make a meaningful impact. I understand 
                that great products emerge at the intersection of user needs, business 
                goals, and technical possibilities.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Whether I'm designing intuitive interfaces or writing clean, maintainable 
                code, I bring the same level of care and attention to detail. This dual 
                perspective allows me to bridge the gap between design vision and 
                technical reality—creating products that are both beautiful and functional.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["Design Systems", "User Research", "Prototyping", "React", "TypeScript", "Python"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm text-muted-foreground bg-muted rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
