import { useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { HeroSection } from "@/components/hero-section";
import { StickyHeader } from "@/components/sticky-header";
import { RoadmapSection } from "@/components/roadmap-section";
import { FreeTrialCourse } from "@/components/free-trial-course";
import { DayInLifeSection } from "@/components/day-in-life-section";
import { AIImpactSection } from "@/components/ai-impact-section";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { EnrollSection } from "@/components/enroll-section";
import { freeTrialLessons } from "@/lib/course-data";
import { fetchProgress, completeLesson, type UserProgress } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const freeTrialRef = useRef<HTMLDivElement>(null);

  const { data: progress, isLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress"],
    queryFn: fetchProgress,
  });

  const completeLessonMutation = useMutation({
    mutationFn: ({ lessonId, xpEarned }: { lessonId: number; xpEarned: number }) => 
      completeLesson(lessonId, xpEarned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnroll = () => {
    const enrollSection = document.getElementById("enroll");
    if (enrollSection) {
      enrollSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartLesson = () => {
    if (freeTrialRef.current) {
      freeTrialRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCompleteLesson = (lessonId: number) => {
    completeLessonMutation.mutate({ lessonId, xpEarned: 50 });
  };

  const completedLessons = progress?.completedLessons || [];
  const xp = progress?.xp || 0;
  const streak = progress?.streak || 1;
  const currentStage = completedLessons.length >= 5 ? 2 : 1;

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader 
        progress={scrollProgress} 
        onEnroll={handleEnroll} 
      />
      
      <main>
        <HeroSection onEnroll={handleEnroll} />
        
        <RoadmapSection 
          onStartLesson={handleStartLesson}
          completedStages={[]}
          currentStage={currentStage}
        />
        
        <div ref={freeTrialRef}>
          <FreeTrialCourse 
            onComplete={handleCompleteLesson}
            completedLessons={completedLessons}
          />
        </div>
        
        <ProgressDashboard 
          completedLessons={completedLessons}
          totalLessons={freeTrialLessons.length}
          currentStage={currentStage}
          totalStages={3}
          xp={xp}
          streak={streak}
        />
        
        <DayInLifeSection />
        
        <AIImpactSection />
        
        <EnrollSection />
      </main>

      <footer className="bg-background border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                memebu
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Building the future of AI-powered career education
            </p>
            
            <p className="text-sm text-muted-foreground">
              2025 Memebu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
