import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

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

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProgress(visitorId: string): Promise<UserProgress | undefined>;
  saveProgress(progress: UserProgress): Promise<UserProgress>;
  updateLessonCompletion(visitorId: string, lessonId: number, xpEarned: number): Promise<UserProgress>;
  saveEnrollment(visitorId: string, name: string, email: string): Promise<UserProgress>;
  getAllEnrollments(): Promise<UserProgress[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private progress: Map<string, UserProgress>;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProgress(visitorId: string): Promise<UserProgress | undefined> {
    return this.progress.get(visitorId);
  }

  async saveProgress(progress: UserProgress): Promise<UserProgress> {
    this.progress.set(progress.visitorId, progress);
    return progress;
  }

  async updateLessonCompletion(visitorId: string, lessonId: number, xpEarned: number): Promise<UserProgress> {
    let userProgress = this.progress.get(visitorId);
    
    if (!userProgress) {
      userProgress = {
        id: randomUUID(),
        visitorId,
        completedLessons: [],
        xp: 0,
        streak: 1,
        lastVisit: new Date().toISOString(),
        quizScores: {},
      };
    }

    if (!userProgress.completedLessons.includes(lessonId)) {
      userProgress.completedLessons.push(lessonId);
      userProgress.xp += xpEarned;
    }
    
    userProgress.lastVisit = new Date().toISOString();
    this.progress.set(visitorId, userProgress);
    
    return userProgress;
  }

  async saveEnrollment(visitorId: string, name: string, email: string): Promise<UserProgress> {
    let userProgress = this.progress.get(visitorId);
    
    if (!userProgress) {
      userProgress = {
        id: randomUUID(),
        visitorId,
        completedLessons: [],
        xp: 0,
        streak: 1,
        lastVisit: new Date().toISOString(),
        quizScores: {},
      };
    }

    userProgress.name = name;
    userProgress.email = email;
    userProgress.enrolledAt = new Date().toISOString();
    
    this.progress.set(visitorId, userProgress);
    return userProgress;
  }

  async getAllEnrollments(): Promise<UserProgress[]> {
    return Array.from(this.progress.values()).filter(p => p.enrolledAt);
  }
}

export const storage = new MemStorage();
