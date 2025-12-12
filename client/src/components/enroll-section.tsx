import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Rocket, CheckCircle2, Sparkles, Mail, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { enrollUser } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";

export function EnrollSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const enrollMutation = useMutation({
    mutationFn: () => enrollUser(name, email),
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      toast({
        title: "Welcome aboard!",
        description: "You've successfully enrolled. Check your email for next steps.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    enrollMutation.mutate();
  };

  const benefits = [
    "First access to new features and courses",
    "Exclusive member-only content and resources",
    "Personalized learning paths based on your goals",
    "Community access with fellow learners",
  ];

  return (
    <section className="py-16 lg:py-24 bg-primary" id="enroll">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Get Early Access
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Join the Memebu Community
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Be among the first to experience our AI-powered learning platform. 
            Start your journey to becoming an Aerospace Systems AI Engineer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              What you'll get as an early member:
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-1 bg-white/20 rounded-full mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">You're In!</h3>
                    <p className="text-white/80">
                      Welcome to the Memebu early access community! 
                      Check your email for next steps.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/90">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          data-testid="input-name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/90">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-white text-primary font-semibold py-5"
                      disabled={enrollMutation.isPending}
                      data-testid="button-enroll-submit"
                    >
                      {enrollMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Rocket className="w-4 h-4" />
                          Reserve My Spot
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-white/60 text-center">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
