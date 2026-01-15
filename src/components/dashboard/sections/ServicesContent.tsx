import { motion } from "framer-motion";
import { Palette, Layout, Code, Layers, MessageCircle, ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning user interfaces that drive engagement and deliver exceptional user experiences.",
    icon: Palette,
    gradient: "from-primary/20 to-secondary",
  },
  {
    id: 2,
    title: "Product Design",
    description: "End-to-end product design from research and strategy to final implementation, ensuring cohesive and impactful digital products.",
    icon: Layout,
    gradient: "from-blue-500/20 to-secondary",
  },
  {
    id: 3,
    title: "Frontend Development",
    description: "Building responsive, performant, and accessible web applications using modern technologies like React, TypeScript, and Tailwind CSS.",
    icon: Code,
    gradient: "from-purple-500/20 to-secondary",
  },
  {
    id: 4,
    title: "Design Systems",
    description: "Developing scalable and consistent design systems that streamline workflows and maintain brand coherence across all touchpoints.",
    icon: Layers,
    gradient: "from-orange-500/20 to-secondary",
  },
  {
    id: 5,
    title: "Consultation",
    description: "Strategic design consultation to help you identify opportunities, solve complex problems, and achieve your business goals.",
    icon: MessageCircle,
    gradient: "from-green-500/20 to-secondary",
  },
];

const ServicesContent = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          My <span className="text-primary">Services</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          I offer a range of services to help bring your ideas to life. 
          From concept to execution, I'm here to create impactful digital experiences.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card-hover p-6 group cursor-pointer"
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <service.icon className="w-7 h-7 text-primary" />
            </div>

            {/* Content */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h4>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card p-6 md:p-8 text-center"
      >
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Have a project in mind?
        </h4>
        <p className="text-muted-foreground mb-4">
          Let's discuss how I can help bring your vision to life.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 btn-primary"
        >
          <span>Get in Touch</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ServicesContent;
