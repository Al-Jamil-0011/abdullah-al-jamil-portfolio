import { motion } from "framer-motion";
import { Briefcase, Rocket, Users } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { Loader2 } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Briefcase, Rocket, Users };

const IntroSection = () => {
  const { data: hero, isLoading } = useSiteContent("hero");

  if (isLoading) {
    return (
      <div className="glass-card p-6 md:p-8 flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const headline = hero?.headline || "Hey there!";
  const subheadline = hero?.subheadline || "";
  const stats = hero?.stats || [];

  // Highlight words wrapped in *word* as primary colored
  const renderSubheadline = (text: string) => {
    // Split by specialization keywords and highlight them
    const specializations = ["UX/UI Design", "Product Design", "Software Development"];
    let result = text;
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    specializations.forEach(spec => {
      const idx = remaining.indexOf(spec);
      if (idx !== -1) {
        parts.push(remaining.substring(0, idx));
        parts.push(<span key={key++} className="text-primary font-medium">{spec}</span>);
        remaining = remaining.substring(idx + spec.length);
      }
    });
    parts.push(remaining);

    return parts;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6 md:p-8 border my-0 px-[32px] py-[54px]"
    >
      {/* Greeting */}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-foreground md:text-4xl">{headline}</h1>
        <motion.span
          animate={{ rotate: [0, 14, -8, 14, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          className="text-3xl"
        >
          👋
        </motion.span>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <p className="text-muted-foreground leading-relaxed text-lg">
          {renderSubheadline(subheadline)}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat: any, index: number) => {
          const IconComponent = iconMap[stat.icon] || Briefcase;
          return (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="stat-card py-[32px] my-px px-[32px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-primary/10 px-[12px] py-[12px] pl-[16px] pt-[16px] pr-[16px] pb-[16px]">
                  <IconComponent className="text-primary h-[24px] w-[24px]" />
                </div>
              </div>
              <p className="stat-number text-4xl">{stat.number}</p>
              <p className="stat-label text-base">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default IntroSection;
