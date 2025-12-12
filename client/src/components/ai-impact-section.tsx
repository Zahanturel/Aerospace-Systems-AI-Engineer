import { motion } from "framer-motion";
import { TrendingUp, Zap, Heart, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aiComparisonMetrics } from "@/lib/course-data";

const metricIcons: Record<string, React.ReactNode> = {
  "Salary": <TrendingUp className="w-5 h-5" />,
  "Productivity": <Zap className="w-5 h-5" />,
  "Work-Life Balance": <Heart className="w-5 h-5" />,
  "Career Growth": <Rocket className="w-5 h-5" />,
};

export function AIImpactSection() {
  return (
    <section className="py-16 lg:py-24 bg-card" id="ai-impact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            AI Advantage
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            AI's Impact on Your Career
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how AI augmentation transforms your career prospects compared to traditional approaches.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      With AI Augmentation
                    </h3>
                    <p className="text-sm text-muted-foreground">Your future with AI skills</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiComparisonMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.metric}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-background rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-primary">{metricIcons[metric.metric]}</span>
                      <span className="font-medium text-foreground">{metric.metric}</span>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {metric.withAI}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full opacity-70">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      Traditional Approach
                    </h3>
                    <p className="text-sm text-muted-foreground">Without AI specialization</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiComparisonMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.metric}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{metricIcons[metric.metric]}</span>
                      <span className="font-medium text-muted-foreground">{metric.metric}</span>
                    </div>
                    <Badge variant="secondary" className="text-muted-foreground">
                      {metric.traditional}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
            <CardContent className="py-6 px-8">
              <p className="text-lg text-foreground">
                <span className="font-bold text-primary">AI-skilled engineers earn 45% more</span>
                {" "}and are{" "}
                <span className="font-bold text-primary">70% more productive</span>
                {" "}than their peers.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
