import { motion } from "framer-motion";
import { Rocket, TrendingUp, Shield, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedParticles } from "./animated-particles";
import { courseInfo, salaryData } from "@/lib/course-data";

interface HeroSectionProps {
  onEnroll: () => void;
}

export function HeroSection({ onEnroll }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-primary">
      <AnimatedParticles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-1.5 text-sm font-medium">
              <Rocket className="w-4 h-4 mr-1.5" />
              New Career Path for 2025
            </Badge>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 tracking-tight" data-testid="text-hero-title">
            {courseInfo.title}
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-white/90 mb-10 leading-relaxed" data-testid="text-hero-subtitle">
            {courseInfo.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={onEnroll}
              className="bg-white text-primary font-semibold px-8 py-6 text-lg animate-pulse-glow"
              data-testid="button-enroll-hero"
            >
              {courseInfo.enrollmentCTA}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            
            {courseInfo.limitedSpots && (
              <span className="text-white/80 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Limited Spots - Enroll Today!
              </span>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto"
        >
          {salaryData.map((salary, index) => (
            <motion.div
              key={salary.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center hover-elevate"
              data-testid={`card-salary-${salary.level.toLowerCase().replace(" ", "-")}`}
            >
              <p className="text-white/70 text-sm font-medium mb-2">{salary.level}</p>
              <p className="text-white text-2xl lg:text-3xl font-bold font-display" data-testid={`text-salary-${salary.level.toLowerCase().replace(" ", "-")}`}>{salary.range}</p>
              {salary.description && (
                <p className="text-white/60 text-xs mt-2">{salary.description}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Growth</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Surging demand as space tech and UAV industries expand across defense and commercial sectors
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Impact</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Improve flight safety by 40-50%, reduce fuel consumption by 15-25%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
