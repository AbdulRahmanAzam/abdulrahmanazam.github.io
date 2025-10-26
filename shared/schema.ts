import { z } from "zod";

// Portfolio data types
export const skillSchema = z.object({
  name: z.string(),
  category: z.enum(["web", "aiml"]),
  proficiency: z.number().min(0).max(100),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  period: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  highlights: z.array(z.string()),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  period: z.string(),
  score: z.string(),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Achievement = z.infer<typeof achievementSchema>;

// Portfolio data
export const portfolioData = {
  name: "Abdul Rahman Azam",
  title: "AI/ML Engineer & Developer",
  tagline: "Crafting Code That Thinks — and Ideas That Build Themselves.r",
  
  skills: {
    web: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "PostgreSQL" },
      { name: "REST APIs" },
    ],
    aiml: [
      { name: "Python" },
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Scikit-learn" },
      { name: "Pandas & NumPy" },
      { name: "Data Visualization" },
    ],
  },
  
  projects: [
    {
      id: "university-platform",
      title: "University Resource Sharing Platform",
      period: "Jan - May 2025",
      description: "Developed a centralized platform using React.js, Node.js, Express.js, Tailwind CSS, REST APIs for FAST-NUCES students to share resources, join communities, and interact via posts, comments, and file sharing.",
      technologies: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "PostgreSQL", "Sequelize ORM"],
      highlights: [
        "Implemented secure email-based authentication",
        "Built admin moderation system",
        "Designed scalable database architecture",
      ],
    },
    {
      id: "super-tictactoe",
      title: "Super Tic Tac Toe (AI-based Web Game)",
      period: "April - May 2025",
      description: "Implemented a web-based Super Tic-Tac-Toe game featuring a 9x9 multi-board system and custom scoring model.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Minimax Algorithm", "Alpha-Beta Pruning"],
      highlights: [
        "Developed intelligent AI opponent using Minimax with Alpha-Beta Pruning",
        "Enabled optimal and efficient decision-making",
        "Created custom scoring model for complex game states",
      ],
    },
    {
      id: "income-predictor",
      title: "Income Predictor - Data Analysis",
      period: "Sep - Dec 2024",
      description: "Built a full-stack ML income prediction app using KNN (85% accuracy) with React, TypeScript, FastAPI, and Python on the Adult Census dataset (32,000+ entries).",
      technologies: ["React", "TypeScript", "FastAPI", "Python", "Scikit-learn", "Pandas", "NumPy"],
      highlights: [
        "Achieved 85% prediction accuracy with KNN algorithm",
        "Automated complete data analysis pipeline",
        "Generated 50+ visualizations for insights",
        "Implemented real-time model insights across 10 KNN variations",
      ],
    },
    {
      id: "2d-platformer",
      title: "2D Platformer Game",
      period: "Feb - May 2024",
      description: "A fast-paced action game featuring enemies and reloading weapon systems. Recognized as one of the top 1% projects at university for creativity.",
      technologies: ["C++", "SFML Library", "OOP"],
      highlights: [
        "Recognized as top 1% project at university",
        "Implemented complex collision detection",
        "Used Pure C++ with SFML library",
        "Reinforced Object-Oriented Programming principles",
      ],
    },
    {
      id: "ai-tictactoe",
      title: "AI based Tic-Tac-Toe Game",
      period: "Sep - Dec 2023",
      description: "Developed a strategic game with 100% win rate against human players using Minimax Algorithm.",
      technologies: ["C", "Minimax Algorithm", "Game Theory"],
      highlights: [
        "100% win rate against human players",
        "Three gameplay modes: 2-Player, random CPU, unbeatable AI",
        "Implemented using Pure C language",
      ],
    },
  ],
  
  education: [
    {
      id: "fast",
      institution: "FAST NUCES Karachi",
      degree: "BS in Artificial Intelligence",
      period: "2021 - Present",
      score: "CGPA: 3.33",
    },
    {
      id: "adamjee",
      institution: "Adamjee Govt. College",
      degree: "Intermediate in Pre-Engineering",
      period: "2019 - 2021",
      score: "80%",
    },
    {
      id: "happy-palace",
      institution: "Happy Palace School",
      degree: "Matric in Computer Science",
      period: "2017 - 2019",
      score: "98.12%",
    },
  ],
  
  achievements: [
    {
      id: "leetcode",
      title: "LeetCode Achievement",
      description: "Solved 290+ problems on LeetCode and earned 6 skill badges, strengthening algorithms and data structures.",
      icon: "code",
    },
    {
      id: "competitions",
      title: "Competition Success",
      description: "Secured 2nd Place in Web Hunt Competition and 3rd Place in ACM Coders Cup.",
      icon: "trophy",
    },
    {
      id: "hackerrank",
      title: "HackerRank Certifications",
      description: "Achieved Problem Solving – Basic & Intermediate certifications on HackerRank.",
      icon: "certificate",
    },
    {
      id: "chatgpt",
      title: "ChatGPT Certification",
      description: "Completed ChatGPT for Everyone (Learn Prompting) certification.",
      icon: "sparkles",
    },
  ],
  
  social: {
    github: "https://github.com/abdulrahmanazam",
    linkedin: "https://linkedin.com/in/abdulrahmanazam",
    leetcode: "https://leetcode.com/abdulrahmanazam",
    email: "azamabdulrahman930@gmail.com",
  },
} as const;