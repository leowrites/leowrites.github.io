const personalInfo = {
  description: [
    `I'm a fourth year Computer Science student at the University of Toronto.`,
    `I have a interest in systems, performance optimization and machine learning. 
      At school, I have taken courses such as Compilers, Computer Architecture, Operating Systems, 
      and Machine Learning.`,
    `I'm currently working as a Software Engineer Intern at Mozilla, and as a Research Assistant for the ParaMathics Lab.`,
  ],
  email: "leo@liuwork.ca",
  phone: "(778) 990-6015",
  github: "github.com/leowrites",
  linkedin: "linkedin.com/in/siqiliu-",
};

const education = [
  {
    institution: "University of Toronto",
    degree: "Bachelor of Science in Computer Science",
    dates: "Sep 2021 - May 2026",
    courses:
      "ML, Compilers & Interpreters, Computer Architecture, Parallel Programming",
  },
];

const experience = [
  {
    title: "Software Engineer Intern",
    organization: "Mozilla",
    location: "Toronto, ON",
    dates: "May 2025 - Present",
    caption: "Firefox Privacy",
    bullets: ["WIP!"],
    tags: ["C++", "JavaScript"],
  },
  {
    title: "Research Assistant",
    organization: "ParaMathics Lab, University of Toronto",
    location: "Toronto, ON",
    dates: "May 2025 - Present",
    caption:
      "Researching compiler optimizations for machine learning workloads using MLIR and LLVM",
    bullets: [
      `This project aims to advance machine learning compiler infrastructure by 
        leveraging MLIR (Multi-Level Intermediate Representation) and LLVM (Low-Level Virtual Machine) 
        technologies. Our objective is to enhance the performance, portability, and flexibility 
        of machine learning models across diverse hardware platforms. We will focus on integrating 
        MLIR into LLVM, enabling a unified compiler stack capable of optimizing ML workloads at multiple 
        abstraction levels.`,
    ],
    tags: ["Research", "Compiler", "LLVM", "MLIR", "Machine Learning", "C++"],
  },
  {
    title: "Software Engineer Intern",
    organization: "Seismic",
    location: "Toronto, ON",
    dates: "Sep 2024 - Dec 2024",
    caption:
      "Full-Stack developer on LiveSocial, a platform for curating personalized content for sales teams",
    bullets: [
      `Delivered a highly requested full-stack feature (React, Express) giving admins greater access control over
platform-specific content sharing, enhancing customization for over 2,000 client companies`,
      `Transformed a client configuration update process to self-service, reducing configuration update time by 99% by
migrating legacy configurations for 9 clients from file-based storage to MongoDB`,
      `Resolved 20+ bugs through systematic root cause analysis, reducing recurring support tickets by 5% and eliminating
several months-old persistent issues through collaborations with customer success and product team`,
    ],
    tags: [
      "Fullstack",
      "TypeScript",
      "MongoDB",
      "React",
      "Express",
      "Frontend",
      "Backend",
      "Node.js",
    ],
  },
  {
    title: "Software Development Intern",
    organization: "Konrad",
    location: "Toronto, ON",
    dates: "May 2024 - Aug 2024",
    caption:
      "Backend developer on an internal tool for managing and analyzing gaming data",
    bullets: [
      `Developed a daily data ingestion pipeline integrating 4 gaming platform APIs to automatically fetch and aggregate
game statistics for over 500 employees, enabling real-time leaderboard functionality`,
      `Optimized API efficiency by implementing GraphQL resolvers with Apollo Express, reducing complex nested query
latency from 600ms to 150ms by eliminating request waterfalls, achieving 75% faster data fetching`,
    ],
    tags: [
      "Backend",
      "GraphQL",
      "Apollo",
      "Express",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
    ],
  },
  {
    title: "Software Developer Intern",
    organization: "SKYTRAC",
    location: "Ottawa, ON",
    dates: "May 2023 - Aug 2023",
    bullets: [
      `Reduced flight analysts' workflows by 15\% by building a web dashboard with BackboneJS, automatically retrieving flight data from the MySQL database to allow efficient viewing and annotation of flight events`,
      `Identified 1 critical data inconsistency with an automated Python data verification script across flight log databases`,
    ],
    tags: ["Backend", "Python", "MySQL", "BackboneJS"],
  },
];

