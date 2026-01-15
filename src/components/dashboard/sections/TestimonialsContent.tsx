import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content: "Working with Abdullah was an absolute pleasure. His attention to detail and understanding of user experience transformed our product completely. The results exceeded our expectations.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLab",
    content: "Abdullah's design thinking approach helped us identify and solve problems we didn't even know existed. His work on our dashboard increased user engagement by 40%.",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "HealthTech Solutions",
    content: "The design system Abdullah created for us has become the backbone of our product development. It's scalable, intuitive, and beautifully crafted.",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "FinanceFlow",
    content: "His ability to bridge design and development is remarkable. Abdullah delivered a pixel-perfect implementation that was also technically sound and performant.",
    rating: 5,
    avatar: "DP",
  },
];

const TestimonialsContent = () => {
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
          Client <span className="text-primary">Testimonials</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          What my clients say about working with me. Building lasting relationships through 
          quality work and genuine collaboration.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card-hover p-6 relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-12 h-12 text-primary" />
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            {/* Content */}
            <p className="text-muted-foreground mb-6 leading-relaxed italic relative z-10">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6 md:p-8"
      >
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">50+</p>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">30+</p>
            <p className="text-sm text-muted-foreground">Happy Clients</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">5</p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialsContent;
