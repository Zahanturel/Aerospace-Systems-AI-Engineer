import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface SalaryInfo {
  level: string;
  range: string;
  description?: string;
}

export interface RoadmapStage {
  id: number;
  title: string;
  duration: string;
  skills: string[];
  projects: string[];
  isJobReady?: boolean;
  jobReadyTitle?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: "flashcard" | "quiz" | "puzzle" | "explainer" | "code";
  isLocked: boolean;
  isCompleted: boolean;
  content: LessonContent;
}

export interface FlashcardContent {
  cards: { front: string; back: string; }[];
}

export interface QuizContent {
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface PuzzleContent {
  type: "matching" | "ordering" | "fill-blank";
  items: { left: string; right: string; }[];
  instruction: string;
}

export interface ExplainerContent {
  text: string;
  audioText: string;
  diagram?: string;
  codeSnippet?: string;
}

export interface CodeContent {
  language: string;
  code: string;
  explanation: string;
  runnable: boolean;
}

export type LessonContent = FlashcardContent | QuizContent | PuzzleContent | ExplainerContent | CodeContent;

export interface DayActivity {
  time: string;
  activity: string;
  description: string;
  tools: string[];
}

export interface AIComparisonMetric {
  metric: string;
  withAI: string;
  traditional: string;
  improvement: string;
}

export interface UserProgress {
  odulcompletedLessons: number[];
  currentLesson: number;
  totalXP: number;
  streakDays: number;
  badges: string[];
  quizScores: Record<number, number>;
}

export const courseDataSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  salaryInfo: z.array(z.object({
    level: z.string(),
    range: z.string(),
    description: z.string().optional(),
  })),
  growthInfo: z.string(),
  impactInfo: z.string(),
});

export type CourseData = z.infer<typeof courseDataSchema>;
