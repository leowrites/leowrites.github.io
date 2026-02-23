import { TooltipLink } from "./Components";

const personalInfo = {
  description: [
    <span>
      I'm a final year Computer Science student at the{" "}
      <TooltipLink
        href="https://web.cs.toronto.edu/"
        tooltipText="My alma mater, where I study Computer Science"
      >
        University of Toronto
      </TooltipLink>
      .
    </span>,
    `I have an interest in systems, performance optimization and machine learning. 
      At school, I have taken courses such as Compilers, Computer Architecture, Operating Systems, 
      and Deep Learning.`,
    <span>
      Some of the most exciting projects I've worked on include contributing to
      the{" "}
      <TooltipLink
        href="https://github.com/openai/triton"
        tooltipText="A ML compiler for deep learning"
      >
        Triton
      </TooltipLink>{" "}
      language and compiler for GPU programming, and enhancing{" "}
      <TooltipLink
        href="https://www.mozilla.org/en-US/firefox/"
        tooltipText="A free and open-source web browser developed by Mozilla"
      >
        Firefox
      </TooltipLink>{" "}
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
    contentKey: "education/uoft-bsc-cs",
  },
];

const experience = [
  {
    title: "Undergraduate Researcher",
    organization: "ParaMathics Lab, University of Toronto",
    url: "http://paramathic.com",
    tooltipText:
      "A research group at the University of Toronto focusing on large-scale parallel and cloud systems",
    location: "Toronto, ON",
    dates: "May 2025 - Present",
    caption:
      "Adding support for structured sparsity matrix multiplication to Triton",
    contentKey: "experience/paramathics-overview",

    projects: [
      {
        projectName: "Sparse Matrix Multiplication Support",
        caption:
          "Adding block-sparse support to Triton via decoupled scheduling",
        contentKey: "experience/paramathics-sparse-matrix",
        tags: ["Triton", "Compiler", "CUDA", "Sparse Kernels", "MLIR"],
      },
      {
        projectName: "Fused matmul-compress kernel",
        contentKey: "experience/paramathics-fused-matmul-compress",
        tags: ["Triton", "GPU", "Kernel Fusion", "Compression", "Python"],
      },
    ],
    tags: ["Research", "Compiler", "LLVM", "MLIR", "Machine Learning", "C++"],
  },
  {
    title: "Software Engineer Intern",
    organization: "Mozilla",
    url: "https://www.mozilla.org",
    tooltipText: "A non-profit organization behind the Firefox web browser",
    location: "Toronto, ON",
    dates: "May 2025 - Sep 2025",
    caption: "Firefox Privacy",
    contentKey: "experience/mozilla-overview",

    projects: [
      {
        projectName: "Enhanced Tracking Protection",
        caption: "Granular configuration options for ETP-Strict users",
        contentKey: "experience/mozilla-etp",
        tags: ["Firefox", "Privacy", "ETP", "C++", "JavaScript"],
      },
    ],
    tags: ["C++", "JavaScript"],
    logo: "/mozilla.svg",
  },
  {
    title: "Software Engineer Intern",
    organization: "Seismic",
    url: "https://seismic.com",
    tooltipText: "A global leader in sales enablement and marketing automation",
    location: "Toronto, ON",
    dates: "Sep 2024 - Dec 2024",
    caption: (
      <span>
        Full-Stack developer for{" "}
        <TooltipLink
          href="https://www.seismic.com/customer-stories/seismic-livesocial/"
          tooltipText="A platform for curating and distributing personalized content"
        >
          Seismic LiveSocial
        </TooltipLink>{" "}
      </span>
    ),
    contentKey: "experience/seismic-overview",

    projects: [
      {
        projectName: "LiveSocial",
        caption:
          "Full-Stack developer on LiveSocial, a platform for curating personalized content for sales teams.",
        contentKey: "experience/seismic-livesocial",
        tags: ["React", "Express", "MongoDB", "TypeScript", "Fullstack"],
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
    tooltipText:
      "A digital innovation consultancy specializing in digital strategy, design, and execution",
    location: "Toronto, ON",
    dates: "May 2024 - Aug 2024",
    caption: "",
    contentKey: "experience/konrad-overview",

    projects: [
      {
        projectName: "Internal Gaming Analytics Tool",
        caption:
          "Backend development for scraping, processing, and serving game statistics.",
        contentKey: "experience/konrad-gaming-analytics",
        tags: ["Backend", "GraphQL", "Apollo", "Node.js", "TypeScript"],
      },
    ],
    tags: [
      "Backend",
      "GraphQL",
      "Apollo",
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
    tooltipText:
      "A leader in aerospace satellite communications and intelligent connectivity",
    location: "Ottawa, ON",
    dates: "May 2023 - Aug 2023",
    contentKey: "experience/skytrac-overview",

    projects: [
      {
        projectName: "Flight Data Systems",
        caption: "Automated tooling and visualization for flight logs.",
        contentKey: "experience/skytrac-flight-data",
        tags: ["BackboneJS", "Python", "MySQL", "Data Tooling"],
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
    contentKey: "projects/minicc-compiler",
    tags: ["Compiler", "C++", "LLVM"],
    githubLink: "https://github.com/leowrites/compiler",
  },
  {
    title: "Accelerating Particle Collision Simulation",
    caption:
      "Leveraging multi-threading and distributed computing for performance",
    technologies: "C++, OpenMP, OpenMPI",
    contentKey: "projects/particle-collision-simulation",
    tags: ["C++", "OpenMP", "OpenMPI"],
  },
  {
    title: "Food Item Classifier",
    caption: "A machine learning experiment to classify food items",
    technologies: "Python, sklearn",
    contentKey: "projects/food-item-classifier",
    tags: ["Machine Learning", "Python", "sklearn"],
    githubLink: "https://github.com/raftay/ML_Challenge",
  },
  {
    title: "Cloud-based Pandemic Simulation Service",
    caption:
      "Collaboration with morLab to build a cloud-based simulation service",
    technologies: "Python, Django, AWS",
    dates: "Jan 2023 - May 2023",
    contentKey: "projects/cloud-pandemic-sim",
    tags: ["Backend", "Python", "Django", "AWS", "PostgreSQL"],
  },
  {
    title: "MemoryViz & PythonTA",
    caption: "Visualizing Memory Management in Python",
    technologies: "Python, TypeScript",
    dates: "Sept 2021 - Dec 2021",
    contentKey: "projects/memoryviz-pythonta",
    tags: ["Python", "TypeScript", "React"],
    githubLink: "https://github.com/pyta-uoft/pyta",
  },
  {
    title: "Campfire",
    caption:
      "An internship review platform to connect recruiters and job-seekers",
    technologies: "React, Java, SprintBoot, PostgreSQL",
    contentKey: "projects/campfire",
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
    githubLink: "https://github.com/leowrites/Campfire",
  },
  {
    title: "Pacman Game with AI",
    caption: "Computer Game with Custom AI Algorithms",
    technologies: "Python, Pygame",
    dates: "Sept 2022 - Dec 2022",
    contentKey: "projects/pacman-ai",
    githubLink: "https://github.com/leowrites/Pacman",
  },
  {
    title: "Model Rocket with Vectored Thrust",
    caption: "Engineering Project",
    technologies: "Arduino, 3D Printing",
    dates: "May 2022 - Aug 2022",
    contentKey: "projects/model-rocket-vectored-thrust",
    githubLink: "https://github.com/leowrites/R1_Main",
  },
];

const volunteering = [
  {
    title: "President",
    organization: "UofT Blueprint",
    url: "https://uoftblueprint.org",
    tooltipText:
      "A student-led group that builds technology and software for social good",
    location: "Toronto, ON",
    dates: "Aug 2023 - May 2024",
    contentKey: "volunteering/blueprint-president",
    tags: ["Leadership", "Club", "Project Management"],
    logo: "/bp.svg",
  },
  {
    title: "Project Lead",
    organization: "UofT Blueprint",
    url: "https://www.uoftblueprint.org",
    tooltipText:
      "A student-led group that builds technology and software for social good",
    location: "Toronto, ON",
    dates: "Aug 2023 - Aug 2024",
    contentKey: "volunteering/blueprint-project-lead",

    projects: [
      {
        projectName: "Period Purse",
        caption: "Educational Android period tracker for Canadian youth",
        contentKey: "volunteering/period-purse",
        tags: ["Kotlin", "Android", "Leadership", "Product"],
      },
    ],
    tags: ["Leadership", "Project Management", "Kotlin", "Android"],
    logo: "/bp.svg",
  },
];

export { personalInfo, education, experience, projects, volunteering };
