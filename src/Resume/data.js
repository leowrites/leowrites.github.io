import { Link } from "@mui/material";

const personalInfo = {
  description: [
    <span>
      I'm final year Computer Science student at the{" "}
      <Link
        href="https://web.cs.toronto.edu/"
        color="secondary"
        underline="hover"
        target="_blank"
        rel="noopener"
      >
        University of Toronto
      </Link>
      .
    </span>,
    `I have an interest in systems, performance optimization and machine learning. 
      At school, I have taken courses such as Compilers, Computer Architecture, Operating Systems, 
      and Deep Learning.`,
    <span>
      Some of the most exciting projects I've worked on include contributing to
      the{" "}
      <Link
        href="https://github.com/openai/triton"
        color="secondary"
        underline="hover"
        target="_blank"
        rel="noopener"
      >
        Triton
      </Link>{" "}
      lang & compiler for parallel programming, and enhancing{" "}
      <Link
        href="https://www.mozilla.org/en-US/firefox/"
        color="secondary"
        underline="hover"
        target="_blank"
        rel="noopener"
      >
        Firefox
      </Link>{" "}
      Privacy at Mozilla.
    </span>,
  ],
  email: "leo@liuwork.ca",
  phone: "(778) 990-6015",
  github: "github.com/leowrites",
  linkedin: "linkedin.com/in/leowrites/",
};

const education = [
  {
    institution: "University of Toronto",
    degree: "Bachelor of Science in Computer Science",
    dates: "Sep 2021 - May 2026",
    courses:
      "Algorithms Design and Complexity, Compilers & Interpreters, Computer Architecture, Deep Learning, Intro to ML, Computer Networks, Operating Systems, Parallel Programming, Databases, Intro to AI, Software Engineering, Software Design, Functional Programming",
  },
];

