import { apiRequest } from "./queryClient";

export interface UserProgress {
  id: string;
  visitorId: string;
  completedLessons: number[];
  xp: number;
  streak: number;
  lastVisit: string;
  quizScores: Record<number, number>;
  enrolledAt?: string;
  name?: string;
  email?: string;
}

export interface CourseData {
  title: string;
  subtitle: string;
  totalStages: number;
  totalLessons: number;
  estimatedDuration: string;
  salaryRange: {
    entry: string;
    mid: string;
    senior: string;
  };
}

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem("memebu_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("memebu_visitor_id", visitorId);
  }
  return visitorId;
};

export const visitorId = getVisitorId();

export async function fetchProgress(): Promise<UserProgress> {
  const response = await fetch(`/api/progress/${visitorId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch progress");
  }
  return response.json();
}

export async function completeLesson(lessonId: number, xpEarned: number = 50): Promise<UserProgress> {
  return apiRequest("POST", "/api/lessons/complete", {
    visitorId,
    lessonId,
    xpEarned,
  });
}

export async function enrollUser(name: string, email: string): Promise<{ success: boolean; message: string; progress: UserProgress }> {
  return apiRequest("POST", "/api/enroll", {
    visitorId,
    name,
    email,
  });
}

export async function fetchCourseData(): Promise<CourseData> {
  const response = await fetch("/api/course");
  if (!response.ok) {
    throw new Error("Failed to fetch course data");
  }
  return response.json();
}
