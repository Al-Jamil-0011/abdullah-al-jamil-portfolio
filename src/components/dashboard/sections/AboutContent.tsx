import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";
import { Loader2 } from "lucide-react";

const AboutContent = () => {
  const { data: about, isLoading } = useSiteContent("about");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const paragraphs = about?.paragraphs || [];
  const whatIDo = about?.what_i_do || [];

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
          {paragraphs.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* What I Do */}
      {whatIDo.length > 0 && (
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            What I <span className="text-primary">Do</span>
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />

          <div className="grid md:grid-cols-2 gap-4">
            {whatIDo.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/30">
                <h4 className="text-foreground font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AboutContent;
