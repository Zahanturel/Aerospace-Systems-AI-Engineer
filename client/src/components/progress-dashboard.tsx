import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Star, 
  Target,
  CheckCircle2,
  BookOpen,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProgressDashboardProps {
  completedLessons: number[];
  totalLessons: number;
  currentStage: number;
  totalStages: number;
  xp: number;
  streak: number;
}

export function ProgressDashboard({
  completedLessons,
  totalLessons,
  currentStage,
  totalStages,
  xp,
  streak,
}: ProgressDashboardProps) {
  const lessonsProgress = (completedLessons.length / totalLessons) * 100;
  const stageProgress = ((currentStage) / totalStages) * 100;
  const jobReadyProgress = currentStage >= 2 ? 100 : (currentStage / 2) * 100;

  const achievements = [
    { id: "first_lesson", name: "First Steps", icon: BookOpen, earned: completedLessons.length > 0 },
    { id: "five_lessons", name: "Quick Learner", icon: Zap, earned: completedLessons.length >= 5 },
    { id: "all_free", name: "Trial Complete", icon: Star, earned: completedLessons.length >= totalLessons },
    { id: "streak_3", name: "3-Day Streak", icon: Flame, earned: streak >= 3 },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background" id="progress">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your Progress
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your learning journey and celebrate your achievements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-foreground" data-testid="text-xp-value">{xp}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Total XP</h3>
                <p className="text-sm text-muted-foreground">Experience points earned</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-3xl font-bold text-foreground" data-testid="text-streak-value">{streak}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Day Streak</h3>
                <p className="text-sm text-muted-foreground">Keep learning daily!</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-3xl font-bold text-foreground" data-testid="text-lessons-completed">
                    {completedLessons.length}/{totalLessons}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Lessons Done</h3>
                <p className="text-sm text-muted-foreground">Free trial lessons completed</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Progress Meters</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Free Trial Progress</span>
                    <span className="font-medium text-foreground">{Math.round(lessonsProgress)}%</span>
                  </div>
                  <Progress value={lessonsProgress} className="h-3" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall Roadmap</span>
                    <span className="font-medium text-foreground">{Math.round(stageProgress)}%</span>
                  </div>
                  <Progress value={stageProgress} className="h-3" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Job Ready</span>
                    <span className="font-medium text-foreground">
                      {jobReadyProgress >= 100 ? "Ready!" : `${Math.round(jobReadyProgress)}%`}
                    </span>
                  </div>
                  <Progress 
                    value={jobReadyProgress} 
                    className={`h-3 ${jobReadyProgress >= 100 ? "[&>div]:bg-green-500" : ""}`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-foreground">Achievements</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          achievement.earned
                            ? "bg-primary/10 border-primary/30"
                            : "bg-muted/50 border-border opacity-50"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                          achievement.earned ? "bg-primary/20" : "bg-muted"
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            achievement.earned ? "text-primary" : "text-muted-foreground"
                          }`} />
                        </div>
                        <p className={`text-xs font-medium ${
                          achievement.earned ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {achievement.name}
                        </p>
                        {achievement.earned && (
                          <Badge className="mt-2 text-[10px] bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                            Earned
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