const projects = [
  {
    name: "Minicc Compiler",
    description: "A toy compiler for minicc, a subset of C",
    technologies: "C++, Antlr4, LLVM",
    bullets: [
      "Implemented a compiler capable of parsing and translating minicc code into LLVM IR",
      "Implemented alloca2reg optimization pass to reduce stack allocation overhead, achieving a 23% reduction in runtime",
    ],
    tags: ["Compiler", "C++", "LLVM"],
  },
  {
    name: "Accelerating Particle Collision Simulation",
    description:
      "Leveraging multi-threading and distributed computing for performance",
    technologies: "C++, OpenMP, OpenMPI",
    bullets: [
      "Experimented with different optimization techniques such as binning, static arrays, and bucket sort to decrease sequential runtime from 53 seconds to 18 seconds for simulating 160,000 particles on SciNet, achieving a 2.94x increase and establishing a sequential baseline",
      "Leveraged OpenMP to parallize 90% of the sequential code using static decomposition and uniform partitioning of data, further reducing the runtime to 2 seconds and achieving a performance improvement of 9x",
    ],
    tags: ["C++", "OpenMP", "OpenMPI"],
  },
  {
    name: "Food Item Classifier",
    description: "A machine learning experiment to classify food items",
    technologies: "Python, sklearn",
    bullets: [
      "Developed a model to classify food items based on text questions using random forest, neural networks and linear regression models.",
      "Achieved an accuracy of over 85% on the validation dataset and 80% on the test dataset.",
    ],
    tags: ["Machine Learning", "Python", "sklearn"],
  },
  {
    name: "Cloud-based Pandemic Simulation Service",
    description:
      "Collaboration with morLab to build a cloud-based simulation service",
    technologies: "Python, Django, AWS",
    dates: "Jan 2023 - May 2023",
    bullets: [
      "Developed a user-friendly web interface using React and Django for a C++ pandemic simulation model, improving model accessibility and simplifying workflows for epidemiologists and healthcare researchers.",
      "Improved accessibility to a C++ pandemic simulation model for epidemiologists and healthcare researchers by implementing 10+ RESTful Django endpoints, transforming a C++ application into a user friendly web platform",
      "Enabled scalable, concurrent pandemic simulation runs with automated output to a PostgreSQL instance by architecting a pipeline integrating the Django backend with AWS SQS and Batch",
    ],
    tags: ["Backend", "Python", "Django", "AWS", "PostgreSQL"],
  },
  {
    name: "MemoryViz & PythonTA",
    description: "Visualizing Memory Management in Python",
    technologies: "Python, TypeScript",
    dates: "Sept 2021 - Dec 2021",
    bullets: [
      `Spearheaded the development of Webstepper, an interactive, educational Python memory visualization tool.`,
      `Adopted by 900+ students each semester in Computer Science fundamentals courses at UofT, providing a hands-on approach to understanding programming concepts such as memory and references.`,
    ],
    tags: ["Python", "TypeScript", "React"],
  },
  {
    name: "Campfire",
    description:
      "An internship review platform to connect recruiters and job-seekers",
    technologies: "React, Java, SprintBoot, PostgreSQL",
    bullets: [
      "Developed scalable and maintainable Spring Boot endpoints by following the SOLID principles",
      "Achieved 80% code coverage with over 50 unit and integration tests, running automatically in a Docker container on Github Actions",
      "Configured automated testing by building a Docker continuous integration pipeline to run a total of 50+ tests on Github Actions for a 80% code coverage",
    ],
    tags: [
      "Fullstack",
      "Frontend",
      "Backend",
      "Java",
      "SpringBoot",
      "PostgreSQL",
      "React",
      "TypeScript",
    ],
  },
  {
    name: "Pacman Game with AI",
    description: "Computer Game with Custom AI Algorithms",
    technologies: "Python, Pygame",
    dates: "Sept 2022 - Dec 2022",
    bullets: [
      "Implemented A* pathfinding algorithm for ghost movement with different behavior patterns",
      "Created a scoring system with multiple game levels and enhanced user experience with sound effects",
    ],
  },
  {
    name: "Model Rocket with Vectored Thrust",
    description: "Engineering Project",
    technologies: "Arduino, 3D Printing",
    dates: "May 2022 - Aug 2022",
    bullets: [
      "Designed custom thrust vectoring mechanism for enhanced flight control",
      "Programmed Arduino-based flight controller and implemented telemetry system",
    ],
  },
];

const volunteering = [
  {
    title: "President",
    organization: "UofT Blueprint",
    location: "Toronto, ON",
    dates: "Aug 2023 - May 2024",
    bullets: [
      `Led 40+ members in delivering pro-bono software solutions to 3 nonprofits, while establishing corporate partnerships with Manulife and Guidewire to facilitate internship preparation events for 100+ students`,
      `Established Project Lead Hub and comprehensive Handbook to standardize project management methodologies, client requirement scoping, and team engagement best practices`,
    ],
    tags: ["Leadership", "Club", "Project Management"],
  },
  {
    title: "Project Lead",
    organization: "UofT Blueprint",
    location: "Toronto, ON",
    dates: "Aug 2023 - Aug 2024",
    bullets: [
      `Increased menstruation awareness by partnering with The Period Purse and developing an educational Android period tracker for Canadian youth, available on Google Play Store with over 50 downloads`,
      `Managed a 7-people development team through backlog refinement, prioritization and modularization, implementing all 8 use-cases as specified and completing 90+ tickets over 1 year`,
    ],
    tags: ["Leadership", "Project Management", "Kotlin", "Android"],
  },
];

export { personalInfo, education, experience, projects, volunteering };
