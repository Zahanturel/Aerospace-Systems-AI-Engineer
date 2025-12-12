import type { SalaryInfo, RoadmapStage, Lesson, DayActivity, AIComparisonMetric } from "@shared/schema";

export const courseInfo = {
  title: "Aerospace Systems AI Engineer",
  subtitle: "Launch your career into the stratosphere where AI meets aerospace engineering. Develop intelligent flight control systems, autonomous navigation algorithms, and predictive maintenance solutions for aircraft, drones, and spacecraft.",
  enrollmentCTA: "Start Your Journey",
  limitedSpots: true,
};

export const salaryData: SalaryInfo[] = [
  { level: "Entry Level", range: "₹6-10 LPA", description: "Fresh graduates with relevant skills" },
  { level: "Mid Level", range: "₹12-22 LPA", description: "2-5 years of experience" },
  { level: "Senior Level", range: "₹30-45+ LPA", description: "5+ years with leadership roles" },
];

export const growthInfo = "Surging demand as space tech and UAV industries expand across defense and commercial sectors";
export const impactInfo = "Improve flight safety by 40-50%, reduce fuel consumption by 15-25%, and enable autonomous operations that transform aerospace capabilities";

export const roadmapStages: RoadmapStage[] = [
  {
    id: 1,
    title: "Foundation: Aerospace Fundamentals",
    duration: "3-4 months",
    skills: [
      "Flight mechanics and aerodynamics",
      "Control systems theory",
      "Aircraft/UAV dynamics and stability",
      "Sensor technologies for aerospace",
      "MATLAB/Simulink for modeling",
      "Aerospace standards and regulations",
    ],
    projects: [
      "Model aircraft dynamics in MATLAB/Simulink",
      "Design basic flight control system",
      "Analyze stability and control characteristics",
      "Study sensor data from flight systems",
    ],
  },
  {
    id: 2,
    title: "Core: AI & Machine Learning",
    duration: "3-4 months",
    skills: [
      "Python for aerospace applications",
      "Machine learning for sensor data",
      "Flight simulation platforms",
      "Digital twin development",
      "Real-time data processing",
      "Autonomous navigation basics",
    ],
    projects: [
      "Build ML models for flight data analysis",
      "Create digital twin of UAV system",
      "Implement sensor data processing pipeline",
      "Develop basic autonomous navigation algorithm",
    ],
    isJobReady: true,
    jobReadyTitle: "Junior AI Engineer - Aerospace",
  },
  {
    id: 3,
    title: "Advanced: Specialization",
    duration: "3-4 months",
    skills: [
      "Reinforcement learning for flight optimization",
      "Computer vision for navigation",
      "Multi-agent systems coordination",
      "AI-driven mission planning",
      "Edge computing for onboard AI",
      "Integration with ROS and autopilot systems",
    ],
    projects: [
      "Train RL agent for optimal flight paths",
      "Implement vision-based navigation system",
      "Build multi-drone coordination system",
      "Deploy AI on embedded flight controller",
    ],
  },
];

