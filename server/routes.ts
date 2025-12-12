import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const progressSchema = z.object({
  visitorId: z.string(),
  completedLessons: z.array(z.number()).optional(),
  xp: z.number().optional(),
  streak: z.number().optional(),
});

const lessonCompletionSchema = z.object({
  visitorId: z.string(),
  lessonId: z.number(),
  xpEarned: z.number().default(50),
});

const enrollmentSchema = z.object({
  visitorId: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/course", (_req, res) => {
    const courseData = {
      title: "Aerospace Systems AI Engineer",
      subtitle: "Launch your career into the stratosphere where AI meets aerospace engineering.",
      totalStages: 3,
      totalLessons: 5,
      estimatedDuration: "9-12 months",
      salaryRange: {
        entry: "₹6-10 LPA",
        mid: "₹12-22 LPA",
        senior: "₹30-45+ LPA",
      },
    };
    res.json(courseData);
  });

  app.get("/api/progress/:visitorId", async (req, res) => {
    try {
      const { visitorId } = req.params;
      const progress = await storage.getProgress(visitorId);
      
      if (!progress) {
        res.json({
          visitorId,
          completedLessons: [],
          xp: 0,
          streak: 1,
          lastVisit: new Date().toISOString(),
          quizScores: {},
        });
        return;
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const data = progressSchema.parse(req.body);
      
      const existing = await storage.getProgress(data.visitorId);
      
      const progress = await storage.saveProgress({
        id: existing?.id || data.visitorId,
        visitorId: data.visitorId,
        completedLessons: data.completedLessons || existing?.completedLessons || [],
        xp: data.xp ?? existing?.xp ?? 0,
        streak: data.streak ?? existing?.streak ?? 1,
        lastVisit: new Date().toISOString(),
        quizScores: existing?.quizScores || {},
        name: existing?.name,
        email: existing?.email,
        enrolledAt: existing?.enrolledAt,
      });
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      res.status(500).json({ error: "Failed to save progress" });
    }
  });

  app.post("/api/lessons/complete", async (req, res) => {
    try {
      const data = lessonCompletionSchema.parse(req.body);
      
      const progress = await storage.updateLessonCompletion(
        data.visitorId,
        data.lessonId,
        data.xpEarned
      );
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      res.status(500).json({ error: "Failed to complete lesson" });
    }
  });

  app.post("/api/enroll", async (req, res) => {
    try {
      const data = enrollmentSchema.parse(req.body);
      
      const progress = await storage.saveEnrollment(
        data.visitorId,
        data.name,
        data.email
      );
      
      res.json({ 
        success: true, 
        message: "Successfully enrolled!",
        progress 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      res.status(500).json({ error: "Failed to enroll" });
    }
  });

  app.get("/api/stats", async (_req, res) => {
    try {
      const enrollments = await storage.getAllEnrollments();
      res.json({
        totalEnrollments: enrollments.length,
        totalLessonsCompleted: enrollments.reduce(
          (sum, e) => sum + e.completedLessons.length, 
          0
        ),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  return httpServer;
}