const experience = [
  {
    title: "Undergraduate Researcher",
    organization: "ParaMathics Lab, University of Toronto",
    url: "http://paramathic.com",
    location: "Toronto, ON",
    dates: "May 2025 - Present",
    caption:
      "Adding support for structured sparsity matrix multiplication to Triton",
    details: [
      {
        title: "Research Focus",
        content:
          "Researching compiler optimizations for machine learning workloads using MLIR and LLVM at ParaMathics Lab.",
      },
      {
        title: "OpenAI Triton Compiler",
        content: (
          <span>
            Contributed mixed-sparsity 2:4 kernel support for NVIDIA Tensor
            Cores in{" "}
            <Link
              href="https://github.com/openai/triton"
              color="secondary"
              underline="hover"
              target="_blank"
              rel="noopener"
            >
              OpenAI's Triton compiler
            </Link>
            , achieving up to 37% throughput gains over cuSPARSELt.
          </span>
        ),
      },
      {
        title: "Kernel Optimization",
        content:
          "Optimized kernels to achieve up to 8% performance gains with autotuned configurations, addressing issues related to L2 cache utilization, tail effects, and load imbalance.",
      },
    ],
    tags: ["Research", "Compiler", "LLVM", "MLIR", "Machine Learning", "C++"],
  },
  {
    title: "Software Engineer Intern",
    organization: "Mozilla",
    url: "https://www.mozilla.org",
    location: "Toronto, ON",
    dates: "May 2025 - Sep 2025",
    caption: "Firefox Privacy",
    details: [
      {
        title: "Introduction",
        content: (
          <span>
            <Link
              href="https://www.mozilla.org/en-US/firefox/new/"
              color="secondary"
              underline="hover"
              target="_blank"
              rel="noopener"
            >
              Firefox
            </Link>{" "}
            is one of the world's most popular browsers, known for its strong
            privacy protections. As part of the Firefox Privacy team, I worked
            on enhancing user control over their privacy settings, specifically
            addressing the balance between strict tracking protection and web
            compatibility.
          </span>
        ),
      },
      {
        title: "The Challenge",
        content:
          "Enhanced Tracking Protection (ETP) is great for privacy, but 'Strict' mode often breaks websites that rely on trackers for functionality (e.g., login flows, payment gateways). Users would enable Strict mode, encounter broken sites, and confusingly disable ETP entirely, leaving them unprotected.",
      },
      {
        title: "Implementation",
        content:
          "I designed and implemented a new privacy customization feature that allows users to toggle protections for specific sites directly in the Privacy settings page. This involved collaborating with UX designers to create an intuitive 'breaking site' recovery flow and engineering the backend logic to dynamically exempt sites from strict blocking rules without compromising global settings.",
      },
      {
        title: "Result",
        content: (
          <span>
            The feature was shipped to over 1.5 million{" "}
            <Link
              href="https://www.mozilla.org/en-US/firefox/new/"
              color="secondary"
              underline="hover"
              target="_blank"
              rel="noopener"
            >
              Firefox
            </Link>{" "}
            users. It successfully resolved over 1,000 reported site-breaking
            issues, significantly reducing support tickets. More importantly, it
            increased the adoption of Strict Tracking Protection by giving users
            the tool to manage exceptions granularly rather than disabling
            protection globally.
          </span>
        ),
      },
    ],
    tags: ["C++", "JavaScript"],
    logo: "/mozilla.svg",
  },
  {
    title: "Software Engineer Intern",
    organization: "Seismic",
    url: "https://seismic.com",
    location: "Toronto, ON",
    dates: "Sep 2024 - Dec 2024",
    caption: (
      <span>
        Full-Stack developer for{" "}
        <Link
          href="https://www.seismic.com/customer-stories/seismic-livesocial/"
          color="secondary"
          underline="hover"
          target="_blank"
          rel="noopener"
        >
          Seismic LiveSocial
        </Link>{" "}
      </span>
    ),
    details: [
      {
        title: "Project: LiveSocial",
        content:
          "Full-Stack developer on LiveSocial, a platform for curating personalized content for sales teams.",
      },
      {
        title: "Feature Development",
        content:
          "Delivered a highly requested full-stack feature (React, Express) giving admins greater access control over platform-specific content sharing, enhancing customization for over 2,000 client companies.",
      },
      {
        title: "Process Improvement",
        content:
          "Transformed a client configuration update process to self-service, reducing configuration update time by 99% by migrating legacy configurations for 9 clients from file-based storage to MongoDB.",
      },
      {
        title: "Engineering Excellence",
        content:
          "Resolved 20+ bugs through systematic root cause analysis, reducing recurring support tickets by 5% and eliminating several months-old persistent issues through collaborations with customer success and product team.",
      },
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
    logo: "/seismic.svg",
  },
  {
    title: "Software Development Intern",
    organization: "Konrad",
    url: "https://www.konrad.com",
    location: "Toronto, ON",
    dates: "May 2024 - Aug 2024",
    caption: "",
    details: [
      {
        title: "Internal Gaming Tool",
        content:
          "Backend developer on an internal tool for managing and analyzing gaming data.",
      },
      {
        title: "Data Pipeline",
        content:
          "Developed a daily data ingestion pipeline integrating 4 gaming platform APIs to automatically fetch and aggregate game statistics for over 500 employees, enabling real-time leaderboard functionality.",
      },
      {
        title: "Performance Optimization",
        content:
          "Optimized API efficiency by implementing GraphQL resolvers with Apollo Express, reducing complex nested query latency from 600ms to 150ms by eliminating request waterfalls, achieving 75% faster data fetching.",
      },
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
    logo: "/kg.svg",
  },
  {
    title: "Software Developer Intern",
    organization: "SKYTRAC",
    url: "https://www.skytrac.ca",
    location: "Ottawa, ON",
    dates: "May 2023 - Aug 2023",
    details: [
      {
        title: "Flight Data Dashboard",
        content: `Reduced flight analysts' workflows by 15% by building a web dashboard with BackboneJS, automatically retrieving flight data from the MySQL database to allow efficient viewing and annotation of flight events.`,
      },
      {
        title: "Data Integrity",
        content:
          "Identified 1 critical data inconsistency with an automated Python data verification script across flight log databases.",
      },
    ],
    tags: ["Backend", "Python", "MySQL", "BackboneJS"],
  },
];

const projects = [
  {
    title: "Minicc Compiler",
    caption: "A toy compiler for minicc, a subset of C",
    technologies: "C++, Antlr4, LLVM",
    details: [
      {
        title: "Summary",
        content:
          "Implemented a compiler capable of parsing and translating minicc code into LLVM IR, featuring an alloca2reg optimization pass that reduces stack allocation overhead, achieving a 23% reduction in runtime.",
      },
    ],
    tags: ["Compiler", "C++", "LLVM"],
  },
  {
    title: "Accelerating Particle Collision Simulation",
    caption:
      "Leveraging multi-threading and distributed computing for performance",
    technologies: "C++, OpenMP, OpenMPI",
    details: [
      {
        title: "Summary",
        content:
          "Optimized particle simulation using binning, static arrays, and bucket sort, improving sequential runtime from 53s to 18s (2.94x) for 160k particles on SciNet. Further reduced runtime to 2s (9x) by parallelizing 90% of the code with OpenMP using static decomposition and uniform partitioning.",
      },
    ],
    tags: ["C++", "OpenMP", "OpenMPI"],
  },
  {
    title: "Food Item Classifier",
    caption: "A machine learning experiment to classify food items",
    technologies: "Python, sklearn",
    details: [
      {
        title: "Summary",
        content:
          "Developed a model to classify food items based on text questions using random forest, neural networks and linear regression models, achieving an accuracy of over 85% on the validation dataset and 80% on the test dataset.",
      },
    ],
    tags: ["Machine Learning", "Python", "sklearn"],
  },
  {
    title: "Cloud-based Pandemic Simulation Service",
    caption:
      "Collaboration with morLab to build a cloud-based simulation service",
    technologies: "Python, Django, AWS",
    dates: "Jan 2023 - May 2023",
    details: [
      {
        title: "Summary",
        content:
          "Built a user-friendly web platform using React and Django to make a C++ pandemic simulation model accessible to epidemiologists. Implemented 10+ RESTful endpoints and architected an AWS SQS/Batch pipeline for scalable, concurrent simulations with automated PostgreSQL output.",
      },
    ],
    tags: ["Backend", "Python", "Django", "AWS", "PostgreSQL"],
  },
  {
    title: "MemoryViz & PythonTA",
    caption: "Visualizing Memory Management in Python",
    technologies: "Python, TypeScript",
    dates: "Sept 2021 - Dec 2021",
    details: [
      {
        title: "Summary",
        content:
          "Spearheaded the development of Webstepper, an interactive Python memory visualization tool adopted by 900+ students each semester in CS fundamentals courses at UofT to teach memory and reference concepts.",
      },
    ],
    tags: ["Python", "TypeScript", "React"],
  },
  {
    title: "Campfire",
    caption:
      "An internship review platform to connect recruiters and job-seekers",
    technologies: "React, Java, SprintBoot, PostgreSQL",
    details: [
      {
        title: "Summary",
        content:
          "Developed scalable Spring Boot endpoints following SOLID principles and achieved 80% code coverage with over 50 automated unit/integration tests in a Docker CI/CD pipeline on Github Actions.",
      },
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
    title: "Pacman Game with AI",
    caption: "Computer Game with Custom AI Algorithms",
    technologies: "Python, Pygame",
    dates: "Sept 2022 - Dec 2022",
    details: [
      {
        title: "Summary",
        content:
          "Implemented A* pathfinding algorithm for ghost movement with customized behavior patterns, creating a multi-level game with enhanced sound effects and user experience.",
      },
    ],
  },
  {
    title: "Model Rocket with Vectored Thrust",
    caption: "Engineering Project",
    technologies: "Arduino, 3D Printing",
    dates: "May 2022 - Aug 2022",
    details: [
      {
        title: "Summary",
        content:
          "Designed a custom thrust vectoring mechanism for enhanced flight control and programmed an Arduino-based flight controller with a telemetry system.",
      },
    ],
  },
];

const volunteering = [
  {
    title: "President",
    organization: "UofT Blueprint",
    url: "https://uoftblueprint.org",
    location: "Toronto, ON",
    dates: "Aug 2023 - May 2024",
    details: [
      {
        title: "Leadership & Strategy",
        content: `Led 40+ members in delivering pro-bono software solutions to 3 nonprofits, while establishing corporate partnerships with Manulife and Guidewire to facilitate internship preparation events for 100+ students.`,
      },
      {
        title: "Operational Excellence",
        content: `Established Project Lead Hub and comprehensive Handbook to standardize project management methodologies, client requirement scoping, and team engagement best practices.`,
      },
    ],
    tags: ["Leadership", "Club", "Project Management"],
    logo: "/bp.svg",
  },
  {
    title: "Project Lead",
    organization: "UofT Blueprint",
    url: "https://uoftblueprint.org",
    location: "Toronto, ON",
    dates: "Aug 2023 - Aug 2024",
    details: [
      {
        title: "Project: Period Purse",
        content: (
          <span>
            Increased menstruation awareness by partnering with{" "}
            <Link
              href="https://theperiodpurse.com/"
              color="secondary"
              underline="hover"
              target="_blank"
              rel="noopener"
            >
              The Period Purse
            </Link>{" "}
            and developing an educational Android period tracker for Canadian
            youth, available on Google Play Store with over 50 downloads.
          </span>
        ),
      },
      {
        title: "Team Management",
        content: `Managed a 7-people development team through backlog refinement, prioritization and modularization, implementing all 8 use-cases as specified and completing 90+ tickets over 1 year.`,
      },
    ],
    tags: ["Leadership", "Project Management", "Kotlin", "Android"],
    logo: "/bp.svg",
  },
];

export { personalInfo, education, experience, projects, volunteering };
