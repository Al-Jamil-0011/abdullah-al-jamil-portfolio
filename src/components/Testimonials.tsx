import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Abdullah's ability to understand our complex requirements and translate them into an intuitive interface was remarkable. The end result exceeded our expectations.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "TechVentures",
  },
  {
    quote: "Working with Abdullah was a collaborative and insightful experience. His design decisions are always backed by solid reasoning and user research.",
    author: "Michael Rahman",
    role: "Founder & CEO",
    company: "StartupX",
  },
  {
    quote: "What sets Abdullah apart is his dual expertise in design and development. He understands the technical constraints and designs solutions that are both beautiful and feasible.",
    author: "Emily Watson",
    role: "CTO",
    company: "DigitalFlow",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-primary text-primary-foreground" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-primary-foreground/60 mb-4">
            Testimonials
          </p>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-8" />
          <h2 className="text-primary-foreground mb-6">
            What clients <span className="italic text-accent">say</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="p-8 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 h-full">
                <Quote className="w-8 h-8 text-accent mb-6" />
                
                <blockquote className="text-primary-foreground/90 leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-primary-foreground/10 pt-6">
                  <p className="font-medium text-primary-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-primary-foreground/60">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
