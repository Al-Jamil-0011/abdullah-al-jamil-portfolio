import { motion } from "framer-motion";
import { Briefcase, Rocket, Users } from "lucide-react";
const stats = [{
  icon: Briefcase,
  number: "30+",
  label: "Projects Completed"
}, {
  icon: Rocket,
  number: "10+",
  label: "Live Projects"
}, {
  icon: Users,
  number: "22+",
  label: "Happy Clients"
}];
const IntroSection = () => {
  return <motion.div initial={{
    y: 20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5,
    delay: 0.1
  }} className="glass-card p-6 md:p-8 border my-0 px-[32px] py-[54px]">
      {/* Greeting */}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-foreground md:text-4xl">
          Hey there!
        </h1>
        <motion.span animate={{
        rotate: [0, 14, -8, 14, 0]
      }} transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }} className="text-3xl">
          👋
        </motion.span>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <p className="text-muted-foreground leading-relaxed text-lg">
          I'm thrilled to tell you a bit about myself. I have over a year of hands-on experience,
          specializing in{" "}
          <span className="text-primary font-medium">UX/UI Design</span>,{" "}
          <span className="text-primary font-medium">Product Design</span>, and{" "}
          <span className="text-primary font-medium">Software Development</span>.
          If you're in need of a motivated designer who thinks like a developer, let's connect!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat, index) => <motion.div key={stat.label} initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 0.4,
        delay: 0.2 + index * 0.1
      }} className="stat-card py-[32px] my-px px-[32px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10 px-[12px] py-[12px] pl-[16px] pt-[16px] pr-[16px] pb-[16px]">
                <stat.icon className="text-primary h-[24px] w-[24px]" />
              </div>
            </div>
            <p className="stat-number text-4xl">{stat.number}</p>
            <p className="stat-label text-base">{stat.label}</p>
          </motion.div>)}
      </div>
    </motion.div>;
};
export default IntroSection;