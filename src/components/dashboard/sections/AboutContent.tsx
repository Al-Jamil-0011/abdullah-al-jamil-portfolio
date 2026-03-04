import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";
import { Skeleton } from "@/components/ui/skeleton";

const AboutContent = () => {
  const { data: about, isLoading } = useSiteContent("about");

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
        
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : (
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>

      {/* What I Do */}
      {(isLoading || whatIDo.length > 0) && (
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            What I <span className="text-primary">Do</span>
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-4 rounded-xl bg-secondary/30 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {whatIDo.map((item: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="text-foreground font-medium mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AboutContent;
