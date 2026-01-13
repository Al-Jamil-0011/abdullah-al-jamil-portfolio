import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, PenTool, Layers, RefreshCw, CheckCircle } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description: "Understanding the problem space through stakeholder interviews, competitive analysis, and defining clear project goals.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Research",
    description: "Deep diving into user needs, behaviors, and pain points through interviews, surveys, and data analysis.",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Ideation",
    description: "Exploring solutions through sketching, wireframing, and collaborative brainstorming sessions.",
  },
  {
    icon: Layers,
    number: "04",
    title: "Design Systems",
    description: "Building scalable, consistent design foundations that ensure coherent experiences across all touchpoints.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Iteration",
    description: "Refining solutions through prototyping, testing, and continuous feedback loops with users and stakeholders.",
  },
  {
    icon: CheckCircle,
    number: "06",
    title: "Validation",
    description: "Ensuring solutions meet user needs and business goals through usability testing and success metrics.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-label mb-4">My Process</p>
          <div className="accent-line mx-auto mb-8" />
          <h2 className="text-foreground mb-6">
            A thoughtful approach to{" "}
            <span className="italic text-accent">design</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Great products don't happen by accident. They're the result of a 
            structured yet flexible process that balances creativity with strategy.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-border" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-card p-8 rounded-xl h-full relative">
                  {/* Number badge */}
                  <div className="absolute -top-3 left-8 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {step.number}
                  </div>
                  
                  <div className="mt-4">
                    <div className="p-3 bg-secondary rounded-lg w-fit mb-5">
                      <step.icon className="w-5 h-5 text-foreground" />
                    </div>
                    
                    <h4 className="text-xl font-display font-medium text-foreground mb-3">
                      {step.title}
                    </h4>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
