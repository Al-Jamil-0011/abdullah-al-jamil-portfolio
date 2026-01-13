import { motion } from "framer-motion";
import { useRef } from "react";

const AboutContent = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* About Me */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          About <span className="text-primary">Me</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm Abdullah Al Jamil, a passionate UX/UI designer and software developer with over 
            a year of hands-on experience. I specialize in creating user-centered designs that 
            not only look beautiful but also solve real problems and deliver exceptional user 
            experiences.
          </p>
          <p>
            My approach combines creative design thinking with technical expertise to build 
            digital solutions that make a meaningful impact. I believe in the power of good 
            design to transform businesses and improve lives.
          </p>
          <p>
            When I'm not designing or coding, you'll find me exploring new design trends, 
            contributing to open-source projects, or sharing my knowledge through writing 
            and mentoring.
          </p>
        </div>
      </div>

      {/* What I Do */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          What I <span className="text-primary">Do</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-secondary/30">
            <h4 className="text-foreground font-medium mb-2">Product Design</h4>
            <p className="text-sm text-muted-foreground">
              End-to-end product design from research and ideation to high-fidelity 
              prototypes and design systems.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30">
            <h4 className="text-foreground font-medium mb-2">UI/UX Design</h4>
            <p className="text-sm text-muted-foreground">
              Creating intuitive, accessible interfaces that delight users and 
              achieve business goals.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30">
            <h4 className="text-foreground font-medium mb-2">Web Development</h4>
            <p className="text-sm text-muted-foreground">
              Building modern, responsive web applications using React, TypeScript, 
              and other cutting-edge technologies.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30">
            <h4 className="text-foreground font-medium mb-2">Backend Development</h4>
            <p className="text-sm text-muted-foreground">
              Developing robust server-side solutions with Python, Node.js, 
              and database management.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutContent;
