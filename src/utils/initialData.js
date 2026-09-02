export const initialProfile = {
  name: "Ayatul Pathan",
  title: "Software Developer | Researcher | Technology Enthusiast",
  tagline: "Crafting scalable web applications, modern architectures, and exploring intelligent systems.",
  bio: "I am a passionate software developer and computer science researcher dedicated to engineering elegant, high-performance web systems. With a solid foundation in React.js, modern JavaScript ecosystems, and cloud backend architectures like Firebase, I love solving complex technical problems and contributing to cutting-edge research.",
  email: "ayatulpathan@example.com",
  phone: "+880 1700-000000",
  location: "Dhaka / Jashore, Bangladesh",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  resumeUrl: "#",
  yearsExperience: "3+",
  projectsCompleted: "20+",
  researchPapers: "3",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    email: "mailto:ayatulpathan@example.com"
  }
};

export const initialSkills = [
  // Programming Languages
  { id: "sk-1", name: "JavaScript (ES6+)", category: "Programming Languages", level: 90, icon: "Code2", order: 1 },
  { id: "sk-2", name: "Python", category: "Programming Languages", level: 85, icon: "Terminal", order: 2 },
  { id: "sk-3", name: "C / C++", category: "Programming Languages", level: 80, icon: "Cpu", order: 3 },
  { id: "sk-4", name: "Java", category: "Programming Languages", level: 75, icon: "FileCode", order: 4 },
  { id: "sk-5", name: "PHP", category: "Programming Languages", level: 70, icon: "Code", order: 5 },

  // Frontend Technologies
  { id: "sk-6", name: "React.js", category: "Frontend Technologies", level: 92, icon: "Layers", order: 6 },
  { id: "sk-7", name: "HTML5 & Semantic Web", category: "Frontend Technologies", level: 95, icon: "Globe", order: 7 },
  { id: "sk-8", name: "CSS3 & PostCSS", category: "Frontend Technologies", level: 90, icon: "Palette", order: 8 },
  { id: "sk-9", name: "Tailwind CSS", category: "Frontend Technologies", level: 92, icon: "Sparkles", order: 9 },

  // Backend Technologies
  { id: "sk-10", name: "Node.js & Express", category: "Backend Technologies", level: 85, icon: "Server", order: 10 },
  { id: "sk-11", name: "Firebase (Auth, Firestore, Storage)", category: "Backend Technologies", level: 88, icon: "Flame", order: 11 },
  { id: "sk-12", name: "RESTful APIs & Webhooks", category: "Backend Technologies", level: 88, icon: "Network", order: 12 },

  // Database
  { id: "sk-13", name: "Cloud Firestore", category: "Database", level: 88, icon: "Database", order: 13 },
  { id: "sk-14", name: "MongoDB", category: "Database", level: 82, icon: "Database", order: 14 },
  { id: "sk-15", name: "MySQL / Relational DBs", category: "Database", level: 80, icon: "Database", order: 15 },

  // Tools & DevOps
  { id: "sk-16", name: "Git & Version Control", category: "Tools & DevOps", level: 90, icon: "GitBranch", order: 16 },
  { id: "sk-17", name: "GitHub / CI Actions", category: "Tools & DevOps", level: 88, icon: "Github", order: 17 },
  { id: "sk-18", name: "VS Code & Tooling", category: "Tools & DevOps", level: 95, icon: "LayoutDashboard", order: 18 },
  { id: "sk-19", name: "npm & Vite Bundler", category: "Tools & DevOps", level: 90, icon: "Package", order: 19 }
];

export const initialEducation = [
  {
    id: "edu-1",
    institution: "Jashore University of Science and Technology",
    degree: "Bachelor of Science",
    subject: "Computer Science and Engineering",
    result: "CGPA: 3.13 / 4.00",
    startYear: "2018",
    endYear: "2022",
    description: "Completed core curriculum in Algorithms, Data Structures, Operating Systems, Database Management Systems, Software Engineering, and Artificial Intelligence. Conducted undergraduate thesis in machine learning and distributed systems.",
    location: "Jashore, Bangladesh"
  },
  {
    id: "edu-2",
    institution: "Higher Secondary Certificate (HSC)",
    degree: "Higher Secondary Certificate",
    subject: "Science",
    result: "GPA: 5.00 / 5.00",
    startYear: "2016",
    endYear: "2018",
    description: "Graduated with highest academic distinction with focus on Mathematics, Physics, Chemistry, and Information Technology.",
    location: "Dhaka, Bangladesh"
  }
];

export const initialExperience = [
  {
    id: "exp-1",
    position: "Software Developer",
    organization: "InnovateTech Solutions",
    employmentType: "Full-Time",
    startDate: "2023-01",
    endDate: "Present",
    location: "Dhaka, Bangladesh (Hybrid)",
    description: "Spearheaded the development of responsive web applications, interactive dashboards, and client-facing SaaS platforms using React.js and Node.js.",
    responsibilities: [
      "Architected and deployed responsive single-page applications (SPAs) serving 50k+ monthly active users.",
      "Integrated real-time Cloud Firestore synchronization and secure Firebase Authentication flows.",
      "Collaborated with cross-functional design and product teams to optimize web performance and Core Web Vitals.",
      "Mentored junior developers on React hooks, modular state management, and clean code standards."
    ],
    technologies: ["React.js", "Node.js", "Firebase", "Tailwind CSS", "REST API", "Git"]
  },
  {
    id: "exp-2",
    position: "Graduate Research Assistant",
    organization: "JUST Intelligent Systems Laboratory",
    employmentType: "Research Contract",
    startDate: "2022-02",
    endDate: "2022-12",
    location: "Jashore, Bangladesh",
    description: "Engaged in data analysis, deep learning model evaluation, and software pipeline development for automated pattern recognition.",
    responsibilities: [
      "Processed and cleansed high-dimensional dataset benchmarks using Python and NumPy/Pandas.",
      "Drafted scientific documentation, empirical methodology sections, and conference presentation materials.",
      "Built interactive visualization tools to display real-time machine learning prediction confidence scores."
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "LaTeX", "Data Visualization"]
  }
];