export const freeTrialLessons: Lesson[] = [
  {
    id: 1,
    title: "What is Aerospace AI?",
    description: "Discover how AI is revolutionizing flight",
    duration: "5 min",
    type: "explainer",
    isLocked: false,
    isCompleted: false,
    content: {
      text: "Aerospace AI combines artificial intelligence with aerospace engineering to create smarter, safer, and more efficient flying machines. From autonomous drones to intelligent flight control systems, AI is transforming how we design, operate, and maintain aircraft and spacecraft.",
      audioText: "Welcome to Aerospace AI! In this lesson, you'll discover how artificial intelligence is revolutionizing the way we fly. From the autopilot systems in commercial jets to the autonomous navigation of Mars rovers, AI is everywhere in aerospace.",
      diagram: "aerospace-ai-overview",
    },
  },
  {
    id: 2,
    title: "Key Concepts Flashcards",
    description: "Master essential aerospace AI terminology",
    duration: "7 min",
    type: "flashcard",
    isLocked: false,
    isCompleted: false,
    content: {
      cards: [
        { front: "What is a Flight Control System?", back: "A system that controls an aircraft's flight surfaces (ailerons, elevators, rudder) automatically or with pilot input to maintain stable flight." },
        { front: "What is Sensor Fusion?", back: "The process of combining data from multiple sensors (GPS, IMU, cameras) to create a more accurate understanding of the aircraft's state." },
        { front: "What is Autonomous Navigation?", back: "The ability of an aircraft to determine its position and plan its route without human intervention, using AI and sensor data." },
        { front: "What is Predictive Maintenance?", back: "Using AI to analyze sensor data and predict when aircraft components will fail, allowing maintenance before problems occur." },
        { front: "What is a Digital Twin?", back: "A virtual replica of a physical aircraft that uses real-time data to simulate performance and predict behavior." },
      ],
    },
  },
  {
    id: 3,
    title: "Quick Knowledge Check",
    description: "Test your understanding so far",
    duration: "3 min",
    type: "quiz",
    isLocked: false,
    isCompleted: false,
    content: {
      questions: [
        {
          question: "What is the primary goal of AI in aerospace systems?",
          options: [
            "To replace all human pilots",
            "To improve safety, efficiency, and enable autonomous operations",
            "To make aircraft fly faster",
            "To reduce the cost of fuel only",
          ],
          correctIndex: 1,
          explanation: "AI in aerospace focuses on enhancing safety, improving operational efficiency, and enabling autonomous capabilities while working alongside human operators.",
        },
        {
          question: "Which technique combines data from multiple sensors for better accuracy?",
          options: ["Data mining", "Sensor fusion", "Machine learning", "Cloud computing"],
          correctIndex: 1,
          explanation: "Sensor fusion combines data from multiple sensors like GPS, accelerometers, and cameras to create a more complete and accurate picture of the aircraft's state.",
        },
        {
          question: "What does a 'Digital Twin' refer to in aerospace?",
          options: [
            "Two identical aircraft",
            "A virtual replica that simulates real aircraft behavior",
            "A backup flight computer",
            "Twin-engine aircraft design",
          ],
          correctIndex: 1,
          explanation: "A Digital Twin is a virtual model that mirrors a physical aircraft, using real-time data to simulate performance, predict maintenance needs, and optimize operations.",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Match the Concepts",
    description: "Connect AI techniques to their applications",
    duration: "5 min",
    type: "puzzle",
    isLocked: false,
    isCompleted: false,
    content: {
      type: "matching",
      instruction: "Match each AI technique to its aerospace application",
      items: [
        { left: "Computer Vision", right: "Obstacle detection & landing" },
        { left: "Reinforcement Learning", right: "Optimal flight path planning" },
        { left: "Natural Language Processing", right: "Pilot-AI communication" },
        { left: "Neural Networks", right: "Engine anomaly detection" },
      ],
    },
  },
  {
    id: 5,
    title: "Your First Code",
    description: "See real Python for aerospace",
    duration: "8 min",
    type: "code",
    isLocked: false,
    isCompleted: false,
    content: {
      language: "python",
      code: `# Simple altitude controller using PID
import numpy as np

class AltitudeController:
    def __init__(self, kp=1.0, ki=0.1, kd=0.5):
        self.kp = kp  # Proportional gain
        self.ki = ki  # Integral gain
        self.kd = kd  # Derivative gain
        self.integral = 0
        self.prev_error = 0
    
    def compute(self, target_alt, current_alt, dt):
        error = target_alt - current_alt
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt
        
        output = (self.kp * error + 
                  self.ki * self.integral + 
                  self.kd * derivative)
        
        self.prev_error = error
        return output

# Example usage
controller = AltitudeController()
thrust = controller.compute(
    target_alt=1000,  # meters
    current_alt=850,
    dt=0.1
)
print(f"Thrust adjustment: {thrust:.2f}")`,
      explanation: "This is a basic PID (Proportional-Integral-Derivative) controller for maintaining aircraft altitude. It calculates the difference between target and current altitude, then outputs a thrust adjustment. This is the foundation of automated flight control!",
      runnable: true,
    },
  },
];

export const dayInLifeActivities: DayActivity[] = [
  {
    time: "9:00 AM",
    activity: "Algorithm Development",
    description: "Develop and test AI algorithms for autonomous flight control systems",
    tools: ["Python", "TensorFlow", "ROS"],
  },
  {
    time: "10:30 AM",
    activity: "Data Analysis",
    description: "Analyze flight data to train ML models for predictive maintenance",
    tools: ["Pandas", "Scikit-learn", "MATLAB"],
  },
  {
    time: "12:00 PM",
    activity: "Simulation Testing",
    description: "Run simulations to validate AI decision-making in various flight scenarios",
    tools: ["Simulink", "X-Plane", "Gazebo"],
  },
  {
    time: "2:00 PM",
    activity: "Team Collaboration",
    description: "Collaborate with aerospace engineers on sensor fusion and navigation",
    tools: ["JIRA", "Confluence", "Git"],
  },
  {
    time: "3:30 PM",
    activity: "Optimization",
    description: "Optimize reinforcement learning policies for fuel efficiency and safety",
    tools: ["PyTorch", "OpenAI Gym", "Ray"],
  },
  {
    time: "5:00 PM",
    activity: "System Integration",
    description: "Integrate AI systems with existing autopilot and mission control platforms",
    tools: ["C++", "PX4", "ArduPilot"],
  },
];

export const aiComparisonMetrics: AIComparisonMetric[] = [
  { metric: "Salary", withAI: "+45% higher", traditional: "Baseline", improvement: "45%" },
  { metric: "Productivity", withAI: "+70% increase", traditional: "Baseline", improvement: "70%" },
  { metric: "Work-Life Balance", withAI: "Significantly Better", traditional: "Standard", improvement: "Better" },
  { metric: "Career Growth", withAI: "Accelerated", traditional: "Linear", improvement: "Faster" },
];
