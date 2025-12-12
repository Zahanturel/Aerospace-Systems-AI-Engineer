import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, Briefcase, Code, Database, Users, Zap, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dayInLifeActivities } from "@/lib/course-data";

const activityIcons: Record<string, React.ReactNode> = {
  "Algorithm Development": <Code className="w-5 h-5" />,
  "Data Analysis": <Database className="w-5 h-5" />,
  "Simulation Testing": <Zap className="w-5 h-5" />,
  "Team Collaboration": <Users className="w-5 h-5" />,
  "Optimization": <Settings className="w-5 h-5" />,
  "System Integration": <Briefcase className="w-5 h-5" />,
};

export function DayInLifeSection() {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-background" id="day-in-life">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            A Day in the Life
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover what an Aerospace Systems AI Engineer actually does day-to-day. 
            Click on any activity to learn more.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-4">
            {dayInLifeActivities.map((activity, index) => {
              const isExpanded = expandedActivity === activity.time;
              const Icon = activityIcons[activity.activity];

              return (
                <motion.div
                  key={activity.time}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card 
                    className={`ml-0 md:ml-12 cursor-pointer transition-all duration-300 hover-elevate ${
                      isExpanded ? "border-primary/30" : ""
                    }`}
                    onClick={() => setExpandedActivity(isExpanded ? null : activity.time)}
                  >
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:flex">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Clock className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:flex p-3 bg-primary/10 rounded-lg shrink-0">
                          <span className="text-primary">{Icon}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="secondary" className="text-xs font-mono">
                              {activity.time}
                            </Badge>
                            <h3 className="font-semibold text-foreground">
                              {activity.activity}
                            </h3>
                          </div>

                          <AnimatePresence>
                            {isExpanded ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <p className="text-muted-foreground text-sm mb-3">
                                  {activity.description}
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs text-muted-foreground">Tools:</span>
                                  {activity.tools.map((tool) => (
                                    <Badge key={tool} variant="outline" className="text-xs">
                                      {tool}
                                    </Badge>
                                  ))}
                                </div>
                              </motion.div>
                            ) : (
                              <p className="text-muted-foreground text-sm line-clamp-1">
                                {activity.description}
                              </p>
                            )}
                          </AnimatePresence>
                        </div>

                        <ChevronRight 
                          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`} 
                        />
                      </div>
                    </CardContent>
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