export const initialProjects = [
  {
    id: "proj-1",
    title: "Online Service Management System",
    shortDescription: "A full-featured web platform to organize, book, and track various on-demand digital and physical services.",
    description: "A comprehensive service ecosystem connecting clients with verified providers. Features include real-time booking status tracking, role-based access control for customers and providers, interactive scheduling calendars, and dynamic service catalog management.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    technologies: ["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    category: "Full Stack",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/demo-service",
    featured: true,
    startDate: "2023-03",
    completionDate: "2023-07",
    createdAt: new Date().toISOString()
  },
  {
    id: "proj-2",
    title: "AI Medical Imaging Classifier",
    shortDescription: "Deep learning web application for automated thoracic X-ray anomaly detection and heat-map visualization.",
    description: "Developed a medical intelligence diagnostic assistance portal. Provides Grad-CAM visual explanations highlighting regions of interest in chest radiography scans, helping clinicians quickly review potential pathological patterns with high confidence.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    technologies: ["Python", "PyTorch", "React.js", "FastAPI", "Tailwind CSS"],
    category: "AI & Research",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/demo-medical",
    featured: true,
    startDate: "2022-08",
    completionDate: "2023-01",
    createdAt: new Date().toISOString()
  },
  {
    id: "proj-3",
    title: "Smart Campus IoT & Resource Hub",
    shortDescription: "Real-time university facility monitor, classroom reservation, and energy usage telemetry platform.",
    description: "Engineered a smart campus dashboard that tracks IoT sensor streams for lecture room occupancy, ambient temperature, and equipment reservations. Utilizes Firebase real-time listeners for low-latency live telemetry updates.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    technologies: ["React.js", "Firebase Firestore", "Chart.js", "Tailwind CSS"],
    category: "Frontend & Cloud",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/demo-campus",
    featured: true,
    startDate: "2022-01",
    completionDate: "2022-06",
    createdAt: new Date().toISOString()
  },
  {
    id: "proj-4",
    title: "Enterprise Task & Sprint Tracker",
    shortDescription: "Kanban workflow manager with drag-and-drop task boards, sprint analytics, and team collaboration.",
    description: "A collaborative productivity tool inspired by Jira and Trello. Features customizable swimlanes, sub-task breakdowns, deadline alerts, activity audit logs, and instant team chat integration.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    technologies: ["React.js", "Firebase Auth", "Firestore", "Tailwind CSS"],
    category: "Full Stack",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/demo-tasks",
    featured: false,
    startDate: "2023-08",
    completionDate: "2023-11",
    createdAt: new Date().toISOString()
  }
];

export const initialResearch = [
  {
    id: "res-1",
    title: "Deep Learning Approaches for Automated Anomaly Detection in High-Dimensional Time-Series",
    field: "Artificial Intelligence & Distributed Systems",
    abstract: "This paper examines novel deep learning attention mechanisms designed for multi-sensor temporal anomaly identification. We demonstrate that transformer-based temporal representations outperform standard recurrent baselines in both precision and computational efficiency across real-world telemetry benchmarks.",
    methodology: "Implemented hybrid 1D-CNN and Multi-Head Self-Attention architectures evaluated against standard telemetry benchmarks using precision-recall AUC metrics.",
    results: "Achieved a 94.8% F1-score with 35% reduction in training latency compared to conventional LSTM networks.",
    technologies: ["Python", "PyTorch", "NumPy", "Matplotlib", "Pandas"],
    publicationInfo: "International Conference on Computer Science and Engineering Insights (ICCSEI 2023)",
    paperUrl: "https://example.com/papers/anomaly-detection-deeplearning.pdf",
    year: "2023"
  },
  {
    id: "res-2",
    title: "Performance Benchmarking of Serverless vs Containerized Backend Architectures for Real-Time Web Apps",
    field: "Cloud Computing & Web Engineering",
    abstract: "A comparative empirical study analyzing cold-start latency, memory throughput, and autoscaling behavior across modern serverless platforms (Google Cloud Functions, Firebase) versus containerized microservices under fluctuating burst traffic.",
    methodology: "Simulated load testing using automated Locust and JMeter load generators across 100,000 concurrent simulated requests.",
    results: "Quantified 40% infrastructure cost savings in sporadic workloads with Firebase Firestore caching pipelines.",
    technologies: ["React.js", "Firebase", "Docker", "Node.js", "JMeter"],
    publicationInfo: "Journal of Modern Cloud Software Architectures, Vol. 4",
    paperUrl: "https://example.com/papers/serverless-benchmarking.pdf",
    year: "2022"
  }
];

export const initialMessages = [
  {
    id: "msg-1",
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.io",
    subject: "Software Engineering Opportunity at TechCorp",
    message: "Hi Ayatul, I reviewed your impressive portfolio and recent projects. We have an open Full Stack Developer role that matches your skills in React and Firebase. Would you be open for a quick introductory call?",
    status: "unread",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "msg-2",
    name: "Dr. David Miller",
    email: "d.miller@university.edu",
    subject: "Research Collaboration Inquiry",
    message: "Hello Ayatul, I came across your paper on automated anomaly detection. We are conducting related research on sensor networks and would like to discuss potential collaborative extensions.",
    status: "read",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  }
];
