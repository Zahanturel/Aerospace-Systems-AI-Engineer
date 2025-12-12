import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Lock, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Briefcase,
  Star,
  PlayCircle,
  Rocket
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { roadmapStages } from "@/lib/course-data";

interface RoadmapSectionProps {
  onStartLesson: () => void;
  completedStages: number[];
  currentStage: number;
}

export function RoadmapSection({ onStartLesson, completedStages, currentStage }: RoadmapSectionProps) {
  const [expandedStage, setExpandedStage] = useState<number | null>(1);

  const getStageProgress = (stageId: number) => {
    if (completedStages.includes(stageId)) return 100;
    if (stageId === currentStage) return 35;
    return 0;
  };

  const getStageStatus = (stageId: number) => {
    if (completedStages.includes(stageId)) return "completed";
    if (stageId === currentStage) return "current";
    if (stageId <= currentStage) return "unlocked";
    return "locked";
  };

  return (
    <section className="py-16 lg:py-24 bg-background" id="roadmap">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your Learning Roadmap
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From complete beginner to job-ready professional in 9-12 months. Each stage builds on the previous, with clear milestones.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-6">
            {roadmapStages.map((stage, index) => {
              const status = getStageStatus(stage.id);
              const progress = getStageProgress(stage.id);
              const isExpanded = expandedStage === stage.id;
              const isLocked = status === "locked";

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {stage.isJobReady && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative mb-6 ml-0 md:ml-16"
                    >
                      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 rounded-lg border-l-4 border-primary">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary rounded-full">
                            <Briefcase className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              Job-Ready Milestone
                            </p>
                            <p className="text-sm text-muted-foreground">
                              After Stage 2, you're ready for: <span className="text-primary font-medium">{stage.jobReadyTitle}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <Card className={`relative ml-0 md:ml-16 transition-all duration-300 ${isLocked ? "opacity-60" : ""}`}>
                    <div className="absolute -left-8 top-6 hidden md:flex">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                        status === "completed" 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : status === "current"
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-muted border-border text-muted-foreground"
                      }`}>
                        {status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          stage.id
                        )}
                      </div>
                    </div>

                    <CardHeader 
                      className="cursor-pointer pb-3"
                      onClick={() => !isLocked && setExpandedStage(isExpanded ? null : stage.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {stage.duration}
                            </Badge>
                            {status === "current" && (
                              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                                In Progress
                              </Badge>
                            )}
                            {status === "completed" && (
                              <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 text-xs">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            Stage {stage.id}: {stage.title}
                          </h3>
                        </div>
                        
                        <Button variant="ghost" size="icon" className="shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>

                      {progress > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </CardHeader>

                    <AnimatePresence>
                      {isExpanded && !isLocked && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="pt-0">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Rocket className="w-4 h-4 text-primary" />
                                  Skills You'll Learn
                                </h4>
                                <ul className="space-y-2">
                                  {stage.skills.map((skill, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  Key Projects
                                </h4>
                                <ul className="space-y-2">
                                  {stage.projects.map((project, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                      {project}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {stage.id === 1 && (
                              <div className="mt-6 pt-4 border-t">
                                <Button
                                  onClick={onStartLesson}
                                  className="w-full sm:w-auto"
                                  data-testid="button-start-learning"
                                >
                                  <PlayCircle className="w-5 h-5 mr-2" />
                                  Try Free Lessons
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
